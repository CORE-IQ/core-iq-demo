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

// Build a simple map from Mosaic group keywords to their detailed JSON file
const GROUP_FILE_MAP = (() => {
  const map = {};
  if (fs.existsSync('primary_content.json')) {
    try {
      const groups = JSON.parse(fs.readFileSync('primary_content.json', 'utf8'));
      groups.forEach(g => {
        const file = `${g.group_name.replace(/\s+/g, '_')}_Detailed.json`;
        const key = g.group_name.toLowerCase();
        map[key] = file;
        map[g.group_code.toLowerCase()] = file;
        map[`group${g.group_code.toLowerCase()}`] = file;
      });
    } catch {
      // ignore parse errors
    }
  }
  return map;
})();

function selectRelevantFiles(query) {
  const q = (query || '').toLowerCase();
  const files = new Set();

  // Match Mosaic group names or codes
  for (const key in GROUP_FILE_MAP) {
    if (q.includes(key)) {
      files.add(GROUP_FILE_MAP[key]);
    }
  }

  // Check for postcode pattern
  if (/\b[a-z]{1,2}\d[a-z0-9]?\d?[a-z]{0,2}\b/i.test(q)) {
    files.add('postcode_to_mosaic.json');
  }

  // Basic keyword heuristics
  if (q.includes('coffee')) files.add('key_features.json');
  if (/feline|cat|cats/.test(q)) files.add('helpful_adverts_subgroups.json');
  if (q.includes('cardiff')) files.add('city_to_mosaic.json');

  files.add('primary_content.json');

  // Fallback: include first few JSON files to avoid empty requests
  if (files.size === 0) {
    fs.readdirSync(__dirname)
      .filter(f => f.endsWith('.json'))
      .slice(0, 3)
      .forEach(f => files.add(f));
  }

  return Array.from(files).slice(0, 5);
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
