
const express = require('express');
const router = express.Router();
const pool = require('../db'); // Assuming you have set up your PostgreSQL pool

// GET route for searching tutors
router.get('/api/search', (req, res) => {
  const { subject } = req.query;

  // Query to fetch the first three tutors based on the subject
  const query = `
    SELECT *
    FROM tutors
    // WHERE expertise = $1
    LIMIT 3;
  `;

  // Run the query with the subject parameter
  pool.query(query, [subject])
    .then((result) => {
      const tutors = result.rows;
      res.json(tutors);
    })
    .catch((error) => {
      console.error('Error fetching tutors:', error);
      res.status(500).json({ error: 'An error occurred while fetching tutors' });
    });
});

module.exports = router;