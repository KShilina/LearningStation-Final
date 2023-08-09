
// Web server config
require('dotenv').config() 


const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();
const server = require("http").createServer(app);
const port = 8080;

const io = require("socket.io")(server, {
	cors: {
		origin: "*",
		methods: [ "GET", "POST" ]
	}
});

// middleware
app.use(cors());
app.use(express.json()); // req.body


const pool = new Pool({
  host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    database: process.env.DB_NAME
});

// home page route
app.get('/',(req, res) => {
  console.log("here too")
  res.send('Hello World')
 })


const studentsRouter = require('./routes/students');
const tutorsRouter = require('./routes/tutors');
const classesRouter = require('./routes/classes');
const bookingsRouter = require('./routes/bookings');
const messagesRouter = require('./routes/messages');
const searchRouter = require('./routes/search');
const reviewsRouter = require('./routes/reviews');


app.use('/api/students', studentsRouter(pool));
app.use('/api/tutors', tutorsRouter(pool));
app.use('/api/classes', classesRouter(pool));
app.use('/api/bookings', bookingsRouter(pool));
app.use('/api/messages', messagesRouter(pool));
app.use('/api/search', searchRouter(pool)); // Use the search route
app.use('/api/reviews', reviewsRouter(pool));

//socket connection 
io.on("connection", (socket) => {
	console.log(socket.id)
	socket.emit("me", socket.id);

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	});

	socket.on("callUser", ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit("callUser", { signal: signalData, from, name });
	});

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	});
});
///


server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${port} so that's pretty good 👍`);
});