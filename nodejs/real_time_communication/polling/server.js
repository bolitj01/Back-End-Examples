const express = require('express');
const app = express();
const PORT = 8080;

let leaderboard = [
  { name: 'Alice', score: 0 },
  { name: 'Bob', score: 0 },
  { name: 'Carol', score: 0 }
];

//cors
const cors = require('cors');
app.use(cors({
  origin: '*', // Allow all origins for simplicity, adjust as needed
  methods: ['GET', 'POST'], // Allow only GET and POST methods
  allowedHeaders: ['Content-Type'] // Allow only specific headers
}));

// Artificially update the leaderboard every 3 seconds
setInterval(() => {
  leaderboard.forEach(player => {
    player.score += Math.floor(Math.random() * 10);
  });
  console.log('Leaderboard updated:', leaderboard);
}, 3000);

app.get('/leaderboard', (req, res) => {
  res.json(leaderboard);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
