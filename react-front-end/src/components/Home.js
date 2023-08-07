import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import SearchBar from './SearchBar';
import Navbar from "./Navbar";
import TutorCard from "./TutorCard";
import { useEffect } from "react";
import TutorPage from "./TutorPage"
import './Home.scss';
import BookingCalendar from "./BookingCalendar"
// import 'bootstrap/dist/css/bootstrap.min.css';



const Home = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [tutors, setTutors] = useState([]);
  const [classes, setClasses] = useState([]);
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [filteredClassPrices, setFilteredClassPrices] = useState([])


  useEffect(() => {
    // Fetch three tutors from the backend when the component mounts
    fetchThreeTutors();
  }, []);

  //For the search bar
  const handleSearch = (searchTerm) => {
    axios
    .get(`/api/search?searchTerm=${searchTerm}`)
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
      setTutors(data);
    } catch (error) {
      console.error("Error fetching tutors:", error);
    }
  };

  // filter Class subjects
  const classSubjectFilter = async (subjectName) => {
    console.log(subjectName)
    try {
      const response = await axios.get(`/api/classes/subject/${subjectName}`);
      const data = response.data;
      // Set setClasses as the state and rest to empty
      setClasses(data);
      setFilteredTutors([])
      setFilteredClassPrices([])
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  //filter class prices
  const classPriceFilter = async (classPrice) => {
    console.log(classPrice)
    try {
      const response = await axios.get(`/api/classes/class_price/${classPrice}`);
      const data = response.data;
      // Set setFilteredClassPrices as the state and rest to empty
      setFilteredClassPrices(data)
      setClasses([]);
      setFilteredTutors([])
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  //filters tutor locations
  const tutorLocationFilter = async (locationName) => {
    console.log(locationName)
    try {
      const response = await axios.get(`/api/tutors/location/${locationName}`);
      const data = response.data;
      // Set setFilteredTutors as the state and rest to empty
      setFilteredTutors(data);
      setFilteredClassPrices([])
      setClasses([])
    } catch (error) {
      console.error("Error fetching tutors:", error);
    }
  };

  return (
    <div>
      <h1>Learning Station Home</h1>
      <Navbar />
      <SearchBar
        onSearch={handleSearch}
        onSubjectFilter={classSubjectFilter}
        onPriceFilter={classPriceFilter}
        onTutorLocationFilter={tutorLocationFilter}
      />

      {/* Display the string searchbar results */}
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



      {/* Display the filtered classes subjects */}
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

      {/* Display the filtered tutor locations */}
      <ul>
        {filteredTutors.map((TutorInfo) => (
          <li key={TutorInfo.tutor_id}>
            <p> Tutor Name: {TutorInfo.first_name} {TutorInfo.last_name}</p>
            <p>Subject: {TutorInfo.expertise}</p>
            <p>location: {TutorInfo.location}</p>
            < img src = {TutorInfo.image} alt = {`${TutorInfo.first_name} pic`} />
          </li>
        ))}
      </ul>

      {/* Display the filtered class prices */}
      <ul>
        {filteredClassPrices.map((ClassInfo) => (
          <li key={ClassInfo.class_id}>
            <p> Class Name: </p>
            <p>Subject: {ClassInfo.subject}</p>
            <p>price: {ClassInfo.class_price}</p>
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
