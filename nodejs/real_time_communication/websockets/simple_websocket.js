import express from 'express';
import http from 'http';
import {WebSocketServer} from 'ws';

const port = 8080;
const app = express();
const server = http.createServer(app);

// Initialize a WebSocket server instance on the same HTTP server
const wss = new WebSocketServer({ server });
let messageCount = 1;

// WebSocket connection handler
wss.on('connection', (ws) => {
  console.log('WebSocket client connected ' + wss.clients[wss.clients.length - 1]);

  // Send a message to the client every 1 second
  const interval = setInterval(() => {
    ws.send(`Hello #${messageCount} from WebSocket server! ` + new Date().toLocaleTimeString());
    messageCount++;
  }, 1000);

  // Handle messages received from clients
  ws.on('message', (message) => {
    console.log('Received message from client:', message.toString());
  });

  // Clear the interval on client disconnect
  ws.on('close', () => {
    clearInterval(interval);
    console.log('WebSocket client disconnected');
  });
});

// Basic HTTP route
app.get('/', (req, res) => {
  res.send('Hello from Express HTTP!');
});

// Start the combined server on port 3000
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`WebSocket is listening on ws://localhost:${port}`);
});
