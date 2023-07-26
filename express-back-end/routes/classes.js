const express = require('express');
const router = express.Router();
// Route to get all classes

module.exports = (pool) => {
  router.get('/', async (req, res) => {
    try {
      const classes = await pool.query('SELECT * FROM classes');
      res.json(classes.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server Error' });
    }
  });
  
  // Route to add a new class
  router.post('/', async (req, res) => {
    try {
      const { tutor_id, subject, class_price } = req.body;
      const newClass = await pool.query(
        'INSERT INTO classes (tutor_id, subject, class_price) VALUES ($1, $2, $3) RETURNING *',
        [tutor_id, subject, class_price]
      );
      res.status(201).json(newClass.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server Error' });
    }
  });

  return router;
}