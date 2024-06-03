const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Verificando o caminho do URL da requisição
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html';
  }

  // Obtendo a extensão do arquivo
  const extname = String(path.extname(filePath)).toLowerCase();

  // Definindo os tipos MIME para diferentes extensões de arquivo
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
  };

  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == 'ENOENT') {
        res.writeHead(404);
        res.end('404 Not Found');
      } else {
        res.writeHead(500);
        res.end('500 Internal Server Error');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}/`);
});
