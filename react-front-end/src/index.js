import React from "react";
import ReactDOM from "react-dom";
import "./index.css";


import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { Auth0Provider } from "@auth0/auth0-react";
import Logout from "./components/Logout";
import Home from "./components/Home";
import StudentRegister from "./components/StudentRegister";
import TutorRegister from "./components/TutorRegister";
import About from "./components/About";
import Success from "./Success";

import TutorPage from "./components/TutorPage";

import StudentPage from "./components/StudentPage";
import StudentMessages from "./components/StudentMessages";
import StudentBookings from "./components/StudentBookings";
import LessonPlanWriter from "./components/LessonPlanWriter";
import CheckoutForm from "./components/CheckoutForm";


export default function Index() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/StudentRegister" element={<StudentRegister />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/TutorRegister" element={<TutorRegister />} />
        <Route path="/Success" element={<Success />} />

        <Route path="/tutors/:id" element={<TutorPage />} />

        <Route path="/StudentPage" element={<StudentPage />} />
        <Route path="/StudentMessages" element={<StudentMessages />} />
        <Route path="/StudentBookings" element={<StudentBookings />} />
        <Route path="/LessonPlanWriter" element={<LessonPlanWriter />} />
        <Route path="/LessonPlanWriter" element={<LessonPlanWriter />} />
        <Route path="/CheckoutForm" element={<CheckoutForm />} />
      
    </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(
  <Auth0Provider
    // domain="dev-qwjytyiwyzskt1lz.us.auth0.com"
  
    // clientId="OF7lBHIjm9KIuIkweBNsl7TNf6gyPlhc"
    clientId="rC65vq1k05qHmpGa6dlWFSFqaZgVRmCk"
    redirectUri={window.location.origin + "/dashboard"}
    domain="dev-tocbpwv8uqlsfl20.us.auth0.com"
  
    authorizationParams={{
      redirect_uri: window.location.origin + "/",
    }}
    onError={(err) => console.error("Auth0 Error:", err)}
  >
   <Index />
  </Auth0Provider>,

  document.getElementById("root")
);
