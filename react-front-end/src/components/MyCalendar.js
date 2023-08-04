import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./MyCalendarStyle.scss";

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

const MyCalendar = (props) => {
  const [myEventsList, setMyEventsList] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    title: "",
    date: null,
    time: "",
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

  const handleDateChange = ({ start }) => {
    setSelectedDate(start);
    setSelectedSlot({ start, end: moment(start).add(1, "hour").toDate() }); // Set the end time to be 1 hour after the selected start time
    setBookingDetails({
      ...bookingDetails,
      date: start,
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
      booking_date: bookingDetails.date, // You might need to adjust the date format here
      additional_info: bookingDetails.additionalInfo,
    };
    // Replace 'your-api-endpoint' with the actual endpoint for creating bookings
    fetch("/api/create-booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBooking),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle any response from the backend if needed
        console.log(data);
        // Clear the form and selected date after successful booking
        setBookingDetails({
          title: "",
          date: null,
          time: "",
          additionalInfo: "",
        });
        setSelectedSlot(null);
      })
      .catch((error) => {
        // Handle any errors that occur during the POST request
        console.error(error);
      });
  };

  const timeOptions = Array.from({ length: 13 }, (_, i) => `${i + 8}:00 AM`);

  const handleBookButtonClick = () => {
    if (!selectedDate) {
      alert("Please select a date.");
      return;
    }
    if (!bookingDetails.time) {
      alert("Please select a time.");
      return;
    }
    handleSubmit();
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
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={bookingDetails.title}
                onChange={handleChange}
              />
            </div>
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
            <div className="form-group">
              <label>Additional Info:</label>
              <textarea
                name="additionalInfo"
                value={bookingDetails.additionalInfo}
                onChange={handleChange}
              />
            </div>
            <button type="button" onClick={handleBookButtonClick}>
              Save Booking
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
