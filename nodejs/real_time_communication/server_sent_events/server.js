const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.static(__dirname)); // To serve the HTML file

let clients = [];
let grid = Array(9).fill(0); // 3x3 grid = 9 squares

// Send random notifications every second
setInterval(() => {
  const index = Math.floor(Math.random() * 9);
  grid[index] += 1;

  const payload = JSON.stringify({ index, count: grid[index] });

  clients.forEach((res) => res.write(`data: ${payload}\n\n`));
}, 1000);

// SSE endpoint
app.get("/events", (req, res) => {
  res.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
  res.flushHeaders();

  clients.push(res);

  req.on("close", () => {
    clients = clients.filter((c) => c !== res);
  });
});

// Reduce notification count when clicked
app.post("/click/:index", (req, res) => {
  const i = parseInt(req.params.index);
  console.log(`Clicked index: ${i}`);
  if (grid[i] > 0) grid[i]--;
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
