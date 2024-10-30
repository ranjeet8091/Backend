const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/user') {
    handleUserGetRequest(req, res);
  } else if (req.method === 'POST' && req.url === '/user') {
    handleUserPostRequest(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

function handleUserGetRequest(req, res) {
  // Handle GET request for '/user' endpoint
  fetch('http://api.example.com/users')
    .then((response) => response.json())
    .then((data) => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    })
    .catch((error) => {
      console.error('Error:', error);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    });
}

function handleUserPostRequest(req, res) {
  // Handle POST request for '/user' endpoint
  // Assuming body-parser middleware has been used to parse the request body
  const user = req.body;
  fetch('http://api.example.com/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((data) => {
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    })
    .catch((error) => {
      console.error('Error:', error);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    });
}

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
