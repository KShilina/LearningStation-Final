import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import SearchBar from './SearchBar';


const Home = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query) => {
    axios
      .get("/api/search", {
        params: { subject: query } // Pass the search query as a parameter
      })
      .then((response) => {
        // handle success
        console.log(response.data); // The search results received from the API
        setSearchResults(response.data); // Update the state with the search results
      })
      .catch((error) => {
        // handle error if needed
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Main Component</h1>
      <SearchBar onSearch={handleSearch} />
      {/* Display the search results */}
      <ul>
        {searchResults.map((result) => (
          <li key={result.class_id}>
            <p> {result.first_name} </p>
            <p> {result.last_name}</p>
            <img src = {result.image} alt = {`${result.first_name} pic`} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
