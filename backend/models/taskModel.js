const pool = require('../config/db');

const TaskModel = {
  create: async ({ projectId, title, assignedTo, dueDate }) =>
    await pool.query('INSERT INTO tasks (projectId, title, assignedTo, dueDate, isCompleted) VALUES (?, ?, ?, ?, ?)', [projectId, title, assignedTo, dueDate, false]),

  findByProject: async (projectId) =>
    await pool.query('SELECT * FROM tasks WHERE projectId = ?', [projectId]),

  update: async (id, { title, assignedTo, dueDate, isCompleted }) =>
    await pool.query('UPDATE tasks SET title = ?, assignedTo = ?, dueDate = ?, isCompleted = ? WHERE id = ?', [title, assignedTo, dueDate, isCompleted, id]),

  toggleCompletion: async (id, isCompleted) =>
    await pool.query('UPDATE tasks SET isCompleted = ? WHERE id = ?', [isCompleted, id]),

  delete: async (id) =>
    await pool.query('DELETE FROM tasks WHERE id = ?', [id]),
};

module.exports = TaskModel;
