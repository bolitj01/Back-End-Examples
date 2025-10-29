import { Router } from "express";
const router = Router();

let visitors = [
  { id: 1, name: "Ava Johnson", park: "Yosemite" },
  { id: 2, name: "Liam Martinez", park: "Grand Canyon" },
];

// GET /visitors
router.get("/", (req, res) => {
  res.json(visitors);
});

// POST /visitors
router.post("/", (req, res) => {
  const { name, park } = req.body;
  if (!name || !park) return res.status(400).json({ error: "Name and park required" });

  const newVisitor = { id: visitors.length + 1, name, park };
  visitors.push(newVisitor);
  res.status(201).json(newVisitor);
});

export default router;
