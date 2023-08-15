import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import SearchBar from "./SearchBar";
import Navbar from "./Navbar";
import TutorCard from "./TutorCard";
import { useEffect } from "react";
import "./Home.scss";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";

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
        .post("/api/students/find", user)
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

  const fetchThreeTutors = async () => {
    axios
      .get("/api/tutors")
      .then((response) => {
        setTutors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tutors:", error);
      });
  };

  const handleSearchClose = () => {
    setSearchResults([]);
    setFilteredTutors([]);
    setFilteredClassPrices([]);
    setClasses([]);
  };

  //-------SEARCH BARS-------

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

  //-------SEARCH BARS-------

  return (
    <div className="main-container">
      <div className="background-image">
        <Navbar />

        <div className="header-text">
          <img
            className="header-image"
            src={
              process.env.PUBLIC_URL +
              "/images/brooke-cagle-g1Kr4Ozfoac-unsplash.jpg"
            }
            alt="headerImg"
          />

          <h1>
            Welcome to the Learning Station.
            <br />
            &ensp;&ensp;&ensp;&ensp;Where you can find your tutor.
            <br />
            &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;Start your learning
            journey today!
          </h1>
        </div>

        <div className="quote-text-area">
          <div className="text-quotes">
            <h1 className="quote-quote">
              “The cure for boredom is curiosity. There is no cure for
              curiosity.”
              <br></br>
              -Dorothy Parker
            </h1>

            <h1 className="quote-mission">
              Our mission is to make education accessible and enjoyable for
              everyone, sparking the flames of curiosity for students and
              offering a platform for tutors to passionately share their
              expertise. Here learning knows no bounds and knowledge becomes an
              adventure.
            </h1>
          </div>
        </div>

        <SearchBar
          onSearch={handleSearch}
          onSubjectFilter={classSubjectFilter}
          onPriceFilter={classPriceFilter}
          onTutorLocationFilter={tutorLocationFilter}
          handleClearSearch={handleSearchClose}
        />

        {newUser && <h1> Add New User Form Here </h1>}

        {/* <h1 className="meet-tutor-h1">Meet some of our tutors.</h1> */}

        {/* Display the string searchbar results */}
        <ul className="search-card">
          {searchResults.map((result) => (
            <div className="search-card-item">
              <a
                className="search-card-item-a"
                key={result.class_id}
                href={`/tutors/${result.tutor_id}`}
              >
                <li key={result.class_id} className="search-card-item-li">
                  <img
                    className="search-result-tutor-img"
                    src={result.image}
                    alt={`${result.first_name} pic`}
                  />

                  <div className="search-card-info">
                    <p>
                      {result.first_name} {result.last_name}
                    </p>
                    <p> Expert in {result.expertise}</p>
                    <p> Location: {result.location} </p>
                    <p>BIO: {result.quick_bio}</p>
                    <p>{result.quick_bio} per class</p>
                  </div>
                </li>
              </a>
            </div>
          ))}
        </ul>

        {/* Display the filtered classes subjects */}
        <ul className="search-card">
          {classes.map((classInfo) => (
            <div className="search-card-item">
              <a
                className="search-card-item-a"
                key={classInfo.class_id}
                href={`/tutors/${classInfo.tutor_id}`}
              >
                <li key={classInfo.tutor_id} className="search-card-item-li">
                  <img
                    className="search-card-image"
                    src={classInfo.image}
                    alt={`${classInfo.first_name} pic`}
                  />

                  <div className="search-card-info">
                    <p>
                      {classInfo.first_name} {classInfo.last_name}
                    </p>
                    <p>Expert in {classInfo.expertise}</p>
                    <p>Location: {classInfo.location}</p>
                    <p>BIO: {classInfo.quick_bio}</p>
                    <p>{classInfo.class_price} per class</p>
                  </div>
                </li>
              </a>
            </div>
          ))}
        </ul>

        {/* Display the filtered tutor locations */}
        <ul className="search-card">
          {filteredTutors.map((TutorInfo) => (
            <div className="search-card-item">
              <a
                className="search-card-item-a"
                key={TutorInfo.class_id}
                href={`/tutors/${TutorInfo.tutor_id}`}
              >
                <li key={TutorInfo.tutor_id} className="search-card-item-li">
                  <img
                    className="search-card-image"
                    src={TutorInfo.image}
                    alt={`${TutorInfo.first_name} pic`}
                  />

                  <div className="search-card-info">
                    <p>
                      {TutorInfo.first_name} {TutorInfo.last_name}
                    </p>
                    <p>Expert in {TutorInfo.expertise}</p>
                    <p>Location: {TutorInfo.location}</p>
                    <p>BIO: {TutorInfo.quick_bio}</p>
                    <p>{TutorInfo.class_price} per class</p>
                  </div>
                </li>
              </a>
            </div>
          ))}
        </ul>

        {/* Display the filtered class prices */}
        <ul className="search-card">
          {filteredClassPrices.map((ClassInfo) => (
            <div className="search-card-item">
              <a
                key={ClassInfo.class_id}
                className="search-card-item-a"
                href={`/tutors/${ClassInfo.tutor_id}`}
              >
                <li key={ClassInfo.class_id} className="search-card-item-li">
                  <div className="search-card-image">
                    <img
                      className="search-card-image"
                      src={ClassInfo.image}
                      alt={`${ClassInfo.first_name} pic`}
                    />
                  </div>
                  <div className="search-card-info">
                    <p>
                      {ClassInfo.first_name} {ClassInfo.last_name}
                    </p>
                    <p>Expert in {ClassInfo.subject}</p>
                    <p>Location: {ClassInfo.location}</p>
                    <p>BIO: {ClassInfo.quick_bio}</p>
                    <p>{ClassInfo.class_price} per class</p>
                  </div>
                </li>
              </a>
            </div>
          ))}
        </ul>
      </div>{" "}
      {/* background-image div */}
      <div className="tutor-card-container">
        {/* Display only three tutors */}
        {tutors.slice(0, 3).map((tutor) => (
          <TutorCard key={tutor.tutor_id} tutor={tutor} />
        ))}
      </div>
      <div className="ai-playground-box">
        <img
          className="ai-playground-image"
          src={
            process.env.PUBLIC_URL +
            "/images/hitesh-choudhary-t1PaIbMTJIM-unsplash.jpg"
          }
          alt="aiplaygroundImg"
        />

        <div className="ai-playground-box-content">
          <h1 className="ai-playground-h1">
            Your 24/7 AI Student Success Partner!
          </h1>

          <p className="ai-playground-p">
            Welcome to our enhanced learning experience where AI is at your
            service. Unleash the power of our new AI tool designed to assist
            students in every step of their journey, providing personalized
            support and guidance. Try it today and witness the future of
            education firsthand.
          </p>

          <Link
            className="ai-playground-link"
            to="/LessonPlanWriter"
            className="btn btn-primary"
          >
            Try AI-Playground
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
