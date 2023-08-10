import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Profile from "./components/Profile";
import SuccessPage from "./components/SuccessPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

export default function Index() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/studentRegister" element={<StudentRegister />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/tutorRegister" element={<TutorRegister />} />
        <Route path="/success" element={<Success />} />

        <Route path="/tutors/:id" element={<TutorPage />} />

        <Route path="/studentPage" element={<StudentPage />} />
        <Route path="/studentMessages" element={<StudentMessages />} />
        <Route path="/studentBookings" element={<StudentBookings />} />
        <Route path="/lessonPlanWriter" element={<LessonPlanWriter />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/success" component={<SuccessPage />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(
  <Auth0Provider
    domain="dev-tocbpwv8uqlsfl20.us.auth0.com"
    clientId="rC65vq1k05qHmpGa6dlWFSFqaZgVRmCk"
    authorizationParams={{
      redirect_uri: window.location.origin + "/",
    }}
    onError={(err) => console.error("Auth0 Error:", err)}
  >
    <Index />
  </Auth0Provider>,
  document.getElementById("root")
);
