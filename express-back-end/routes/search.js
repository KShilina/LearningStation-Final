const express = require('express');
const router = express.Router();

// Search route
module.exports = (pool) => {
  router.get('/', async (req, res) => {
    const searchTerm = req.query.subject;
    const searchOption = req.query.location;

    if (!searchTerm || !searchOption) {
      return res.status(400).json({ error: 'Please provide both searchTerm and searchOption.' });
    }

    try {
      let query = `
        SELECT *
        FROM classes
        LEFT JOIN tutors ON classes.tutor_id = tutors.tutor_id
        WHERE 1 = 1
      `;
      const values = [];

      // Add condition based on the selected searchOption
      if (searchOption === 'subject') {
        query += ` AND subject ILIKE $${values.length + 1}`;
        values.push('%' + searchTerm + '%');
      } else if (searchOption === 'location') {
        query += ` AND location ILIKE $${values.length + 1}`;
        values.push('%' + searchTerm + '%');
      } else {
        return res.status(400).json({ error: 'Invalid searchOption. Please choose "subject" or "location".' });
      }

      const result = await pool.query(query, values);
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while searching the database.' });
    }
  });

  return router;
};
