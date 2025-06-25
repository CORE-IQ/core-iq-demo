const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 8000;

const server = http.createServer((req, res) => {
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
