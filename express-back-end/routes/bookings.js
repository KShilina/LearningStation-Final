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

  // Route to get a specific booking by ID
  router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const booking = await pool.query('SELECT * FROM bookings WHERE booking_id = $1', [id]);

      if (booking.rows.length === 0) {
        return res.status(404).json({ error: 'Booking not found' });
      }

      res.json(booking.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server Error' });
    }
  });

  // Route to update a booking
  router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { payment_confirmed, booking_date } = req.body;

      // Build the update query dynamically based on the provided fields in the request body
      let updateQuery = 'UPDATE bookings SET ';
      const updateValues = [];
      let paramCount = 1;

      if (typeof payment_confirmed !== 'undefined') {
        updateQuery += `payment_confirmed = $${paramCount}, `;
        updateValues.push(payment_confirmed);
        paramCount++;
      }

      if (typeof booking_date !== 'undefined') {
        updateQuery += `booking_date = $${paramCount}, `;
        updateValues.push(booking_date);
        paramCount++;
      }

      // Remove the trailing comma and space
      updateQuery = updateQuery.slice(0, -2);

      // Add the WHERE clause to the update query
      updateQuery += ` WHERE booking_id = $${paramCount} RETURNING *`;
      updateValues.push(id);

      const updatedBooking = await pool.query(updateQuery, updateValues);

      if (updatedBooking.rows.length === 0) {
        return res.status(404).json({ error: 'Booking not found' });
      }

      res.json(updatedBooking.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server Error' });
    }
  });

  // Route to add a new booking
  router.post('/', async (req, res) => {

    const { student_id, class_id, booking_date, payment_confirmed } = req.body;

    const sql = 'INSERT INTO bookings (student_id, class_id, booking_date, payment_confirmed) VALUES ($1, $2, $3, $4) RETURNING *';

    const newBooking = await pool.query(sql, [student_id, class_id, booking_date, payment_confirmed]
    )
      .then((data) => {
        console.log("data written")
        res.status(201).json(data.rows[0])
      })
      .catch((err) => {
        console.error(err.message);
        res.status(500).json({ error: 'Server Error' })
      })
  });

  // Route to delete a booking
  router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;

      const deletedBooking = await pool.query('DELETE FROM bookings WHERE booking_id = $1 RETURNING *', [id]);

      if (deletedBooking.rows.length === 0) {
        return res.status(404).json({ error: 'Booking not found' });
      }

      res.json({ message: 'Booking deleted successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server Error' });
    }
  });

  // Route to get all bookings made by a specific student
  router.get('/students/:studentId/bookings', async (req, res) => {
    try {
      const studentId = parseInt(req.params.studentId); // Convert to integer
      const studentBookings = await pool.query('SELECT * FROM bookings WHERE student_id = $1', [studentId]);
      res.json(studentBookings.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server Error' });
    }
  });


  return router;
}