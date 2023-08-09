const express = require('express');
const router = express.Router();

module.exports = (pool) => {
  // GET all reviews based on tutor_id
  router.get('/tutors/:tutor_id', async (req, res) => {
    try {
      const { tutor_id } = req.params;
      const reviews = await pool.query('SELECT * FROM reviews WHERE tutor_id = $1', [tutor_id]);
      res.json(reviews.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error retrieving reviews' });
    }
  });

  // GET all reviews based on student_id
  router.get('/students/:student_id', async (req, res) => {
    try {
      const { student_id } = req.params;
      const reviews = await pool.query('SELECT * FROM reviews WHERE student_id = $1', [student_id]);
      res.json(reviews.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error retrieving reviews' });
    }
  });

  // POST a review
  router.post('/', async (req, res) => {
    const { student_id, tutor_id, rating, comment } = req.body;
    try {
      const insertQuery = 'INSERT INTO reviews (student_id, tutor_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *';
      const insertValues = [student_id, tutor_id, rating, comment];

      const newReview = await pool.query(insertQuery, insertValues);

      res.status(201).json(newReview.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error adding review' });
    }
  });

  return router;
};