import React, { useState } from 'react';
import './search.scss';

function Search({ onSearch }) {
  

  // const handleInputChange = (event) => {
  //   setSearchTerm(event.target.value);
  // };

  // const handleSearch = () => {
  //   onSearch(searchTerm);
  // };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search"
        // value={searchTerm}
        // onChange={handleInputChange}
      />
      <button >Search</button>
    </div>
  );
}

export default Search;
