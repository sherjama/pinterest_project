import { FaSearch } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const SearchBar = ({ className = "" }) => {
  // states
  const [focus, setFocus] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState();
  const redux_pins = useSelector((state) => state.pins.pins);

  // functions
  const handleSearch = (e) => {
    // e.preventDefault();
    // Filter pins based on search searchTerm
    if (redux_pins) {
      const filtered = redux_pins.filter(
        (pin) =>
          pin.board.toLowerCase().includes(searchTerm) ||
          pin.tag.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
          pin.title.toLowerCase().includes(searchTerm) ||
          pin.description.toLowerCase().includes(searchTerm) ||
          pin.author.toLowerCase().includes(searchTerm)
      );
      setResult(filtered);
      console.log(filtered);
    }

    // console.log(redux_pins);
  };

  const focusHandler = () => {
    if (!focus) {
      setFocus(true);
    } else {
      setFocus(false);
    }
  };

  useEffect(() => {
    // setPins(Pins);
    if (redux_pins) handleSearch();
    // console.log(Pins);
  }, [searchTerm, setSearchTerm, redux_pins]);

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
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
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
