import React, { useState } from "react";
import "./navbar.scss";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();

  // Function to handle the dropdown selection change
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Function to handle Sign up dropdown selection
  const handleSignUpOption = () => {
    if (selectedOption === "student") {
      navigate("/StudentRegister");
    } else if (selectedOption === "tutor") {
      navigate("/TutorRegister");
    }
  };

  return (
    <nav className="Navbar">
      <ul className="nav-links">
        <li>
          <a href="/">Home</a>
        </li>

        <li>
          <a href="/about">About</a>
        </li>

        <li>
          {/* Dropdown menu for Sign Up */}
          <div className="signup-dropdown">
            <select
              id="signup-dropdown"
              onChange={handleSelectChange}
              value={selectedOption}
            >
              <option value="">Choose from</option>
              <option value="student">Become a Student</option>
              <option value="tutor">Become a Tutor</option>
            </select>
          </div>
        </li>

        <li>
          {/* Use a button for Sign Up to trigger handleSignUpOption */}
          <button onClick={handleSignUpOption}>Sign up</button>
        </li>

        <li>
          <a href="/login">Login</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
