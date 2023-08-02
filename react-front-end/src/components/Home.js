import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import SearchBar from './SearchBar';
import Navbar from "./Navbar";
import TutorCard from "./TutorCard";
import { useEffect } from "react";
import TutorPage from "./TutorPage"
import './Home.scss';
import { useAuth0 } from "@auth0/auth0-react";



const Home = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [tutors, setTutors] = useState([]);


  const { user } = useAuth0();
  useEffect(() => {
    // Fetch three tutors from the backend when the component mounts
    getDatabaseUser(user);
  }, [user]); 


  useEffect(() => {
    // Fetch three tutors from the backend when the component mounts
    fetchThreeTutors();
  }, []);

  const getDatabaseUser = async (auth0user) => {
    if (!auth0user){
return console.log("NO Auth user");
    }
    console.log("Fetching user",auth0user);
      try {
        const response = await axios.post("/api/auth0/users", {user: auth0user});
        const type = response.data.type
        const user = response.data.user
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };



  //handlesearch is for the search bar
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

  const fetchThreeTutors = async () => {
    try {
      const response = await axios.get("/api/tutors"); // Replace "/api/tutors" with the correct backend route to fetch tutors
      const data = response.data;
      // Set the first three tutors to the state
      setTutors(data);
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
