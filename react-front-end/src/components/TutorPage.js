import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./TutorPage.scss"

const TutorPage = () => {
  const { id } = useParams();
  const [tutor, setTutor] = useState(null);

  useEffect(() => {
    fetchTutorInfo(id);
  }, [id]);

  const fetchTutorInfo = async (tutorId) => {
    try {
      const response = await axios.get(`/api/tutors/${tutorId}`);
      setTutor(response.data);
    } catch (error) {
      console.error('Error fetching tutor information:', error);
    }
  };

  if (!tutor) {
    return <div>Loading tutor information...</div>;
  }

  return (
    // <div className="tutor-page-container">
      <div className="tutor-card">
        <img className="tutor-image" src={tutor.image} alt={`${tutor.name}'s pic`} />
        <div className="info-container">
          <div className="tutor-info">
            <h3>{tutor.name}</h3>
            <p>Name: {tutor.first_name} {tutor.last_name}</p>
            <p>Expertise: {tutor.expertise}</p>
            <p>About_Me: {tutor.quick_bio}</p>
            <p>location: {tutor.location}</p>
          </div>
          <div className="buttons">
            <button className="book-class-button">BOOK a Class</button>
            <button className="message-button">MESSAGE</button>
          </div>
        </div>
      </div>
    // </div>
  );
};

export default TutorPage;