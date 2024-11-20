import React, { useRef } from 'react';
import SearchIcon from '../../Assests/search-icon.png';
import '../Weather/Weather.css';

const SearchBar = ({ onSearch }) => {
  const inputRef = useRef();

  const handleSearch = () => {
    if (onSearch && inputRef.current) {
      onSearch(inputRef.current.value);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-bar">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search"
        onKeyDown={handleKeyDown}
      />
      <img src={SearchIcon} alt="Search Icon" onClick={handleSearch} />
    </div>
  );
};

export default SearchBar;
