import React from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({mode=""}) => {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } =
    useAuth0();

  return (
    <nav className={`Navbar${mode}`}>
      <Link to="/" className="logo">
        Learning Station
      </Link>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/about">About</Link>
        </li>

        <li>
          <Link to="/lessonPlanWriter">Learning Playground</Link>
        </li>

        {isAuthenticated && !isLoading ? (
          <li>
            <Link to="/StudentPage">Hello, {user.name}</Link>
            <button
              className="login-logout-btn"
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              Logout
            </button>
          </li>
        ) : (
          <li>
            <button
              className="login-logout-btn"
              onClick={() => loginWithRedirect()}
            >
              <FontAwesomeIcon
                icon={faSignInAlt}
                style={{ marginRight: "0.5rem" }}
              />
              Login
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
