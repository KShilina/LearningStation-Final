import React, { useEffect, useState } from "react";
import axios from "axios";

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
      <h2>My Bookings</h2>
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
              <hr />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default StudentBookings;
