import {useEffect, useState} from 'react';
import io from 'socket.io-client';
// import useSound from 'use-sound';
// import sound from 'sounds/notify.mp3';
import "./Chat.scss"

const Chat = function(props) {
  // const [play] = useSound(sound, {volume: 0.75});
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState();
  const [text, setText] = useState("");
  const [to, setTo] = useState("");

  const logName = sessionStorage.getItem("first_name");
  console.log(logName)
  useEffect(() => {
    const socket = io({query:`name=${logName}`});
    setSocket(socket);

    socket.on('connect', () => {
      // console.log("Connected.");
    });

    socket.on("system", data => {
      // console.log(data);
      setMessages(prev => [data, ...prev]);
    });

    socket.on("public", data => {
      // const message = `${data.from} says:  ${data.text}`;
      const message = `${data.text}`; //"undefined says"removed
      setMessages(prev => [message, ...prev]);
      // console.log(data, "public");
    });

    socket.on("private", data => {
      console.log(data, "data")
      // const message = `${data.from} says:  ${data.text}`;
      const message = `${data.text}`; //"undefined says"removed
      setMessages(prev => [message, ...prev]);
      // console.log(data, "private");
    });

    return () => socket.disconnect(); // prevents memory leaks
  },[logName]);


  const send = function() {
    // socket.emit("message", {text, to});//extra code
    // socket.emit("message", { text, to: to }); //working 1-way message
      const senderName = sessionStorage.getItem("first_name"); // Get sender's name from sessionStorage
      socket.emit("message", { text, to, senderName });
      setText("");
      // setMessages("");
      // Send the entered text message and sender's name ----added
    };


  const list = messages.map((msg, i) => {
    // if (msg.from === "system") { //---added
    //   return <li key={i}>{msg.text}</li>; //---added
    // } //---added
    // return <li key={i}>{msg.from} says: {msg.text}</li>; //---added
    return <li key={i}>{msg}</li>;//working 1-way messaging
  });

  return (
    <div class="chat-box">
      <div class="text-boxes">
        <div>
          <input
            // onChange={event => setTo(event.target.value)}
            // value={to}
            // placeholder="Recipient" />
            onChange={event => setTo(event.target.value)}
            value={to || props.recipient.first_name}
            placeholder="Recipient" />
        </div>
  
        <div>
          <textarea
            onChange={e => setText(e.target.value)}
            placeholder="Type a message" />
        </div>
      </div> 

      <div class="buttons">
        <button onClick={send}>Send</button>
        <button onClick={() => setMessages([])}>Clear</button>
      </div>

      <div class="messages">
        <ul>
          {list}
        </ul>
      </div>

    </div>
  );
};

export default Chat;