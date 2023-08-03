// import React, { useState, useEffect } from "react";
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';
// import './CalendarStyle.scss';

// const localizer = momentLocalizer(moment);

// const MyCalendar = (props) => {
//   const [myEventsList, setMyEventsList] = useState([]);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   //add a booking through calendar
//   const [bookingDetails, setBookingDetails] = useState({
//     title: "",
//     start: null,
//     end: null,
//     additionalInfo: "",
//   });

//   useEffect(() => {
//     // Function to fetch student bookings from the backend API
//     const fetchStudentBookings = async () => {
//       try {
//         const studentId = 1; // Replace 1 with the actual student ID you want to fetch bookings for
//         const response = await fetch(`/api/bookings/students/${studentId}/bookings`);
//         const bookings = await response.json();

//         // Convert the bookings data into the required format for the calendar
//         const events = bookings.map((booking) => ({
//           title: `Booking ${booking.booking_id}`,
//           start: new Date(booking.booking_date),
//           end: new Date(booking.booking_date), // Assuming booking duration is 1 hour, adjust as needed
//         }));

//         setMyEventsList(events);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchStudentBookings();
//   }, []);

//   const handleSelectSlot = ({ start, end }) => {
//     // Here, you can handle the logic to create a booking based on the selected slot.
//     // For example, you can open a booking modal with the selected date/time.
//     setSelectedSlot({ start, end });
//   };

//   return (
//     <div className="myCustomHeight">
//       <Calendar
//         localizer={localizer}
//         events={myEventsList}
//         startAccessor="start"
//         endAccessor="end"
//         selectable // Enable user selection
//         onSelectSlot={handleSelectSlot} // Handle slot selection
//       />
//     </div>
//   );
// };

// export default MyCalendar;

import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import './CalendarStyle.scss';

const localizer = momentLocalizer(moment);

const MyCalendar = (props) => {
  const [myEventsList, setMyEventsList] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    title: "",
    start: null,
    end: null,
    additionalInfo: "",
  });

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

  const handleSelectSlot = ({ start, end }) => {
    // Store the selected slot in state
    setSelectedSlot({ start, end });
    // Also set the booking details with the selected slot
    setBookingDetails({
      ...bookingDetails,
      start,
      end,
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBookingDetails({
      ...bookingDetails,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    // Make a POST request to your backend API to save the booking in the database
    const newBooking = {
      title: bookingDetails.title,
      booking_date: bookingDetails.start, // You might need to adjust the date format here
      additional_info: bookingDetails.additionalInfo,
    };
    // Replace 'your-api-endpoint' with the actual endpoint for creating bookings
    fetch('/api/create-booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBooking),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle any response from the backend if needed
        console.log(data);
        // Clear the form and selected slot after successful booking
        setBookingDetails({
          title: "",
          start: null,
          end: null,
          additionalInfo: "",
        });
        setSelectedSlot(null);
      })
      .catch((error) => {
        // Handle any errors that occur during the POST request
        console.error(error);
      });
  };

  return (
    <div className="myCustomHeight">
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        selectable // Enable user selection
        onSelectSlot={handleSelectSlot} // Handle slot selection
      />
      {selectedSlot && (
        <div className="booking-form">
          <h2>Create Booking</h2>
          <form>
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={bookingDetails.title}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Start Time:</label>
              <input
                type="text"
                name="start"
                value={bookingDetails.start}
                disabled
              />
            </div>
            <div className="form-group">
              <label>End Time:</label>
              <input
                type="text"
                name="end"
                value={bookingDetails.end}
                disabled
              />
            </div>
            <div className="form-group">
              <label>Additional Info:</label>
              <textarea
                name="additionalInfo"
                value={bookingDetails.additionalInfo}
                onChange={handleChange}
              />
            </div>
            <button type="button" onClick={handleSubmit}>
              Save Booking
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default MyCalendar;

