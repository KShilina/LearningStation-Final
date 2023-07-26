const express = require('express');
const router = express.Router();

// Route to get all bookings
module.exports = (pool) => {
  router.get('/', async (req, res) => {
    try {
      const bookings = await pool.query('SELECT * FROM bookings');
      res.json(bookings.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server Error' });
    }
  });
  
  // Route to add a new booking
  router.post('/', async (req, res) => {
    try {
      const { student_id, class_id, booking_date, payment_confirmed } = req.body;
      const newBooking = await pool.query(
        'INSERT INTO bookings (student_id, class_id, booking_date, payment_confirmed) VALUES ($1, $2, $3, $4) RETURNING *',
        [student_id, class_id, booking_date, payment_confirmed]
      );
      res.status(201).json(newBooking.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server Error' });
    }
  });
  
 

  return router;
}