import React from "react";

const Search = ({ fetchCountries, selectedCountry }) => {
  return (
    <div className="search">
      <button onClick={() => fetchCountries(selectedCountry.value)}>
        ძებნა
      </button>
    </div>
  );
};

export default Search;
