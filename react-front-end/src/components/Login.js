// import React from "react";
// import { useAuth0 } from "@auth0/auth0-react";
// import Dashboard from "./Dashboard";

// const Login = () => {
//   const { loginWithRedirect, isAuthenticated } = useAuth0();

//   return isAuthenticated ? (
//     <Dashboard />
//   ) : (
//     <div>
//       <h1>Login Page</h1>
//       <button onClick={() => loginWithRedirect()}>Log In</button>
//     </div>
//   );
// };

// export default Login;

import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Home  from "./Home";
import axios from "axios";

const Login = () => {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();
  useEffect(() => {
    // Fetch three tutors from the backend when the component mounts
    getDatabaseUser(user);
  }, [user]);

  
   const getDatabaseUser = async (auth0user) => {
    if (!auth0user){
return console.log("NO Auth user");
    }
    console.log("Fetching user",auth0user);
      try {
        const response = await axios.post("/api/auth0/users", {user: auth0user});
        console.log(response);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
  
  // if (isAuthenticated ) {
  //   getDatabaseUser(user)
  //   return <Home />; // Redirect to the Home page
  //   // if (!user.email){

  //   // }
  //   // If (user.email && )
  // }

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={() => loginWithRedirect({redirectUri : window.location.origin +"/"})}>Log In</button>
    </div>
  );


};

export default Login;



