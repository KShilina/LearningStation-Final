import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { Auth0Provider } from "@auth0/auth0-react";
import Logout from "./components/Logout";
import Home from "./components/Home";
import StudentRegister from "./components/StudentRegister";
import TutorRegister from "./components/TutorRegister";


export default function Index() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/StudentRegister" element={<StudentRegister />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/TutorRegister" element={<TutorRegister />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(
  <Auth0Provider
    domain="dev-qwjytyiwyzskt1lz.us.auth0.com"
    clientId="OF7lBHIjm9KIuIkweBNsl7TNf6gyPlhc"
    redirectUri={window.location.origin + "/dashboard"}
  >
    <Index />{" "}
  </Auth0Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
