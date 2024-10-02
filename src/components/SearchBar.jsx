import { FaSearch } from "react-icons/fa";
import React, { useState } from "react";

const SearchBar = ({ className = "" }) => {
  // states
  const [focus, setFocus] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // functions
  const handleSearch = (e) => {
    e.preventDefault();
    console.log(searchTerm);
  };

  const focusHandler = () => {
    if (!focus) {
      setFocus(true);
    } else {
      setFocus(false);
    }
  };

  return (
    <div className={`${className} h-12 `}>
      <form
        onSubmit={handleSearch}
        className={`h-full relative flex items-center justify-center
        bg-gray-200 rounded-3xl shadow-sm px-2 ${
          focus ? "border-transparent ring-blue-400 ring-2 outline-none" : ""
        }`}
      >
        <span className="p-3">
          <FaSearch />
        </span>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search"
          className="w-full h-full bg-transparent px-3 outline-none"
          onFocus={focusHandler}
          onBlur={focusHandler}
        />
      </form>
    </div>
  );
};

export default SearchBar;
