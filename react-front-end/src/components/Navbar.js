import React from 'react'
import SearchBar from './SearchBar';
import './navbar.scss';
import { Link } from 'react-router-dom';

const Navbar = () => {
  // Function to handle search
  const handleSearch = (searchTerm) => {
    // Perform search functionality here based on the searchTerm
    console.log('Search Term:', searchTerm);
  };

  // function Navbar() {
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
            <select id="signup-dropdown">Sign up
              <option value="">Sign up</option>
              <option value="student">Sign up as a Student</option>
              <option value="tutor">Sign up as a Tutor</option>
            </select>
          </div>
        </li>

        <Link to="/StudentRegister">
          <button>Student Register</button>
        </Link>

        <Link to="/TutorRegister">
          <button>Tutor Register</button>
        </Link>

        <li>
          <a href="/login">Login</a>
        </li>

      </ul>
    </nav>
  );
};

export default Navbar