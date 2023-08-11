import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import "./StudentBookings.scss";

const StudentBookings = () => {
  const [bookings, setBookings] = useState([]);

  // const studentID = window.sessionStorage.getItem("student_id")
  // console.log(studentID);
  useEffect(() => {
    // Function to fetch bookings related to the logged-in student
    const fetchStudentBookings = async () => {
      try {
        const studentId = sessionStorage.getItem('student_id');
        const response = await axios.get(`/api/bookings/students/${studentId}/bookings`);
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchStudentBookings();
  }, []);

  return (
    <section>
      <div class="header-text">
          <img
            class="header-image-std-bookings"
            src={
              process.env.PUBLIC_URL +
              "/images/thought-catalog-505eectW54k-unsplash.jpg"
            }
            alt="headerImg"
          />

          <h1>My Bookings</h1>
        </div>
      
      {bookings.length === 0 ? (
        <p>No bookings</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.booking_id}>
              <p>Booking ID: {booking.booking_id}</p>
              <p>Class ID: {booking.class_id}</p>
              <p>Booking Date: {booking.booking_date}</p>
              <p>Payment Confirmed: {booking.payment_confirmed}</p>
              < Link to="/VideoComponent" > Video call tutor</ Link>
              <hr />
            </li>
          ))}
        </ul>
      )}
      <Footer />
    </section>
  );
};

export default StudentBookings;
