const express = require('express');
const router = express.Router();


// Search route
module.exports = (pool) => {
  router.get('/', async (req, res) => {
    console.log("test search .js")
    const {searchTerm} = req.query; // Only use the subject parameter for regular search

    if (!searchTerm) {
      return res.status(400).json({ error: 'Please provide a searchTerm.' });
    }

    try {
      const query = `
        SELECT *
        FROM classes
        LEFT JOIN tutors ON classes.tutor_id = tutors.tutor_id
        WHERE subject ILIKE $1 OR expertise ILIKE $1
      `;
      const values = ['%' + searchTerm + '%'];

      console.log("query", query)
      const result = await pool.query(query, values);
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while searching the database.' });
    }
  });

  return router;
};
