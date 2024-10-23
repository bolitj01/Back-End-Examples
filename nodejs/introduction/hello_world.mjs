// Import the http module using ES6 syntax
import http from 'http';

// Define the hostname and port
const hostname = '127.0.0.1'; // localhost default local IP address
const port = 8080;

// Create the server
const server = http.createServer((req, res) => {
  res.statusCode = 200; // HTTP status code: OK
  res.setHeader('Content-Type', 'text/html');
  res.end('<h1>Hello, Class!</h1>');
});

// Start listening on the specified host and port
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
