import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import SearchBar from "./SearchBar";
import Navbar from "./Navbar";
import TutorCard from "./TutorCard";
import { useEffect } from "react";
import TutorPage from "./TutorPage";
import "./Home.scss";
import BookingCalendar from "./BookingCalendar";
import { useAuth0 } from "@auth0/auth0-react";
import Footer from "./Footer";
// import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [tutors, setTutors] = useState([]);
  const [classes, setClasses] = useState([]);
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [filteredClassPrices, setFilteredClassPrices] = useState([]);
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [newUser, setNewUser] = useState(false);

  useEffect(() => {
    // Fetch three tutors from the backend when the component mounts
    fetchThreeTutors();
    if (isAuthenticated) {
      axios
        .post("http://localhost:8080/api/students/find", user)
        .then(({ data }) => {
          console.log(data);
          window.sessionStorage.setItem("first_name", data.first_name);
          window.sessionStorage.setItem("student_id", data.student_id);
          setNewUser(data.newUser);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isAuthenticated]);
  console.log(newUser);

  //For the search bar
  const handleSearch = (searchTerm) => {
    axios
      .get(`/api/search?searchTerm=${searchTerm}`)
      .then((response) => {
        setSearchResults(response.data); // Update the state with the search
        setFilteredTutors([]);
        setFilteredClassPrices([]);
        setClasses([]);
      })
      .catch((error) => {
        // handle error if needed
        console.error("Error fetching search results:", error);
      });
  };

  // const handleFilter = (subjectName) => {
  //   axios
  //     .get(`/api/classes/subject/${subjectName}`)
  //     .then((response) => {
  //       setClasses(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching classes:", error);
  //     });
  // };

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

  // filter Tutor by expertise/subjects
  const classSubjectFilter = (subjectName) => {
    console.log(subjectName);
    axios
      .get(`/api/tutors/expertise/${subjectName}`)
      .then((response) => {
        const data = response.data;
        // Set setClasses as the state and rest to empty
        setClasses(data);
        setFilteredTutors([]);
        setFilteredClassPrices([]);
        setSearchResults([]);
      })
      .catch((error) => {
        console.error("Error fetching classes:", error);
      });
  };

  //filter class prices
  const classPriceFilter = async (classPrice) => {
    console.log(classPrice);
    axios
      .get(`/api/classes/class_price/${classPrice}`)
      .then((response) => {
        const data = response.data;
        // Set setFilteredClassPrices as the state and rest to empty
        setFilteredClassPrices(data);
        setClasses([]);
        setFilteredTutors([]);
        setSearchResults([]);
      })
      .catch((error) => {
        console.error("Error fetching classes:", error);
      });
  };

  //filters tutor locations
  const tutorLocationFilter = async (locationName) => {
    console.log(locationName);
    axios
      .get(`/api/tutors/location/${locationName}`)
      .then((response) => {
        const data = response.data;
        // Set setFilteredTutors as the state and rest to empty
        setFilteredTutors(data);
        setFilteredClassPrices([]);
        setClasses([]);
        setSearchResults([]);
      })
      .catch((error) => {
        console.error("Error fetching tutors:", error);
      });
  };

  return (
    <div class="main-container">
      <div class="background-image">
        <Navbar />

        <div class="header-text">
          <img
            class="header-image"
            src={
              process.env.PUBLIC_URL +
              "/images/brooke-cagle-g1Kr4Ozfoac-unsplash.jpg"
            }
            alt="headerImg"
          />
         
          <h1>Start your learning journey today!</h1>
        </div>

        <SearchBar
          onSearch={handleSearch}
          onSubjectFilter={classSubjectFilter}
          onPriceFilter={classPriceFilter}
          onTutorLocationFilter={tutorLocationFilter}
        />

        {newUser && <h1> Add New User Form Here </h1>}

        {/* Display the string searchbar results */}
        <ul class="search-card">
          {searchResults.map((result) => (
            <li key={result.class_id} class="search-card-item">
              <div class="search-card-image">
                <img src={result.image} alt={`${result.first_name} pic`} />
              </div>

              <div class="search-card-info">
                <p>
                  {result.first_name} {result.last_name}
                </p>
                <p> Location: {result.location} </p>
                <p> Expert in {result.expertise}</p>
                <p>BIO: {result.quick_bio}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* Display the filtered classes subjects */}
        <ul class="search-card">
          {classes.map((classInfo) => (
            <li key={classInfo.class_id} class="search-card-item">
              <p>Class Name: {classInfo.class_name}</p>
              <p>Expert in {classInfo.subject}</p>
              <p>Price: {classInfo.class_price}</p>
              {/* Add other class information as needed */}
            </li>
          ))}
        </ul>

        {/* Display the filtered tutor locations */}
        <ul class="search-card">
          {filteredTutors.map((TutorInfo) => (
            <li key={TutorInfo.tutor_id} class="search-card-item">
              <div class="search-card-image">
                <img
                  src={TutorInfo.image}
                  alt={`${TutorInfo.first_name} pic`}
                />
              </div>
              <div class="search-card-info">
                <p>
                  {" "}
                  Tutor Name: {TutorInfo.first_name} {TutorInfo.last_name}
                </p>
                <p>Expert in {TutorInfo.expertise}</p>
                <p>Location: {TutorInfo.location}</p>
                <p>BIO: {TutorInfo.quick_bio}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* Display the filtered class prices */}
        <ul>
          {filteredClassPrices.map((ClassInfo) => (
            <li key={ClassInfo.class_id} class="search-card-item">
              <p> Class Name: </p>
              <p>Subject: {ClassInfo.subject}</p>
              <p>price: {ClassInfo.class_price}</p>
            </li>
          ))}
        </ul>
      </div>{" "}
      {/* background-image div */}
      <div className="tutor-container">
        {tutors.map((tutor) => (
          <TutorCard key={tutor.tutor_id} tutor={tutor} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
