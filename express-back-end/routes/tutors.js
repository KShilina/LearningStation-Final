
const express = require('express');
const router = express.Router();

module.exports = (pool) => {
  router.get('/', async (req, res) => {
    try {
      const tutors = await pool.query('SELECT * FROM tutors');
      res.json(tutors.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error retrieving tutors' });
    }
  });

  router.post('/', async (req, res) => {
    const { tutor_id, first_name, last_name, email, location, password, expertise, quick_bio } = req.body;
    try {
      const newTutor = await pool.query(
        'INSERT INTO tutors (tutor_id, first_name, last_name, email, location, password, expertise, quick_bio) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [tutor_id, first_name, last_name, email, location, password, expertise, quick_bio]
      );
      res.json(newTutor.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error creating tutor' });
    }
  });

 

  return router;
};






// Rest of the routes and queries for tutors...
