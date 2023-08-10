import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./SearchBar.scss";


const SearchBar = ({
  onSearch,
  onTutorLocationFilter,
  onSubjectFilter,
  onPriceFilter,
  handleClearSearch
  }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOption, setSearchOption] = useState('');
  // Default to searching by subject

  //needed for the class subject drop down
  const handleSubjectFilter = (event) => {
    event.preventDefault();
    onSubjectFilter(searchOption)

  }

  const handleClassPriceFilter = (event) => {
    event.preventDefault();
    onPriceFilter(searchOption)

  }

  //needed for the tutor location drop down
  const handlelocationFilter = (event) => {
    event.preventDefault();
    onTutorLocationFilter(searchOption)

  }

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    console.log('Input Value:', event.target.value);
  };

  // const handleSearchOptionChange = (event) => {
  //   console.log("option change being called")
  //   setSearchOption(event.target.value);
  //   console.log('Selected Search Option:', event.target.value);
  // };

  const handlePriceFilterChange = (event) => {
    const selectedValue = event.target.value;
    setSearchOption(selectedValue); // Set the selected value in the state

    if (["0-20", "20-30", "30-40", "40-50"].includes(selectedValue)) {
      onPriceFilter(selectedValue); // Call your filter function with the selected value
    }
  };

  const handleExpertiseFilterChange = (event) => {
    const selectedValue = event.target.value;
    setSearchOption(selectedValue); // Set the selected value in the state

    if (["English", "History", "Mathematics", "Physics", "Chemistry", "Computer Science", "Spanish", "Biology", "Music", "Science", "Spanish"].includes(selectedValue)) {
      onSubjectFilter(selectedValue); // Call your filter function with the selected value
    }
  };

  const handleLocationFilterChange = (event) => {
    const selectedValue = event.target.value;
    setSearchOption(selectedValue); // Set the selected value in the state

    if (["New York", "Chicago", "San Francisco", "Houston", "Miami", "Phoenix", "Dallas", "Dallas", "Seattle", "Los Angeles"].includes(selectedValue)) {
      onTutorLocationFilter(selectedValue); // Call your filter function with the selected value
    }
    console.log(selectedValue, "selectedValue")
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm); // Pass searchTerm and searchOption to the onSearch function
    console.log('Search Term:', searchTerm);
  };
  

  return (
    <>
      
        <form class="text-search-and-btn" onSubmit={handleSubmit}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search..."
          />
  
          <button class="text-search-submit-btn" type="submit">Search</button>
        </form>
      

      <div class="search-filter-bars">
        <form onSubmit={handleSubjectFilter}>
  
          <select value={searchOption} onChange={handleExpertiseFilterChange}> 
            <option value=""  >Select Subject</option>
            <option value="Mathematics">Mathematics</option>
            <option value="English">English</option>
            <option value="History">History</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Foreign Languages">Foreign Languages</option>
            <option value="Biology">Biology</option>
            <option value="Music">Music</option>
            <option value="Science">Science</option>
            <option value="Spanish">Spanish</option>
          </select>
  
          {/* <button type="submit" disabled={searchOption ? false : true}>
            filter
          </button> */}
  
        </form>
  
        <form onSubmit={handlelocationFilter}>
  
          {/* <select value={searchOption} onChange={handleSearchOptionChange}> */}
          <select value={searchOption} onChange={handleLocationFilterChange}>
          
            <option value=""  >Select Location</option>
            <option value="New York">New York</option>
            <option value="Chicago">Chicago</option>
            <option value="San Francisco">San Francisco</option>
            <option value="Houston">Houston</option>
            <option value="Miami">Miami</option>
            <option value="Phoenix">Phoenix</option>
            <option value="Dallas">Dallas</option>
            <option value="Seattle">Seattle</option>  
          </select>
  
          {/* <button type="submit" disabled={searchOption ? false : true}>
            filter
          </button> */}

        </form>
  
        <form onSubmit={handleClassPriceFilter}>
  
          <select value={searchOption} onChange={handlePriceFilterChange}>
            <option value="">Select price range</option>
            <option value="0-20">$0 - $20</option>
            <option value="20-30">$20 - $30</option>
            <option value="30-40">$30 - $40</option>
            <option value="40-50">$40 - $50</option>
          </select>
  
          {/* <button type="submit" disabled={searchOption ? false : true}>
            filter
          </button> */}
  
        </form>

        <button class="clear-filters" onClick={handleClearSearch}>
          Clear Filter
        </button>

      </div>
    </>

    
  );
};

export default SearchBar;
