import React, { useEffect } from "react";
import "./StudentPage.scss";
import { Link } from "react-router-dom"; // Import the Link component
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const StudentPage = () => {

  const {user, isAuthenticated, isLoading} = useAuth0()
  console.log(user, "user")

  useEffect(() => {
    
  
    
  }, [isAuthenticated])
  
  return (
    isAuthenticated && !isLoading && (
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
  ))
};

export default StudentPage;

// //KATYA code snippet

// import React from "react";
// import "./StudentPage.scss";
// import { Link } from "react-router-dom"; // Import the Link component

// const StudentPage = () => {
//   return (
//     <div>
//       <h1 className="header">Welcome</h1>
//       <nav>
//         <ul className="nav-links">
//           {/* Use Link instead of a */}
//           <li>
//             <Link to="/StudentMessages">Messages</Link>
//           </li>
//           <li>
//             <Link to="/StudentBookings">Bookings</Link>
//           </li>
//           <li>
//             <Link to="/">Home</Link>
//           </li>
//           <li>
//             <Link to="/logout">Log out</Link>
//           </li>
//           <li>
//             <Link to="/profile">My Profile</Link>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default StudentPage;

