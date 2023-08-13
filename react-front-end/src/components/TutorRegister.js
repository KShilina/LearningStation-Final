import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./TutorRegister.scss";

const TutorRegister = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    location: "",
    expertise: "",
    quick_bio: "",
    password: "",
  });

  const [isFormSubmitted, setIsFormSubmitted] = useState(false); // State variable for form submission status

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Define the navigate function using useNavigate
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to backend API with the form data
      const response = await axios.post("/api/tutors", formData);

      console.log("Tutor sign-up successful:", response.data);
      setIsFormSubmitted(true); // Set the form submission status to true
    } catch (error) {
      console.error("Error signing up tutor:", error);
    }
  };

  if (isFormSubmitted) {
    // Use the navigate function to redirect to the success page
    navigate("/success");
  }

  return (
    <div className="form-container">
      <h1 class="h1-tutor-register">Teach online</h1>
      <h2>Earn money on your schedule</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            id="first_name"
            name="first_name"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            id="last_name"
            name="last_name"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            id="expertise"
            name="expertise"
            placeholder="Expertise"
            value={formData.expertise}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <textarea
            id="quickBio"
            name="quick_bio"
            placeholder="Quick Bio"
            value={formData.quick_bio}
            onChange={handleChange}
            rows="4"
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default TutorRegister;
