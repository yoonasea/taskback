const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const filePath = path.join(__dirname, 'tasks.json');

// Helper function to read tasks from the file
const readTasks = () => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

// Helper function to write tasks to the file
const writeTasks = (tasks) => {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
};

// Create Task
router.post('/', (req, res) => {
  const tasks = readTasks();
  const newTask = { id: Date.now().toString(), ...req.body };
  tasks.push(newTask);
  writeTasks(tasks);
  res.send(newTask);
});

// Read Tasks
router.get('/', (req, res) => {
  const tasks = readTasks();
  res.send(tasks);
});

// Update Task
router.put('/:id', (req, res) => {
  let tasks = readTasks();
  const updatedTask = { ...req.body, id: req.params.id };
  tasks = tasks.map(task => (task.id === req.params.id ? updatedTask : task));
  writeTasks(tasks);
  res.send(updatedTask);
});

// Delete Task
router.delete('/:id', (req, res) => {
  let tasks = readTasks();
  tasks = tasks.filter(task => task.id !== req.params.id);
  writeTasks(tasks);
  res.send({ message: 'Task deleted' });
});

module.exports = router;
