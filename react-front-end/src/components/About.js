import React from "react";
import './About.scss';
import Navbar from "./Navbar";
import Footer from "./Footer";

const About = () => {
  return (
    <div className="about-container">
      
          <Navbar />
          <div class="header-text">
    <img class="header-image" src={process.env.PUBLIC_URL + '/images/About.jpg'} alt="headerImg" />
    
    
    <h1>WHAT WE DO</h1>
  </div>
   <div className="about-paragraph">
      <h2 style={{textAlign: "center"}}>About Us</h2>
      <p>
        Welcome to our Learning Station! We are a team of passionate educators
        and tutors dedicated to providing high-quality online learning
        experiences for students of all ages and backgrounds.
      </p>
      <p>
        Our mission is to make education accessible and enjoyable for everyone.
        Whether you're a student looking for help in a specific subject or a
        tutor eager to share your expertise, you've come to the right place.
      </p>
      <p>
        Our platform offers a wide range of classes taught by experienced tutors
        from various fields. From academic subjects to creative arts and
        languages, we have something for everyone.
      </p>
      <p>
        Join us on this exciting learning journey and unlock your full
        potential!🌱🌱🌱
      </p>
      </div>
      <Footer />
    </div>
  );
};

export default About;


