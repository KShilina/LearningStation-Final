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

  // Route to get a specific class by class_id
  router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const singleClass = await pool.query('SELECT * FROM classes WHERE class_id = $1', [id]);

      if (singleClass.rows.length === 0) {
        return res.status(404).json({ error: 'Class not found' });
      }

      res.json(singleClass.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server Error' });
    }
  });
  
    // Route to update a specific class by class_id
  router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { tutor_id, subject, class_price } = req.body;

      // Build the update query dynamically based on the provided fields in the request body
      let updateQuery = 'UPDATE classes SET ';
      const updateValues = [];
      let paramCount = 1;

      if (typeof tutor_id !== 'undefined') {
        updateQuery += `tutor_id = $${paramCount}, `;
        updateValues.push(tutor_id);
        paramCount++;
      }

      if (typeof subject !== 'undefined') {
        updateQuery += `subject = $${paramCount}, `;
        updateValues.push(subject);
        paramCount++;
      }

      if (typeof class_price !== 'undefined') {
        updateQuery += `class_price = $${paramCount}, `;
        updateValues.push(class_price);
        paramCount++;
      }

      // Remove the trailing comma and space
      updateQuery = updateQuery.slice(0, -2);

      // Add the WHERE clause to the update query
      updateQuery += ` WHERE class_id = $${paramCount} RETURNING *`;
      updateValues.push(id);

      const updatedClass = await pool.query(updateQuery, updateValues);

      if (updatedClass.rows.length === 0) {
        return res.status(404).json({ error: 'Class not found' });
      }

      res.json(updatedClass.rows[0]);
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
  
  // Route to delete a specific class by class_id
  router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deletedClass = await pool.query('DELETE FROM classes WHERE class_id = $1 RETURNING *', [id]);

      if (deletedClass.rows.length === 0) {
        return res.status(404).json({ error: 'Class not found' });
      }

      res.json({ message: 'Class deleted successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server Error' });
    }
  });
  
  // Route to get classes by subject
  router.get('/subject/:subject', async (req, res) => {
    try {
      const { subject } = req.params;
      const classesBySubject = await pool.query('SELECT * FROM classes WHERE subject ILIKE $1', [`%${subject}%`]);
  
      if (classesBySubject.rows.length === 0) {
        return res.status(404).json({ error: 'No classes found for the given subject' });
      }
  
      res.json(classesBySubject.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server Error' });
    }
  });

  // Route to get classes by price
  router.get('/class_price/:priceRange', async (req, res) => {
    try {
      const priceRange = req.params.priceRange;
      const [minPrice, maxPrice] = priceRange.split('-');
      console.log(minPrice, maxPrice, "price range from classes");
      
      const classesByPriceRange = await pool.query(`
        SELECT classes.*, tutors.*
        FROM classes
        JOIN tutors ON classes.tutor_id = tutors.tutor_id
        WHERE classes.class_price >= $1 AND classes.class_price <= $2
      `, [minPrice, maxPrice]);
    
      if (classesByPriceRange.rows.length === 0) {
        return res.status(404).json({ error: 'No classes found in the given price range' });
      }
    
      res.json(classesByPriceRange.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server Error' });
    }
  });

  return router;
}