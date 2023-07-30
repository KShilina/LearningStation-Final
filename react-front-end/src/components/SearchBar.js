import React, { useEffect, useState } from 'react';

const SearchBar = ({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOption, setSearchOption] = useState(''); // Default to searching by subject

  //needed for the function to trigger 
  const handleSubjectFilter = (event) => {
    event.preventDefault();
    onFilter(searchOption)

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
    onSearch(searchTerm, searchOption); // Pass searchTerm and searchOption to the onSearch function
    console.log('Search Term:', searchTerm);
    console.log('Search Option:', searchOption);
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

        <button type="submit" disabled={searchOption ? false : true}>filter</button>

      </form>
    </>

    
  );
};

export default SearchBar;
