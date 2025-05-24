const express = require('express');
const TaskModel = require('../models/taskModel');
const router = express.Router();

// Create task under a project
router.post('/', async (req, res) => {
  try {
    await TaskModel.create(req.body);
    res.status(201).json({ message: 'Task created' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create task', error: err.message });
  }
});

// Get by Project
router.get('/project/:projectId', async (req, res) => {
  try {
    const [tasks] = await TaskModel.findByProject(req.params.projectId);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tasks', error: err.message });
  }
});

// Update a task
router.put('/:id', async (req, res) => {
  try {
    await TaskModel.update(req.params.id, req.body);
    res.json({ message: 'Task updated' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update task', error: err.message });
  }
});

// Toggle Completion
router.patch('/:id/toggle', async (req, res) => {
  try {
    await TaskModel.toggleCompletion(req.params.id, req.body.isCompleted);
    res.json({ message: 'Task status updated' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update task status', error: err.message });
  }
});

// Delete task
router.delete('/:id', async (req, res) => {
  try {
    await TaskModel.delete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete task', error: err.message });
  }
});

module.exports = router;
