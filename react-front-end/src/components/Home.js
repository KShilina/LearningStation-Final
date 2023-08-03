import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import SearchBar from './SearchBar';
import Navbar from "./Navbar";
import TutorCard from "./TutorCard";
import { useEffect } from "react";
import TutorPage from "./TutorPage"
import './Home.scss';
import Calendar from "./Calendar"
// import 'bootstrap/dist/css/bootstrap.min.css';



const Home = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    // Fetch three tutors from the backend when the component mounts
    fetchThreeTutors();
  }, []);

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

      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  {/* Launch demo modal */}
      </button>

    {/* Modal */}
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <Calendar />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>

      <div className="tutor-container">
        {tutors.map((tutor) => (
          <TutorCard key={tutor.tutor_id} tutor={tutor} />
        ))}
      </div>
    </div>
  );
};

export default Home;
