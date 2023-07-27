
const express = require('express');
const router = express.Router();


module.exports = (pool) => {
  // get all students
  router.get('/', async (req, res) => {
    try {
      const students = await pool.query('SELECT * FROM students');
      res.json(students.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error retrieving students' });
    }
  });

// route to get a specific student by student_id
 router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const student = await pool.query('SELECT * FROM students WHERE student_id = $1', [id]);
      if (student.rows.length === 0) {
        return res.status(404).json({ error: 'Tutor not found' });
      }
      res.json(student.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error retrieving tutor' });
    }
  });

  router.post('/', async (req, res) => {
    const { first_name, last_name, email, location, password } = req.body;
    try {
      const newStudent = await pool.query(
        'INSERT INTO students (first_name, last_name, email, location, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [first_name, last_name, email, location, password]
      );
      res.json(newStudent.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error creating student' });
    }
  });

 

  return router;
};