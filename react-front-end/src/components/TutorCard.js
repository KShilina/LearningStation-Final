// TutorCard.js
import React from 'react';
import './TutorCard.scss';

const TutorCard = ({ tutor }) => {
  return (
    <div className="tutor-card">
      <h3>{tutor.name}</h3>
      <p>Name: {tutor.first_name}</p>
      <p>Expertise: {tutor.expertise}</p>
      <img src={tutor.image} alt={`${tutor.name}'s pic`} />
      {/* Add more tutor information here as needed */}
    </div>
  );
};

export default TutorCard;