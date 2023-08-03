import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import './CalendarStyle.scss';

const localizer = momentLocalizer(moment);

const MyCalendar = (props) => {
  const [myEventsList, setMyEventsList] = useState([]);

  useEffect(() => {
    // Function to fetch student bookings from the backend API
    const fetchStudentBookings = async () => {
      try {
        const studentId = 1; // Replace 1 with the actual student ID you want to fetch bookings for
        const response = await fetch(`/api/bookings/students/${studentId}/bookings`);
        const bookings = await response.json();

        // Convert the bookings data into the required format for the calendar
        const events = bookings.map((booking) => ({
          title: `Booking ${booking.booking_id}`,
          start: new Date(booking.booking_date),
          end: new Date(booking.booking_date), // Assuming booking duration is 1 hour, adjust as needed
        }));

        setMyEventsList(events);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudentBookings();
  }, []);

  return (
    <div className="myCustomHeight">
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
};

export default MyCalendar;
