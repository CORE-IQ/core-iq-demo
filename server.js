require('dotenv').config();
const http = require('http');
const fs = require('fs');
const path = require('path');
const { OpenAI } = require('openai');
const { loadCounts } = require('./groupCounts');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const ASSISTANT_ID = process.env.OPENAI_ASSISTANT_ID || 'asst_abc123xyz456';
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

const port = process.env.PORT || 8000;
const GROUP_COUNTS = loadCounts();

async function runAssistant(query) {
  if (!OPENAI_API_KEY || !ASSISTANT_ID) {
    throw new Error('unavailable');
  }

  const thread = await openai.beta.threads.create();
  await openai.beta.threads.messages.create(thread.id, {
    role: 'user',
    content: query
  });
  const run = await openai.beta.threads.runs.create(thread.id, {
    assistant_id: ASSISTANT_ID
  });

  let status = run.status;
  while (status !== 'completed') {
    await new Promise(r => setTimeout(r, 1000));
    status = (await openai.beta.threads.runs.retrieve(thread.id, run.id)).status;
  }

  const messages = await openai.beta.threads.messages.list(thread.id);
  const answer = messages.data.find(m => m.role === 'assistant');
  return answer ? answer.content[0].text.value : '';
}


async function handleOpenAIRequest(req, res) {
  let body = '';
  req.on('data', chunk => (body += chunk));
  req.on('end', async () => {
    try {
      const { query = '' } = JSON.parse(body || '{}');
      const answer = await runAssistant(query);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ answer }));
    } catch (err) {
      console.error(err);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Core-IQ service unavailable' }));
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
