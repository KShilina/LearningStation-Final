
// Web server config
require('dotenv').config() 


const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();
const server = require("http").createServer(app);
const port = 8080;
//added for chat
const session = require('express-session')

const io = require("socket.io")(server, {
	cors: {
		origin: "*",
		methods: [ "GET", "POST" ]
	}
});

// middleware
app.use(cors());
app.use(express.json()); // req.body

const stripe = require("stripe")(process.env.STRIPE_API_KEY);



const pool = new Pool({
  host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
});

// home page route
app.get('/',(req, res) => {
  console.log("here too")
  res.send('Hello World')
 })

 const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

 app.post("/api/payments", async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "cad",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});


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


//socket video connection 
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
//

//---------socket chat connection---------
const clients = {};

// Allow socket.io to access session
// const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
// io.use(wrap(session));

// let user = 0

io.on('connection', client => {
  const session = client.request.session;
  console.log(client.handshake.query.name)
  const name = session?.user?.name; //figure out how to switch from cookies to session.

  
  console.log("Client Connected!", name, " : ", client.id);
  // client.emit("system", `Welcome ${name}`);
  // client.broadcast.emit('system', `${user} has just joined`); // Change first_name to name

  // Add this client.id to our clients lookup object
  clients[client.handshake.query.name] = client.id;
  console.log(clients);
  // client.broadcast.emit("private", {from: "system", text: "testing send"})
   

  client.on('message', data => {
    console.log(data);
    const {text, to} = data;
    const from = name;

    if (!to) {
      client.broadcast.emit('public', {text, from});
      return;
    }

    const id = clients[to];
    if (id) {
    console.log(`Sending message to ${to}:${id}`);
    // io.to(id).emit('private', {from: "system", text: "testing send"})
    io.to(id).emit('private', {from, text}); //working 1-way message
    } else {
      // Handle case when recipient is not found
      client.emit('system', `Recipient '${to}' not found.`);
    }
  });

  client.on("disconnect", () => {
    console.log("Client Disconnected", name, " : ", client.id);
    // client.broadcast.emit('system', `${name} has just left`); // Change first_name to name
    delete clients[name];
  });
});


//-------------

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${port} so that's pretty good 👍`);
});