import { Router } from 'express';
const router = Router();

const animals = [
  { id: 1, name: 'Bison', park: 'Yellowstone' },
  { id: 2, name: 'Bald Eagle', park: 'Grand Canyon' },
  { id: 3, name: 'Black Bear', park: 'Yosemite' }
];

router.get('/', (req, res) => {
  res.json(animals);
});

router.get('/search/:name', (req, res) => {
  const match = animals.find(a => a.name.toLowerCase() === req.params.name.toLowerCase());
  match ? res.json(match) : res.status(404).json({ error: 'Animal not found' });
});

export default router;
