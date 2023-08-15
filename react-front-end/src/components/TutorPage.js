import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./TutorPage.scss";
import BookingCalendar from "./BookingCalendar";
import Footer from "./Footer";
import CheckoutForm from "./CheckoutForm"; // Import your PaymentForm component
import Navbar from "./Navbar"
import ChatModal from "./ChatModal";


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
      console.log(response.data, "fetch tutor info")
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

  //---------RETURN---------

  return (
    <div className="tutor-page-body">

    <Navbar mode="dark"/>
    
    
    

      <div class="tutor-page-content">
  
        <div class="tutor-page-img">
          <img className="tutor-image"
            src={tutor.image}
            alt={`${tutor.name}'s pic`}
          />
        </div>
  
        <div className="info-buttons-container">
          <div className="tutor-specific-info">
            <h3>{tutor.first_name} {tutor.last_name}</h3>
            <p>🎓 Expertise: {tutor.expertise}</p>
            <p>ℹ️ About {tutor.first_name}: {tutor.quick_bio}</p>
            <p>📊 Average student rating: {tutor.avg_rating}</p>
            <p>💲 Price: {tutor.avg_class_prices}</p>
            <p>🧑🏻‍🎓 Number of student taught: {tutor.num_students_booked}</p>
          </div>
          <div className="buttons">
  
            <BookingCalendar tutor={tutor} />
            {showCheckoutForm && <CheckoutForm />}
            
            {/* <ChatModal /> */}
            <ChatModal recipient={tutor} />
            {/* <button className="message-button">MESSAGE</button> */}
          </div>
        </div>
      </div>

      <div className="reviews-container">

        <h3>{tutor.first_name}'s Reviews</h3>

        <button className="review-btn" onClick={handleShowReviewForm}>Write a Review</button>

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
              <p>Rating: ⭐{review.rating} </p>
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
