const express = require('express');
const router = express.Router();

// Route to get all messages
module.exports = (pool) => {
  router.get('/', async (req, res) => {
    try {
      const messages = await pool.query('SELECT * FROM messages');
      res.json(messages.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server Error' });
    }
  });
  
  // Route to add a new message
  router.post('/', async (req, res) => {
    try {
      const { student_id, tutor_id, content, sent_at, payment_confirmed } = req.body;
      const newMessage = await pool.query(
        'INSERT INTO messages (student_id, tutor_id, content, sent_at, payment_confirmed) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [student_id, tutor_id, content, sent_at, payment_confirmed]
      );
      res.status(201).json(newMessage.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server Error' });
    }
  });

  return router;
};








