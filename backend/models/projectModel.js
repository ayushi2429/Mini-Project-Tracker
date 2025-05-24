const pool = require('../config/db');

const ProjectModel = {
  create: async ({ name, description, status }) =>
    await pool.query('INSERT INTO projects (name, description, status) VALUES (?, ?, ?)', [name, description, status]),

  findAll: async (limit, offset) =>
    await pool.query('SELECT * FROM projects LIMIT ? OFFSET ?', [limit, offset]),

  findById: async (id) =>
    await pool.query('SELECT * FROM projects WHERE id = ?', [id]),

  update: async (id, { name, description, status }) =>
    await pool.query('UPDATE projects SET name = ?, description = ?, status = ? WHERE id = ?', [name, description, status, id]),

  delete: async (id) =>
    await pool.query('DELETE FROM projects WHERE id = ?', [id]),

  count: async () =>
    await pool.query('SELECT COUNT(*) as total FROM projects')
};

module.exports = ProjectModel;
