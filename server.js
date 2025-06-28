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

const GROUP_FILE_MAP = {
  A: 'City_Prosperity_Detailed.json',
  B: 'Prestige_Positions_Detailed.json',
  C: 'Country_Living_Detailed.json',
  D: 'Rural_Reality_Detailed.json',
  E: 'Senior_Security_Detailed.json',
  F: 'Suburban_Stability_Detailed.json',
  G: 'Domestic_Success_Detailed.json',
  H: 'Aspiring_Homemakers_Detailed.json',
  I: 'Family_Basics_Detailed.json',
  J: 'Transient_Renters_Detailed.json',
  K: 'Municipal_Tenants_Detailed.json',
  L: 'Vintage_Value_Detailed.json',
  M: null, // Modest Traditions file not present
  N: 'Urban_Cohesion_Detailed.json',
  O: 'Rental_Hubs_Detailed.json'
};

function selectRelevantFiles(query) {
  const lower = String(query || '').toLowerCase();
  const files = new Set(['primary_content.json']);

  const codeMatch = lower.match(/\b([a-o])\b/i);
  if (codeMatch) {
    const f = GROUP_FILE_MAP[codeMatch[1].toUpperCase()];
    if (f) files.add(f);
  }

  for (const [code, file] of Object.entries(GROUP_FILE_MAP)) {
    if (!file) continue;
    const name = file.replace(/_Detailed\.json$/, '').replace(/_/g, ' ').toLowerCase();
    if (lower.includes(name)) {
      files.add(file);
      break;
    }
  }

  if (/[a-z]{1,2}\d[a-z0-9]?\d?[a-z]{0,2}/i.test(query)) {
    files.add('postcode_to_mosaic.json');
  }

  if (/(city|cities)/i.test(query)) files.add('city_to_mosaic.json');
  if (/region/i.test(query)) files.add('region_to_mosaic.json');
  if (/authority|council/i.test(query)) files.add('local_authority_to_mosaic.json');

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
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }
      const result = await response.json();
      const answer = result.choices?.[0]?.message?.content || 'No answer';
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ answer }));
    } catch (err) {
      console.error(err);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message || 'OpenAI request failed' }));
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
