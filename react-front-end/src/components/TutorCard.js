// TutorCard.js
import React from 'react';
import './TutorCard.scss';
import { Link } from "react-router-dom";

const TutorCard = ({ tutor, classes }) => {
  return (
    <Link to={`/tutors/${tutor.tutor_id}`} className="tutor-card">
      <div className="tutor-info">
        <h3>{tutor.name}</h3>
        <p>Name: {tutor.first_name} {tutor.last_name}</p>
        <p>Expertise: {tutor.expertise}</p>
        <p>About_Me: {tutor.quick_bio}</p>
        <p>location: {tutor.location}</p>
        {/* Add more tutor information here as needed */}
      </div>
      <img className="tutor-image" src={tutor.image} alt={`${tutor.name}'s pic`} />
    </Link>
  );
};

export default TutorCard;