// TutorCard.js
import React from 'react';
import './TutorCard.scss';
import { Link } from "react-router-dom";

const TutorCard = ({ tutor, classes }) => {
  return (
    
    <Link to={`/tutors/${tutor.tutor_id}`} className="tutor-card">
      <div class="tutor-card-content">
        <div className="tutor-card-info">
          <h3>{tutor.name}</h3>
          <p class="tutor-card-name" >{tutor.first_name} {tutor.last_name}</p>
          <p>Expertise: {tutor.expertise}</p>
          <p>About Me: {tutor.quick_bio}</p>
          <p>Location: {tutor.location}</p>
          {/* Add more tutor information here as needed */}
        </div>
  
        <img className="tutor-card-image" src={tutor.image} alt={`${tutor.name}'s pic`} />
      </div>
    </Link>
  );
};


export default TutorCard;