// routes/search.js
const express = require('express');
const router = express.Router();

// Search route
module.exports = (pool) => {
  router.get('/', (req, res) => {
    const searchTerm = req.query.subject;

    if (!searchTerm) {
      return res.status(400).json({ error: 'Please provide a subject to search.' });
    }

    searchBySubject(pool, searchTerm)
      .then(results => {
        res.json(results);
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while searching the database.' });
      });
  });

  // Define the searchBySubject function
  const searchBySubject = async (pool, searchTerm) => {
    try {
      const query = `
        SELECT *
        FROM classes
        WHERE subject ILIKE $1;
      `;
      const values = ['%' + searchTerm + '%'];

      const result = await pool.query(query, values);
      return result.rows;
    } catch (error) {
      throw new Error(`Error searching by subject: ${error.message}`);
    }
  };

  return router;
};
