import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import SearchBar from './SearchBar';
import Navbar from "./Navbar";
import TutorCard from "./TutorCard";
import { useEffect } from "react";
import './Home.scss';



const Home = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    // Fetch three tutors from the backend when the component mounts
    fetchThreeTutors();
  }, []);

  //handlesearch is for the search bar
  const handleSearch = (query) => {
    fetch(`/api/search?subject=${query}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // handle success
        console.log(data); // The search results received from the API
        setSearchResults(data); // Update the state with the search results
      })
      .catch((error) => {
        // handle error if needed
        console.error('Error fetching search results:', error);
      });
  };

  const fetchThreeTutors = async () => {
    try {
      const response = await axios.get("/api/tutors"); // Replace "/api/tutors" with the correct backend route to fetch tutors
      const data = response.data;
      // Set the first three tutors to the state
      setTutors(data.slice(0, 3));
    } catch (error) {
      console.error("Error fetching tutors:", error);
    }
  };

  return (
    <div>
      <h1>Learning Station Home</h1>
      <Navbar />
      <SearchBar onSearch={handleSearch} />

      {/* Display the search results */}
      <ul>
        {searchResults.map((result) => (
          <li key={result.class_id}>
            <p>{result.first_name} {result.last_name}</p>
            <p> Location: {result.location} </p>
            <p> Expert in {result.expertise}</p>
            <p>BIO: {result.quick_bio}</p>
            <img src = {result.image} alt = {`${result.first_name} pic`} />
          </li>
        ))}
      </ul>

      <div className="tutor-container">
        {tutors.map((tutor) => (
          <TutorCard key={tutor.tutor_id} tutor={tutor} />
        ))}
      </div>
    </div>
  );
};

export default Home;
