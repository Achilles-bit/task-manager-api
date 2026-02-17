import express from "express";

const router = express.Router();

let tasks = [];
let idCounter = 1;

// GET /api/tasks
router.get("/", (req, res) => res.json(tasks));

// POST /api/tasks
router.post("/", (req, res) => {
  const { title, description = "", status = "pending" } = req.body;
  if (!title) return res.status(400).json({ message: "title is required" });

  const task = {
    id: idCounter++,
    title,
    description,
    status,
    createdAt: new Date().toISOString()
  };

  tasks.unshift(task);
  res.status(201).json(task);
});

// PUT /api/tasks/:id
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ message: "Task not found" });

  tasks[idx] = { ...tasks[idx], ...req.body };
  res.json(tasks[idx]);
});

// DELETE /api/tasks/:id
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const before = tasks.length;
  tasks = tasks.filter(t => t.id !== id);
  if (tasks.length === before) return res.status(404).json({ message: "Task not found" });

  res.json({ message: "Task deleted" });
});

export default router;
