import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Dashboard from "./Dashboard";

const Login = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return isAuthenticated ? (
    <Dashboard />
  ) : (
    <div>
      <h1>Login Page</h1>
      <button onClick={() => loginWithRedirect()}>Log In</button>
    </div>
  );
};

export default Login;
