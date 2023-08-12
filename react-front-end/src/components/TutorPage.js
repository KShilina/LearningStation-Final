import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./TutorPage.scss";
import BookingCalendar from "./BookingCalendar";
import Footer from "./Footer";

import CheckoutForm from "./CheckoutForm"; // Import your PaymentForm component

const TutorPage = () => {
  const { id } = useParams();
  const [tutor, setTutor] = useState(null);

  const [reviews, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [showCheckoutForm, setShowCheckoutForm] = useState(false); // State to control the rendering of CheckoutForm
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReviewRating, setNewReviewRating] = useState(5); // Default rating
  const [newReviewComment, setNewReviewComment] = useState("");

  useEffect(() => {
    fetchTutorInfo(id);
    fetchTutorReviews(id);
  }, [id]);

  const fetchTutorInfo = async (tutorId) => {
    try {
      const response = await axios.get(`/api/tutors/${tutorId}`);
      setTutor(response.data);
    } catch (error) {
      console.error("Error fetching tutor information:", error);
    }
  };

  const fetchTutorReviews = async (tutorId) => {
    try {
      const response = await axios.get(`/api/reviews/tutors/${tutorId}`);
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching tutor reviews:", error);
    }
  };

  const handleBookClass = () => {
    setShowModal(true);
    setShowCheckoutForm(true); // Set showCheckoutForm to true when booking a class
  };

  const handleShowReviewForm = () => {
    setShowReviewForm(true);
  };

  const handleReviewSubmit = async () => {
    try {
      const response = await axios.post("/api/reviews", {
        student_id: 1, // Replace with the actual student_id
        tutor_id: id,
        rating: newReviewRating,
        comment: newReviewComment,
      });
      const newReview = response.data;
      setReviews([...reviews, newReview]);
      setNewReviewRating(5);
      setNewReviewComment("");
      setShowReviewForm(false);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  if (!tutor) {
    return <div>Loading tutor information...</div>;
  }

  return (
    <div className="tutor-page-card">
      <img
        className="tutor-image"
        src={tutor.image}
        alt={`${tutor.name}'s pic`}
      />
      <div className="info-container">
        <div className="tutor-info">
          <h3>{tutor.name}</h3>
          <p>
            Name: {tutor.first_name} {tutor.last_name}
          </p>
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
      <div className="reviews-container">
        <h3>Reviews</h3>
        <button onClick={handleShowReviewForm}>Write a Review</button>
        {showReviewForm && (
          <div className="review-form">
            <select
              value={newReviewRating}
              onChange={(e) => setNewReviewRating(e.target.value)}
            >
              <option value={5}>5 stars</option>
              <option value={4}>4 stars</option>
              <option value={3}>3 stars</option>
              <option value={2}>2 stars</option>
              <option value={1}>1 star</option>
            </select>
            <textarea
              placeholder="Write your review..."
              value={newReviewComment}
              onChange={(e) => setNewReviewComment(e.target.value)}
            />
            <button onClick={handleReviewSubmit}>Submit Review</button>
          </div>
        )}
        <ul className="reviews-list">
          {reviews.map((review) => (
            <li key={review.review_id}>
              <p>Rating: {review.rating}</p>
              <p>Comment: {review.comment}</p>
              <p>Review Date: {review.review_date}</p>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default TutorPage;
