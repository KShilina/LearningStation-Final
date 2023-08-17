import React, { useEffect } from "react";
import "./StudentPage.scss";
import { Link } from "react-router-dom"; // Import the Link component
import { useAuth0 } from "@auth0/auth0-react";
import Footer from "./Footer";

const StudentPage = () => {

  const {user, isAuthenticated, isLoading} = useAuth0()
  console.log(user, "user")

  useEffect(() => {
    
  
    
  }, [isAuthenticated])
  
  return (
    isAuthenticated && !isLoading && (
    <div>
      <div class="header-text">
          <img
            class="header-image-std"
            src={
              process.env.PUBLIC_URL +
              "/images/christin-hume-Hcfwew744z4-unsplash.jpg"
            }
            alt="headerImg"
          />

          <h1>Welcome to Student Page</h1>
        </div>
      
      <nav>
        <ul className="student-nav-links">
          {/* Use Link instead of a */}
          {/* <li>
            <Link to="/StudentMessages">Messages</Link>
          </li> */}
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
      <Footer />
    </div>
  ))
};

export default StudentPage;
