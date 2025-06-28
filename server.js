const http = require('http');
const fs = require('fs');
const path = require('path');
const { loadCounts } = require('./groupCounts');

function selectRelevantFiles(query) {
  const base = ['primary_content.json', 'key_features.json'];
  const files = new Set(base);
  const text = (query || '').toLowerCase();

  const GROUP_FILE_MAP = {
    a: 'City_Prosperity_Detailed.json',
    b: 'Prestige_Positions_Detailed.json',
    c: 'Country_Living_Detailed.json',
    d: 'Domestic_Success_Detailed.json',
    e: 'Family_Basics_Detailed.json',
    f: 'Senior_Security_Detailed.json',
    g: 'Suburban_Stability_Detailed.json',
    h: 'Rural_Reality_Detailed.json',
    i: 'Aspiring_Homemakers_Detailed.json',
    j: 'Rental_Hubs_Detailed.json',
    k: 'Transient_Renters_Detailed.json',
    l: 'Municipal_Tenants_Detailed.json',
    m: 'Urban_Cohesion_Detailed.json',
    n: 'Vintage_Value_Detailed.json',
    o: 'Prestige_Positions_Detailed.json'
  };

  for (const [code, file] of Object.entries(GROUP_FILE_MAP)) {
    const name = file.replace(/_Detailed\.json$/, '').replace(/_/g, ' ').toLowerCase();
    if (text.includes(code.toLowerCase()) || text.includes(name)) {
      files.add(file);
    }
  }

  const postcodeRegex = /\b[a-z]{1,2}\d[a-z0-9]?\d?[a-z]{0,2}\b/i;
  if (postcodeRegex.test(text)) files.add('postcode_to_mosaic.json');
  if (text.includes('city')) files.add('city_to_mosaic.json');
  if (text.includes('region')) files.add('region_to_mosaic.json');
  if (text.includes('authority')) files.add('local_authority_to_mosaic.json');

  return Array.from(files).slice(0, 5);
}

// Ensure `fetch` is available for older Node versions
let fetchFn = global.fetch;
if (typeof fetchFn !== 'function') {
  fetchFn = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));
}

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const port = process.env.PORT || 8000;
const GROUP_COUNTS = loadCounts();

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
      const relevant = selectRelevantFiles(query);
      const dataSnippets = relevant.map(f => {
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
