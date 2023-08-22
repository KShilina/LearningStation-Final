import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./TutorPage.scss";
import BookingCalendar from "./BookingCalendar";
import Footer from "./Footer";
import Navbar from "./Navbar";
import ChatModal from "./ChatModal"; // Make sure to import the ChatModal component
import { useAuth0 } from "@auth0/auth0-react";

const TutorPage = () => {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();

  const { id } = useParams();
  const [tutor, setTutor] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState("");
  const [avrclassprice, setAvrclassprice] = useState(0);

  useEffect(() => {
    fetchTutorInfo(id);
    fetchTutorReviews(id);
    fetchTutorClasses(id);
  }, [id]);

  const fetchTutorClasses = async (tutorId) => {
    try {
      const response = await axios.get(`/api/classes?tutor_id=${tutorId}`);
      // setTutor(response.data);
      console.log(response.data, "fetch tutor classes")
      console.log(Number(response.data[0].class_price.substring(1)));
      setAvrclassprice(Number(response.data[0].class_price.substring(1)))
    } catch (error) {
      console.error("Error fetching tutor information:", error);
    }
  };

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
    setShowCheckoutForm(true);
  };

  const handleShowReviewForm = () => {
    setShowReviewForm(true);
  };

  const handleReviewSubmit = async () => {
    try {
      const response = await axios.post("/api/reviews", {
        student_id: 1,
        tutor_id: id,
        rating: newReviewRating,
        comment: newReviewComment,
      });
      const newReview = response.data;
      setReviews([...reviews, newReview]);
      setNewReviewRating(5);
      setNewReviewComment("");
      setShowReviewForm(false);
      fetchTutorInfo(id);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const handleReload = () => {
    window.location.reload();
  };

  if (!tutor) {
    return <div>Loading tutor information...</div>;
  }

  return (
    <div className="tutor-page-body">
      <Navbar mode="dark" />
      
      <div className="tutor-page-content">
        <div className="tutor-page-img">
          <img
            className="tutor-image"
            src={tutor.image}
            alt={`${tutor.name}'s pic`}
          />
        </div>

        <div className="info-buttons-container">
          <div className="tutor-specific-info">
            <h3>{tutor.first_name} {tutor.last_name}</h3>
            <p>🎓 Expertise: {tutor.expertise}</p>
            <p>ℹ️ About {tutor.first_name}: {tutor.quick_bio}</p>
            <p>📊 Average student rating: {Number.parseFloat(tutor.avg_rating).toFixed(1)}</p>
            <p>💲 Price: CAD {avrclassprice}</p>
            <p>🧑🏻‍🎓 Number of students taught: {tutor.num_students_booked}</p>
          </div>
          <div className="buttons">
        {isAuthenticated && !isLoading ? (
          <>
            <BookingCalendar tutor={tutor} />
            <ChatModal recipient={tutor} />
          </>
        ) : (
          <p className="login-message">Please log in to book a class or send a message.</p>
        )}
      </div>
        </div>
      </div>

      <div className="reviews-container">
        <h3>{tutor.first_name}'s Reviews</h3>
        {isAuthenticated && !isLoading && ( // The correct position for the parentheses
          <button className="review-btn" onClick={handleShowReviewForm}>
            Write a Review
          </button>
        )}

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
            <button
              onClick={() => {
                handleReviewSubmit();
                handleReload();
              }}
            >
              Submit Review
            </button>
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
