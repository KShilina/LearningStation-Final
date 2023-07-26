
// Web server config
require('dotenv').config() 


const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();
const port = 8080;

// middleware
app.use(cors());
app.use(express.json()); // req.body


const pool = new Pool({
  host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

app.get('/',(req, res) => {
  res.send('Hello World')
 })

// Routes
const studentsRouter = require('./routes/students');
// Define the router for search functions
const router = express.Router(); 


const tutorsRouter = require('./routes/tutors');
const classesRouter = require('./routes/classes');
const bookingsRouter = require('./routes/bookings');
const messagesRouter = require('./routes/messages');
const searchRouter = require('./routes/search');



app.use('/api/students', studentsRouter(pool));
app.use('/api/tutors', tutorsRouter(pool));
app.use('/api/classes', classesRouter(pool));
app.use('/api/bookings', bookingsRouter(pool));
app.use('/api/messages', messagesRouter(pool));
app.use('/api/search', searchRouter(pool)); // Use the search route



app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${port} so that's pretty good 👍`);
});

