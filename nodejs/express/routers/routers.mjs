import express from 'express';
import parksRouter from './routes/parks.mjs';
import animalsRouter from './routes/animals.mjs';
import visitorsRouter from './routes/visitors.mjs';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Mount routers
app.use('/parks', parksRouter);
app.use('/animals', animalsRouter);
app.use('/visitors', visitorsRouter);

// Root route
app.get('/', (req, res) => {
  res.send('🗺️ Welcome to the U.S. National Parks API!');
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🌲 Server running at http://localhost:${PORT}`);
});
