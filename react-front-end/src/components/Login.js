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

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Home  from "./Home";
import StudentPage from "./StudentPage";

const Login = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  
  if (isAuthenticated) {

   return <Home    />; // Redirect to the Home page
  }

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={() => loginWithRedirect({redirectUri : window.location.origin +"/"})}>Log In</button>
    </div>
  );
};

export default Login;



