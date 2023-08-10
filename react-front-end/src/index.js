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

import TutorPage from "./components/TutorPage"
import VideoComponent from "./components/VideoComponent/App"

import StudentPage from "./components/StudentPage";
import StudentMessages from "./components/StudentMessages";
import StudentBookings from "./components/StudentBookings";
import LessonPlanWriter from "./components/LessonPlanWriter";
import Profile from "./components/Profile";
import SuccessPage from "./components/SuccessPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { ContextProvider } from './Context';
// import { stopReportingRuntimeErrors  } from 'react-error-overlay';
//
// if (process.env.NODE_ENV === "development") {
//   stopReportingRuntimeErrors(); // disables error overlays
// } 

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

        <Route path="/StudentPage" element={<StudentPage />} /> 
        <Route path="/StudentMessages" element={<StudentMessages />} /> 
        <Route path="/StudentBookings" element={<StudentBookings />} /> 
        <Route path="/LessonPlanWriter" element={<LessonPlanWriter />} /> 
        <Route path="/Profile" element={<Profile />} />
        <Route path="/VideoComponent" element={<VideoComponent />} />
        

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
    <ContextProvider>
    <Index />
    </ContextProvider>,
  </Auth0Provider>,
  document.getElementById("root")
);
