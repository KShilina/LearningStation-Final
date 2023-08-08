import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./TutorPage.scss"
import BookingCalendar from './BookingCalendar';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from "./CheckoutForm"; // Import your PaymentForm component
import Navbar from './Navbar';

const stripePromise = loadStripe("pk_test_51NPUwIJ7asQDcmsxPQqqMevZU3aNyMYdWDBTm75kAgHEjLYQu7NLGSvoTa55z4uBBIWjrJeucHnysVKzEEdNzDOx00vBYfZek2"); // Replace with your actual Stripe publishable key

const TutorPage = () => {
  const { id } = useParams();
  const [tutor, setTutor] = useState(null);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false); // State to control the rendering of CheckoutForm

  useEffect(() => {
    fetchTutorInfo(id);
  }, [id]);

  const fetchTutorInfo = async (tutorId) => {
    try {
      const response = await axios.get(`/api/tutors/${tutorId}`);
      setTutor(response.data);
    } catch (error) {
      console.error('Error fetching tutor information:', error);
    }
  };

  const handleBookClass = () => {
    // Set the state to show CheckoutForm
    setShowCheckoutForm(true);
  };

  if (!tutor) {
    return <div>Loading tutor information...</div>;
  }


  return (
    
    <Elements stripe={stripePromise}>
      
      <Navbar />

      <div className="tutor-card">
        <img className="tutor-image" src={tutor.image} alt={`${tutor.name}'s pic`} />
        <div className="info-container">
          <div className="tutor-info">
            <h3>{tutor.name}</h3>
            <p>Name: {tutor.first_name} {tutor.last_name}</p>
            <p>Expertise: {tutor.expertise}</p>
            <p>About_Me: {tutor.quick_bio}</p>
            <p>avg_rating: {tutor.avg_rating}</p>
            <p>avg_class_prices: {tutor.avg_class_prices}</p>
            <p>num_students_booked: {tutor.num_students_booked}</p>
          </div>
          <div className="buttons">
            {/* <button className="book-class-button" onClick={handleBookClass}>BOOK a Class</button> */}
            {/* Render the CheckoutForm component when showCheckoutForm is true */}
            {showCheckoutForm && <CheckoutForm />}

            {/* <button className="book-class-button">BOOK a Class</button> */}
            <BookingCalendar tutor={tutor} />

            <button className="message-button">MESSAGE</button>
          </div>
        </div>
      </div>
    </Elements>
  );
};

export default TutorPage;

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import "./TutorPage.scss";
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import CheckoutForm from "./CheckoutForm";

// const stripePromise = loadStripe("pk_test_51NPUwIJ7asQDcmsxPQqqMevZU3aNyMYdWDBTm75kAgHEjLYQu7NLGSvoTa55z4uBBIWjrJeucHnysVKzEEdNzDOx00vBYfZek2"); // Replace with your actual Stripe publishable key

// const TutorPage = () => {
//   const { id } = useParams();
//   const [tutor, setTutor] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     fetchTutorInfo(id);
//   }, [id]);

//   const fetchTutorInfo = async (tutorId) => {
//     try {
//       const response = await axios.get(`/api/tutors/${tutorId}`);
//       setTutor(response.data);
//     } catch (error) {
//       console.error('Error fetching tutor information:', error);
//     }
//   };

//   const handleBookClass = () => {
//     setShowModal(true); // Show the modal when "Book a Class" button is clicked
//   };

//   const closeModal = () => {
//     setShowModal(false); // Close the modal when it's closed
//   };

//   if (!tutor) {
//     return <div>Loading tutor information...</div>;
//   }

//   return (
//     <Elements stripe={stripePromise}>
//       <div className="tutor-card">
//         {/* ... */}
//         <div className="buttons">
//           <button className="book-class-button" onClick={handleBookClass}>BOOK a Class</button>
//           <button className="message-button">MESSAGE</button>
//         </div>
//       </div>
//       {/* Modal */}
//       {showModal && (
//         <div className="modal fade show" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h1 className="modal-title fs-5" id="staticBackdropLabel">Book a Class</h1>
//                 <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
//               </div>
//               <div className="modal-body">
//                 {/* Render the CheckoutForm component inside the modal body */}
//                 <CheckoutForm />
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </Elements>
//   );
// };

// export default TutorPage;
