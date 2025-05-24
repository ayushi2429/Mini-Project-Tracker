const express = require('express');
const ProjectModel = require('../models/projectModel');
const router = express.Router();

// Create new project
router.post('/', async (req, res) => {
  try {
    await ProjectModel.create(req.body);
    res.status(201).json({ message: 'Project created' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create project', error: err.message });
  }
});

// Get paginated list of projects
router.get('/', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;
  try {
    const [projects] = await ProjectModel.findAll(parseInt(limit), parseInt(offset));
    const [[{ total }]] = await ProjectModel.count(); // Get total count from DB
    res.json({ projects, total });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch projects', error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  const projectId = req.params.id;
  try {
    const [project] = await ProjectModel.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project[0]);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch project by Id', error: err.message });
  }
  
});

// Update project
router.put('/:id', async (req, res) => {
  try {
    await ProjectModel.update(req.params.id, req.body);
    res.json({ message: 'Project updated' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update project', error: err.message });
  }
});

// Delete project
router.delete('/:id', async (req, res) => {
  try {
    await ProjectModel.delete(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete project', error: err.message });
  }
});

module.exports = router;
