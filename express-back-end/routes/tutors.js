
const express = require('express');
const router = express.Router();

module.exports = (pool) => {
  // get all tutors
  router.get('/', async (req, res) => {
    try {
      const tutors = await pool.query('SELECT * FROM tutors');
      res.json(tutors.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error retrieving tutors' });
    }
  });

   // Route to get a specific tutor by tutor_id
   router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const tutor = await pool.query('SELECT * FROM tutors WHERE tutor_id = $1', [id]);
      if (tutor.rows.length === 0) {
        return res.status(404).json({ error: 'Tutor not found' });
      }
      res.json(tutor.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error retrieving tutor' });
    }
  });

  // Route to update a specific tutor by tutor_id
  router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, location, password, expertise, quick_bio } = req.body;
    try {
      // Build the update query dynamically based on the provided fields in the request body
      let updateQuery = 'UPDATE tutors SET ';
      const updateValues = [];
      let paramCount = 1;
  
      if (first_name) {
        updateQuery += `first_name = $${paramCount}, `;
        updateValues.push(first_name);
        paramCount++;
      }
      if (last_name) {
        updateQuery += `last_name = $${paramCount}, `;
        updateValues.push(last_name);
        paramCount++;
      }
      if (email) {
        updateQuery += `email = $${paramCount}, `;
        updateValues.push(email);
        paramCount++;
      }
      if (location) {
        updateQuery += `location = $${paramCount}, `;
        updateValues.push(location);
        paramCount++;
      }
      if (password) {
        updateQuery += `password = $${paramCount}, `;
        updateValues.push(password);
        paramCount++;
      }
      if (expertise) {
        updateQuery += `expertise = $${paramCount}, `;
        updateValues.push(expertise);
        paramCount++;
      }
      if (quick_bio) {
        updateQuery += `quick_bio = $${paramCount}, `;
        updateValues.push(quick_bio);
        paramCount++;
      }
  
      // Remove the trailing comma and space
      updateQuery = updateQuery.slice(0, -2);
  
      // Add the WHERE clause to the update query
      updateQuery += ` WHERE tutor_id = $${paramCount} RETURNING *`;
      updateValues.push(id);
  
      const updatedTutor = await pool.query(updateQuery, updateValues);
  
      if (updatedTutor.rows.length === 0) {
        return res.status(404).json({ error: 'Tutor not found' });
      }
      
      res.json(updatedTutor.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error updating tutor' });
    }
  });

  // Route to get tutor by location
  router.get('/location/:location', async (req, res) => {
    try {
      const { location } = req.params;
      const tutorsByLocation = await pool.query('SELECT * FROM tutors WHERE location ILIKE $1', [`%${location}%`]);
  
      if (tutorsByLocation.rows.length === 0) {
        return res.status(404).json({ error: 'No tutors found for the given location' });
      }
  
      res.json(tutorsByLocation.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server Error' });
    }
  });

  // Route to get tutor by expertise
  router.get('/expertise/:expertise', async (req, res) => {
    try {
      const { expertise } = req.params;
      const tutorsByExpertise = await pool.query('SELECT * FROM tutors WHERE expertise ILIKE $1', [`%${expertise}%`]);
  
      if (tutorsByExpertise.rows.length === 0) {
        return res.status(404).json({ error: 'No tutors found for the given expertise' });
      }
  
      res.json(tutorsByExpertise.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server Error' });
    }
  });

  
// add a tutor
router.post('/', async (req, res) => {
  const { first_name, last_name, email, location, password, expertise, quick_bio, image } = req.body;
  console.log(req.body);
  try {
    const newTutor = await pool.query(
      'INSERT INTO tutors (first_name, last_name, email, location, password, expertise, quick_bio) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [first_name, last_name, email, location, password, expertise, quick_bio]
    );
console.log(newTutor);
    res.status(201).json({ message: 'Tutor created successfully', tutor: newTutor.rows[0], redirect: '/success' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating tutor' });
  }
});

  return router;
};


