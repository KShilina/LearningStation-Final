// routes/search.js
const express = require('express');
const router = express.Router();

// Search route
module.exports = (pool) => {
  router.get('/', async (req, res) => {
    const searchTerm = req.query.subject;

    if (!searchTerm) {
      return res.status(400).json({ error: 'Please provide a subject to search.' });
    }

    try {
      const query = `
        SELECT *
        FROM classes
        Left JOIN tutors ON classes.tutor_id = tutors.tutor_id
        WHERE subject ILIKE $1;
      `;
      const values = ['%' + searchTerm + '%'];

      const result = await pool.query(query, values);
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while searching the database.' });
    }
  });

  return router;
};
