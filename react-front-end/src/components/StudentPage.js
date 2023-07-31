import React from "react";
import "./StudentPage.scss";
import { Link } from "react-router-dom"; // Import the Link component

const StudentPage = () => {
  return (
    <div>
      <h1 className="header">Welcome to Student Page</h1>
      <nav>
        <ul className="nav-links">
          {/* Use Link instead of a */}
          <li>
            <Link to="/StudentMessages">Messages</Link>
          </li>
          <li>
            <Link to="/StudentBookings">Bookings</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/logout">Log out</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default StudentPage;
