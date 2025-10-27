// Import the http module using ES6 syntax
import https from 'https';
import fs from 'fs';

// Define the hostname and port
const hostname = '127.0.0.1'; // localhost default local IP address
const port = 4430; // Common HTTPS port is 4430

// Read the SSL certificate and key
const options = {
  key: fs.readFileSync("../generate_ssl_certificate/localhost+1-key.pem"),
  cert: fs.readFileSync("../generate_ssl_certificate/localhost+1.pem"),
};

// Create the server, using HTTPS by providing the certificate options
const server = https.createServer(options, (req, res) => {
  res.statusCode = 200; // HTTP status code: OK
  res.setHeader('Content-Type', 'text/html');
  res.end('<h1>Hello, Class!</h1>');
});

// Start listening on the specified host and port
server.listen(port, hostname, () => {
  console.log(`Server running at https://${hostname}:${port}/`);
});
