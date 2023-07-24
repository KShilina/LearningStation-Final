import React, { useState } from "react";
import axios from "axios";
import "./App.css";
// import { Auth0Provider } from '@auth0/auth0-react';

const App = () => {
  const [message, setMessage] = useState("Click the button to load data!");

  const fetchData = () => {
    axios
      .get("/api/data") // You can simply make your requests to "/api/whatever you want"
      .then((response) => {
        // handle success
        console.log(response.data); // The entire response from the Rails API

        console.log(response.data.message); // Just the message
        setMessage(response.data.message);
      })
      .catch((error) => {
        // handle error if needed
        console.error(error);
      });
  };

  return (
    <div className="App">
      <h1>{message}</h1>
      <button onClick={fetchData}>Fetch Data</button>
    </div>
  );
};

export default App;
