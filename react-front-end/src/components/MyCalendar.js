import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./MyCalendarStyle.scss";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm"; // Import your PaymentForm component

const stripePromise = loadStripe("pk_test_51NPUwIJ7asQDcmsxPQqqMevZU3aNyMYdWDBTm75kAgHEjLYQu7NLGSvoTa55z4uBBIWjrJeucHnysVKzEEdNzDOx00vBYfZek2");

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

const MyCalendar = ({ tutor }) => {
  const [myEventsList, setMyEventsList] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  useEffect(() => {
    const fetchStudentBookings = async () => {
      const studentId = sessionStorage.getItem('student_id');
      console.log(studentId, "logged in student id from session storage")
      try {
        const response = await axios.get(`/api/bookings/students/${studentId}/bookings`);
        const bookings = response.data;
        const events = bookings.map((booking) => ({
          title: `Booking ${booking.booking_id}`,
          start: new Date(booking.booking_date),
          end: moment(booking.booking_date).add(1, "hour").toDate(),
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
    setSelectedSlot({
      start,
      end: moment(start).add(1, "hour").toDate(),
    });
  };

  const handleBookClass = () => {
    setShowCheckoutForm(true);
  };

  const handleSubmit = async () => {
    const booking_date = moment(selectedDate).format("YYYY-MM-DD HH:mm:ss");
    const student_id = sessionStorage.getItem('student_id');
    const class_id = tutor.tutor_id;
    const payment_confirmed = null;

    const newBooking = {
      student_id,
      class_id,
      booking_date,
      payment_confirmed,
    };

    try {
      await axios.post("/api/bookings", newBooking);
      console.log("Booking successful");
      setSelectedSlot(null);
      setSelectedDate(null);
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  const businessHours = {
    start: moment().set({ hour: 8, minute: 0, second: 0, millisecond: 0 }).toDate(),
    end: moment().set({ hour: 20, minute: 0, second: 0, millisecond: 0 }).toDate(),
  };
  return (
    <Elements stripe={stripePromise}>
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
                  value={`${moment(selectedDate).format("MMMM Do, YYYY [at] h:mm a")} - ${moment(selectedDate)
                    .add(1, "hour")
                    .format("h:mm a")}`}
                  disabled
                />
              </div>
              <button type="button" onClick={handleBookClass}>
                Pay for booking
              </button>
              {showCheckoutForm && <CheckoutForm />}
            </form>
          </div>
        ) : (
          <Calendar
            localizer={localizer}
            events={myEventsList}
            startAccessor="start"
            endAccessor="end"
            onSelectSlot={handleDateChange}
            selectable
            views={['month', 'day']}
            min={businessHours.start}
            max={businessHours.end}
            step={60}
            timeslots={1}
            defaultView="month"
          />
        )}
      </div>
    </Elements>
  );
};

export default MyCalendar;
