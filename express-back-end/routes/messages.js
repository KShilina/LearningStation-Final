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

   // Route to get a specific message by message_id
   router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const message = await pool.query('SELECT * FROM messages WHERE message_id = $1', [id]);

      if (message.rows.length === 0) {
        return res.status(404).json({ error: 'Message not found' });
      }

      res.json(message.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server Error' });
    }
  });

  // Route to update a specific message by message_id
  router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { content, payment_confirmed } = req.body;

      // Build the update query dynamically based on the provided fields in the request body
      let updateQuery = 'UPDATE messages SET ';
      const updateValues = [];
      let paramCount = 1;

      if (content) {
        updateQuery += `content = $${paramCount}, `;
        updateValues.push(content);
        paramCount++;
      }
      
      if (typeof payment_confirmed === 'boolean') {
        updateQuery += `payment_confirmed = $${paramCount}, `;
        updateValues.push(payment_confirmed);
        paramCount++;
      }

      // Remove the trailing comma and space
      updateQuery = updateQuery.slice(0, -2);

      // Add the WHERE clause to the update query
      updateQuery += ` WHERE message_id = $${paramCount} RETURNING *`;
      updateValues.push(id);

      const updatedMessage = await pool.query(updateQuery, updateValues);

      if (updatedMessage.rows.length === 0) {
        return res.status(404).json({ error: 'Message not found' });
      }

      res.json(updatedMessage.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server Error' });
    }
  });
  
  // Route to add a new message
  router.post('/', async (req, res) => {
    try {
      const { student_id, tutor_id, content, payment_confirmed } = req.body;
      const newMessage = await pool.query(
        'INSERT INTO messages (student_id, tutor_id, content, payment_confirmed) VALUES ($1, $2, $3, $4) RETURNING *',
        [student_id, tutor_id, content, payment_confirmed]
      );
      res.status(201).json(newMessage.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server Error' });
    }
  });

  // Route to delete a specific message by message_id
  router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deletedMessage = await pool.query('DELETE FROM messages WHERE message_id = $1 RETURNING *', [id]);

      if (deletedMessage.rows.length === 0) {
        return res.status(404).json({ error: 'Message not found' });
      }

      res.json({ message: 'Message deleted successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server Error' });
    }
  });


  // Route to get all messages related to a specific student
  router.get('/students/:studentId/messages', async (req, res) => {
    try {
      const studentId = parseInt(req.params.studentId); // Convert to integer
      const messages = await pool.query('SELECT * FROM messages WHERE student_id = $1', [studentId]);
      res.json(messages.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server Error' });
    }
  });

  return router;
};








