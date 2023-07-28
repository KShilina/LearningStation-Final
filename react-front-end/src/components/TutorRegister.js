import React, { useState } from 'react';
import axios from 'axios';
import './TutorRegister.scss';

const TutorRegister = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    location: '',
    expertise: '',
    quickBio: '',
    password: '',
    image: null, // Store the image file in the state
  });

  const [isFormSubmitted, setIsFormSubmitted] = useState(false); // State variable for form submission status

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0]; // Get the selected image file
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: imageFile, // Update the image state with the selected file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataWithImage = new FormData(); // Create a FormData object to send the data
      formDataWithImage.append('image', formData.image); // Append the image to the FormData

      // Append other form data to the FormData
      formDataWithImage.append('firstName', formData.firstName);
      formDataWithImage.append('lastName', formData.lastName);
      formDataWithImage.append('email', formData.email);
      formDataWithImage.append('location', formData.location);
      formDataWithImage.append('expertise', formData.expertise);
      formDataWithImage.append('quickBio', formData.quickBio);
      formDataWithImage.append('password', formData.password);

      // Make a POST request to your backend API with the FormData
      const response = await axios.post('/api/tutors', formDataWithImage, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type for the FormData
        },
      });

      console.log('Tutor sign-up successful:', response.data);
      // Optionally, you can redirect to a success page here
    } catch (error) {
      console.error('Error signing up tutor:', error);
    }

    
  };
  

  
  return (
    <div className="form-container">
      <h1>Teach online</h1>
      <h2>Earn money on your schedule</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
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
            name="quickBio"
            placeholder="Quick Bio"
            value={formData.quickBio}
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
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
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
