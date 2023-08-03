
const express = require('express');
const router = express.Router();


module.exports = (pool) => {
  // get student or tutor using Auth0 data
  router.post('/', async (req, res) => {
    const Auth0user = req.body.user


    try {
      const queryStudent = `
        SELECT *
        FROM students
        WHERE email = $1;
      `;
      const valueStudent = [Auth0user.email];
      const resultStudent = await pool.query(queryStudent, valueStudent);
      const student = resultStudent.rows[0]
      console.log("resultStudent.rows[0]:",student);
      if (student){
        return res.json({type:"student", user:student})
      }

      const queryTutor = `
        SELECT * from tutors
        WHERE email = $1;
      `;
      const valueTutor = [Auth0user.email];
      const resultTutor = await pool.query(queryTutor, valueTutor);
      const tutor = resultTutor.rows[0]
      if (tutor){
        return res.json({type:"tutor", user:tutor})
      }
      
       
      return res.json({type: null, user: null});

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error retrieving students' });
    }
  });


 
 

  return router;
};