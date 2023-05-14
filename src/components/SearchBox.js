import React from 'react';

const SearchBox = ({ searchText, onChange }) => {
  return (
    <div className="search-box">
      <input type="text" placeholder="Search notes..." defaultValue={searchText} onChange={onChange} />
    </div>
  );
}

export default SearchBox;
