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
  const [classes, setClasses] = useState([]);


  useEffect(() => {
    // Fetch three tutors from the backend when the component mounts
    fetchThreeTutors();
  }, []);

  //For the search bar
  const handleSearch = (query) => {
    axios
    .get(`/api/search?subject=${query}`)
    .then((response) => {
      // handle success
      console.log(response.data); // The search results received from the API
      setSearchResults(response.data); // Update the state with the search results
    })
    .catch((error) => {
      // handle error if needed
      console.error('Error fetching search results:', error);
    });
  };

  //TEST
  const handleFilter = (subjectName) => {
    axios
      .get(`/api/classes/subject/${subjectName}`)
      .then((response) => {
        setClasses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching classes:", error);
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

  const classFilter = async (subjectName) => {
    console.log(subjectName)
    try {
      const response = await axios.get(`/api/classes/subject/${subjectName}`);
      const data = response.data;
      // Set the first three tutors to the state
      setClasses(data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  return (
    <div>
      <h1>Learning Station Home</h1>
      <Navbar />
      <SearchBar
        onSearch={handleSearch}
        onFilter={classFilter}
      />

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

      {/* TEST Display the filtered classes */}
      <ul>
        {classes.map((classInfo) => (
          <li key={classInfo.class_id}>
            <p>Class Name: {classInfo.class_name}</p>
            <p>Subject: {classInfo.subject}</p>
            <p>Price: {classInfo.class_price}</p>
            {/* Add other class information as needed */}
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
