import React from 'react';
import { Link } from 'react-router-dom';
import './Success.scss'; // Import the CSS file for styling

const Success = () => {
  return (
    <div className="success-container">
      <h1 className="success-heading">Welcome on Board!</h1>
      <p className="success-message">Your registration was successful ✅</p>

      {/* Add a link to the home page */}
      <Link to="/" className="home-link">
        Go to Home
      </Link>
    </div>
  );
};

export default Success;
