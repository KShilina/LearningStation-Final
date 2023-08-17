const express = require('express');
const router = express.Router();
  
  module.exports = (pool, io) => {

    const clients = {};
    
    router.get('/', async (req, res) => {
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
    res.status(200).send('okay')
  });

  
  return router;
}