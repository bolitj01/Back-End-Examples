import { Router } from 'express';
const router = Router();

const parks = [
  { id: 1, name: 'Yellowstone', state: 'Wyoming' },
  { id: 2, name: 'Yosemite', state: 'California' },
  { id: 3, name: 'Grand Canyon', state: 'Arizona' }
];

router.get('/', (req, res) => {
  res.json(parks);
});

router.get('/:id', (req, res) => {
  const park = parks.find(p => p.id === Number(req.params.id));
  park ? res.json(park) : res.status(404).json({ error: 'Park not found' });
});

export default router;
