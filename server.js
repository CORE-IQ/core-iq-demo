const http = require('http');
const fs = require('fs');
const path = require('path');
const { loadCounts } = require('./groupCounts');

// Ensure `fetch` is available for older Node versions
let fetchFn = global.fetch;
if (typeof fetchFn !== 'function') {
  fetchFn = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));
}

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const port = process.env.PORT || 8000;
const GROUP_COUNTS = loadCounts();

function loadGroupMap() {
  const groupMap = {};
  const pc = path.join(__dirname, 'primary_content.json');
  if (!fs.existsSync(pc)) return groupMap;
  try {
    const text = fs.readFileSync(pc, 'utf8').replace(/NaN/g, 'null');
    const groups = JSON.parse(text);
    groups.forEach(g => {
      const nameKey = (g.group_name || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      const codeKey = String(g.group_code || '').toLowerCase();
      const fname = g.group_name.replace(/\s+/g, '_') + '_Detailed.json';
      if (fs.existsSync(path.join(__dirname, fname))) {
        groupMap[nameKey] = fname;
        if (codeKey) {
          groupMap[codeKey] = fname;
          groupMap[`group${codeKey}`] = fname;
        }
      }
    });
  } catch (_) {
    return groupMap;
  }
  return groupMap;
}

const GROUP_MAP = loadGroupMap();

// lookup helpers for location-based JSON files
function loadLookupKeys(fname) {
  try {
    const full = path.join(__dirname, fname);
    if (fs.existsSync(full)) {
      const obj = JSON.parse(fs.readFileSync(full, 'utf8').replace(/NaN/g, 'null'));
      return Object.keys(obj).map(k => k.toLowerCase());
    }
  } catch (_) {}
  return [];
}

const CITY_KEYS = loadLookupKeys('city_to_mosaic.json');
const LA_KEYS = loadLookupKeys('local_authority_to_mosaic.json');
const REGION_KEYS = loadLookupKeys('region_to_mosaic.json');

function selectRelevantFiles(query) {
  const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.json'));
  const text = (query || '').toLowerCase();
  const clean = text.replace(/[^a-z0-9\s]/g, '');

  // direct match to a known Mosaic group
  for (const [key, fname] of Object.entries(GROUP_MAP)) {
    if (clean.includes(key)) {
      return [fname];
    }
  }

  const matches = new Set();

  // postcode (full or partial like EC1)
  const postcodeRE = /\b[a-z]{1,2}\d[a-z0-9]?\d?[a-z]{0,2}\b/i;
  if (postcodeRE.test(query)) {
    matches.add('postcode_to_mosaic.json');
  }

  // check location names
  const locWords = clean.split(/\s+/);
  locWords.forEach(w => {
    if (CITY_KEYS.includes(w)) matches.add('city_to_mosaic.json');
    if (LA_KEYS.includes(w)) matches.add('local_authority_to_mosaic.json');
    if (REGION_KEYS.includes(w)) matches.add('region_to_mosaic.json');
  });

  // simple keyword mapping
  if (clean.includes('coffee')) matches.add('primary_content.json');
  if (clean.includes('feline') || clean.includes('cat')) matches.add('help.json');

  // fallback search using file names
  locWords.forEach(k => {
    if (GROUP_MAP[k]) matches.add(GROUP_MAP[k]);
    files.forEach(f => {
      if (f.toLowerCase().includes(k)) matches.add(f);
    });
  });

  if (matches.size === 0) matches.add('primary_content.json');

  return Array.from(matches).slice(0, 5);
}

async function handleOpenAIRequest(req, res) {
  if (!OPENAI_API_KEY) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'OPENAI_API_KEY not set' }));
    return;
  }
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', async () => {
    try {
      const { query = '' } = JSON.parse(body || '{}');
      const files = selectRelevantFiles(query);
      const dataSnippets = files.map(f => {
        const content = fs.readFileSync(path.join(__dirname, f), 'utf8');
        return `File: ${f}\n${content.substring(0, 1000)}`;
      }).join('\n');

      const prompt = `${query}\n\nUse the following JSON data to answer:`;
      const response = await fetchFn('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            { role: 'system', content: 'You are a helpful assistant that answers questions about the provided JSON.' },
            { role: 'user', content: `${prompt}\n${dataSnippets}` }
          ]
        })
      });
      const result = await response.json();
      const answer = result.choices?.[0]?.message?.content || 'No answer';
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ answer }));
    } catch (err) {
      console.error(err);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'OpenAI request failed' }));
    }
  });
}

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/api/openai') {
    handleOpenAIRequest(req, res);
    return;
  }
  if (req.method === 'GET' && req.url === '/api/groupcounts') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(GROUP_COUNTS));
    return;
  }

  const safePath = path.normalize(req.url).replace(/^\/+/, '');
  const filePath = path.join(__dirname, safePath || 'index.html');
  const ext = path.extname(filePath).toLowerCase();
  const contentType = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json'
  }[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
