import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./TutorPage.scss"
import BookingCalendar from './BookingCalendar';

import CheckoutForm from "./CheckoutForm"; // Import your PaymentForm component




const TutorPage = () => {
  const { id } = useParams();
  const [tutor, setTutor] = useState(null);
  
  const [showCheckoutForm, setShowCheckoutForm] = useState(false); // State to control the rendering of CheckoutForm

 
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

  const handleBookClass = () => {
    // Set the state to show CheckoutForm
    setShowCheckoutForm(true);
  };

  if (!tutor) {
    return <div>Loading tutor information...</div>;
  }


  return (
   
    
      
      <div className="tutor-card"> 
        <img className="tutor-image" src={tutor.image} alt={`${tutor.name}'s pic`} />
        <div className="info-container">
          <div className="tutor-info">
            <h3>{tutor.name}</h3>
            <p>Name: {tutor.first_name} {tutor.last_name}</p>
            <p>Expertise: {tutor.expertise}</p>
            <p>About_Me: {tutor.quick_bio}</p>
            <p>avg_rating: {tutor.avg_rating}</p>
            <p>avg_class_prices: {tutor.avg_class_prices}</p>
            <p>num_students_booked: {tutor.num_students_booked}</p>
          </div>
          <div className="buttons">
            {/* <button className="book-class-button" onClick={handleBookClass}>BOOK a Class</button> */}
            {/* Render the CheckoutForm component when showCheckoutForm is true */}
            

            {/* <button className="book-class-button">BOOK a Class</button> */}
            <BookingCalendar tutor={tutor} />
            {showCheckoutForm && <CheckoutForm />}

            <button className="message-button">MESSAGE</button>
          </div>
        </div>
      </div>
 
    )
  
  };

export default TutorPage;

