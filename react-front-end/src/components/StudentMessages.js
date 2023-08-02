import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentMessages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Function to fetch messages related to the logged-in student
    const fetchStudentMessages = async () => {
      try {
        const response = await axios.get("/api/messages/students/studentId/messages");
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchStudentMessages();
  }, []);

  return (
    <section>
      <h2>My Messages</h2>
      {messages.length === 0 ? (
        <p>No messages</p>
      ) : (
        <ul>
          {messages.map((message) => (
            <li key={message.message_id}>
              <p>Message ID: {message.message_id}</p>
              <p>Content: {message.content}</p>
              <p>Sent At: {message.sent_at}</p>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default StudentMessages;
