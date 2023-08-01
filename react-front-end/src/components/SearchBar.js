import React, { useEffect, useState } from 'react';

const SearchBar = ({ onSearch, onTutorLocationFilter, onSubjectFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOption, setSearchOption] = useState('');
  // Default to searching by subject

  //needed for the class subject drop down
  const handleSubjectFilter = (event) => {
    event.preventDefault();
    onSubjectFilter(searchOption)

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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search..."
        />

        <button type="submit">Search</button>
      </form>

      <form onSubmit={handleSubjectFilter}>

        {/* rename searchOption to SubjectOption***** */}
        <select value={searchOption} onChange={handleSearchOptionChange}> 
          <option value=""  disabled>Select Subject</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Science">Science</option>
          <option value="Languages">Languages</option>
          <option value="Arts and Music">Arts and Music</option>
          <option value="Social Studies">Social Studies</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Music and Arts">Music and Arts</option>
          <option value="Miscellaneous">Miscellaneous</option>
        </select>

        <button type="submit" disabled={searchOption ? false : true}>
          filter
        </button>

      </form>

      <form onSubmit={handlelocationFilter}>

        <select value={searchOption} onChange={handleSearchOptionChange}>
          <option value=""  disabled>Select Location</option>
          <option value="New York">New York</option>
          <option value="Chicago">Chicago</option>
          <option value="San Francisco">San Francisco</option>
          <option value="Houston">Houston</option>
          <option value="Miami">Miami</option>
          <option value="Phoenix">Phoenix</option>
          <option value="Dallas">Dallas</option>
          <option value="Seattle">Seattle</option>

        </select>

        <button type="submit" disabled={searchOption ? false : true}>
          filter
        </button>

      </form>
    </>

    
  );
};

export default SearchBar;
