import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./MyCalendarStyle.scss";
import axios from "axios";


const localizer = momentLocalizer(moment);

const CustomToolbar = ({ selectedDate, setSelectedDate }) => (
  <div className="rbc-toolbar">
    {selectedDate ? (
      <button className="back-button" onClick={() => setSelectedDate(null)}>
        Back
      </button>
    ) : (
      <span className="rbc-toolbar-label">My Calendar</span>
    )}
  </div>
);

// const MyCalendar = ({ tutorId }) => {
  const MyCalendar = (props) => {
  const [myEventsList, setMyEventsList] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
  // Function to fetch student bookings from the backend API
  const fetchStudentBookings = async () => {
    const studentId = 1; // Replace 1 w/ student ID you want bookings for
    axios.get(`/api/bookings/students/${studentId}/bookings`)
      .then(response => {
        const bookings = response.data;

        // Convert the bookings data into the required format for the calendar
        const events = bookings.map((booking) => ({
          title: `Booking ${booking.booking_id}`,
          start: new Date(booking.booking_date),
          end: new Date(booking.booking_date), // Assuming duration 1 hour
        }));

        setMyEventsList(events);
      })
      .catch(error => {
        console.error(error);
      });
  };

  fetchStudentBookings();
}, []);


  const handleDateChange = ({ start }) => {
    setSelectedDate(start);
    setSelectedSlot({ start, end: moment(start).add(1, "hour").toDate() }); // Set the end time to be 1 hour after the selected start time
  };

  const handleSubmit = () => {
    // Make a POST request to your backend API to save the booking in the database
    const booking_date = moment(selectedDate).format("YYYY-MM-DD HH:mm:ss");
    const student_id = 1; // Replace with the actual student ID
    const class_id = props.tutor.tutor_id; // Use the prop value passed from TutorPage
    // const tutor_id = 1; // Use the prop value passed from TutorPage
    const payment_confirmed = null;

    const newBooking = {
      student_id,
      class_id,
      // tutor_id,
      booking_date,
      payment_confirmed,
    };
    console.log(newBooking, "Booking Details");

    // Replace 'your-api-endpoint' with the actual endpoint for creating bookings

    axios.post("/api/bookings", newBooking)
      .then(() => {
        console.log("post sent")
        //set some state here
      })
      .catch((error) => {
        // Handle any errors that occur during the POST request
        console.error(error);
      });


    // fetch("/api/bookings", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(newBooking),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // Handle any response from the backend if needed
    //     console.log("Data sent to backend:", data);
    //     // Clear the form and selected date after successful booking
    //     setSelectedSlot(null);
    //     setSelectedDate(null);
    //   })
    //   .catch((error) => {
    //     // Handle any errors that occur during the POST request
    //     console.error(error);
    //   });
  };

  // Make the hours only display 8am - 8pm
  const businessHours = {
    start: moment().set({ hour: 8, minute: 0, second: 0, millisecond: 0 }).toDate(),
    end: moment().set({ hour: 20, minute: 0, second: 0, millisecond: 0 }).toDate(),
  };

  return (
    <div className="myCustomHeight">
      <CustomToolbar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      {selectedDate ? (
        <div className="booking-form">
          <h2>Create Booking</h2>
          <form>
            <div className="form-group">
              <label>Selected Time:</label>
              <input
                type="text"
                value={`${moment(selectedDate).format("MMMM Do, YYYY [at] h:mm a")} - ${moment(selectedDate).add(1, "hour").format(
                  "h:mm a"
                )}`}
                disabled
              />
            </div>
            <button type="button" onClick={handleSubmit}>
              Pay for booking
            </button>
          </form>
        </div>
      ) : (
        <Calendar
          localizer={localizer}
          events={myEventsList}
          startAccessor="start"
          endAccessor="end"
          onSelectSlot={handleDateChange} // Handle date selection
          selectable
          views={['month', 'day']} // Only show month and day views
          min={businessHours.start} // minimum display hours start
          max={businessHours.end} // maximum display hours end
          step={60} // 1 hour step for day view
          timeslots={1} // Only show 1 hour at a time in day view
          defaultView="month" // Set the default view to month
        />
      )}
    </div>
  );
};

export default MyCalendar;
