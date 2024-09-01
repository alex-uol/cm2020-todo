import React from 'react';

/**
 * SearchBox Component
 * Renders a search box for filtering tasks.
 * 
 * @param {Object} props
 * @param {string} props.searchValue - The current value of the search input.
 * @param {Function} props.setSearchValue - Function to update the search input value.
 * @returns {JSX.Element} A search input and button.
 */
const SearchBox = ({ searchValue, setSearchValue }) => {

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="search-box">
      <input
        type="text"
        name="searchValue"
        placeholder="Search ..."
        value={searchValue}
        onChange={handleSearchChange}
      />
      {searchValue && (<button onClick={() => setSearchValue("")}>Clear</button>
      )}
    </div>
  );
};

export default SearchBox;
