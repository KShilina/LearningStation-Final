import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./Footer";
import "./StudentBookings.scss";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import moment from "moment";
// import "./videoComponent";

const StudentBookings = () => {
  const [bookings, setBookings] = useState([]);

  //-----test----
    const handleReload = () => {
      window.location.reload(); // Reload the current page
    };
  
  // const studentID = window.sessionStorage.getItem("student_id")
  // console.log(studentID);
  useEffect(() => {
    // Function to fetch bookings related to the logged-in student
    const fetchStudentBookings = async () => {
      try {
        const studentId = sessionStorage.getItem("student_id");
        const response = await axios.get(
          `/api/bookings/students/${studentId}/bookings`
        );
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchStudentBookings();
  }, []);

  return (
    <section>
      <Navbar />
      <div className="header-student-booking-text">
       <div className="header-text-bookings">
        <img
          className="header-image-std-bookings"
          src={
            process.env.PUBLIC_URL +
            "/images/thought-catalog-505eectW54k-unsplash.jpg"
          }
          alt="headerImg"
        />
        <h1>My Bookings</h1>
        </div>
      </div>

      {/* <div className="student-booking-content"> */}
      {bookings.length === 0 ? (
        <p className="no-booking-message"> No bookings </p>
      ) : (
        <div className="booking-table">
          <h1>Booking Details</h1>
          <table>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Class ID</th>
                <th>Booking Date</th>
                <th>Payment Confirmed</th>
                <th>Virtual Room</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.booking_id}>
                  <td>{booking.booking_id}</td>
                  <td>{booking.class_id}</td>
                  <td>{moment(booking.booking_date).format("MMMM D, YYYY")}</td>
                  <td>{booking.payment_confirmed ? "❌" : "✅"}</td>{" "}
                  <td>
                     {/* <Link to="/videoComponent">VideoComponent</Link> */}

                     <div className="video-button-booking">
                      <a  href="/videoComponent" onClick={handleReload}>
                        Video Messenger
                      </a>
                    </div>
                    
                  </td>
                  {/* Conditional rendering */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* </div> */}

      <nav>
        <ul className="student-nav-links">
          {/* Use Link instead of a */}
          {/* <li>
            <Link to="/StudentMessages">Messages</Link>
          </li> */}
        </ul>
      </nav>
      <Footer />
    </section>
  );
};

export default StudentBookings;
