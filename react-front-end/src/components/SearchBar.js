import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./SearchBar.scss";


const SearchBar = ({
  onSearch,
  onTutorLocationFilter,
  onSubjectFilter,
  onPriceFilter
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

  const handleSearchOptionChange = (event) => {
    console.log("option change being called")
    setSearchOption(event.target.value);
    console.log('Selected Search Option:', event.target.value);
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
  
          <button type="submit">Search</button>
        </form>
      

      <div class="search-filter-bars">
        <form onSubmit={handleSubjectFilter}>
  
          {/* rename searchOption to SubjectOption***** */}
          <select value={searchOption} onChange={handleSearchOptionChange}> 
            <option value=""  >Select Subject</option>
            <option value="Mathematics">Mathematics</option>
            <option value="English">English</option>
            <option value="History">History</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Spanish">Spanish</option>
            <option value="Biology">Biology</option>
            <option value="Music">Music</option>
            <option value="Science">Science</option>
          </select>
  
          <button type="submit" disabled={searchOption ? false : true}>
            filter
          </button>
  
        </form>
  
        <form onSubmit={handlelocationFilter}>
  
          <select value={searchOption} onChange={handleSearchOptionChange}>
            <option value=""  >Select Location</option>
            <option value="New York">New York</option>
            <option value="Chicago">Chicago</option>
            <option value="San Francisco">San Francisco</option>
            <option value="Houston">Houston</option>
            <option value="Miami">Miami</option>
            <option value="Phoenix">Phoenix</option>
            <option value="Dallas">Dallas</option>
            <option value="Seattle">Seattle</option>

            <button type="button" onClick={() => handleSearchOptionChange({     target: { value: '' } })}>
              Close
            </button>
  
          </select>
  
          <button type="submit" disabled={searchOption ? false : true}>
            filter
          </button>


  
        </form>
  
        <form onSubmit={handleClassPriceFilter}>
  
          <select value={searchOption} onChange={handleSearchOptionChange}>
            <option value="">Select price range</option>
            <option value="0-20">$0 - $20</option>
            <option value="20-30">$20 - $30</option>
            <option value="30-40">$30 - $40</option>
            <option value="40-50">$40 - $50</option>
          </select>
  
          <button type="submit" disabled={searchOption ? false : true}>
            filter
          </button>
  
        </form>
      </div>
    </>

    
  );
};

export default SearchBar;
