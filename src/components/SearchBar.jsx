// icons
import { FaSearch } from "react-icons/fa";
// react
import React, { useEffect, useState } from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
import { addSearchPins } from "../store/pinSlice";
// appwrite
import appwriteService from "../appwrite/config";

const SearchBar = ({ className = "" }) => {
  // states
  const [Pins, setPins] = useState([]);
  const [focus, setFocus] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState("");
  const [NotFound, setNotFound] = useState(false);
  const redux_pins = useSelector((state) => state.pins.pins);

  // redux
  const dispatch = useDispatch();

  // functions
  const Listposts = async () => {
    await appwriteService.ListPosts().then((posts) => {
      posts ? setPins(posts.documents) : null;
    });
  };

  const handleSearch = () => {
    if (Pins) {
      const filtered = Pins.filter(
        (pin) =>
          pin.title.toLowerCase().includes(searchTerm) ||
          pin.description.toLowerCase().includes(searchTerm) ||
          pin.auther.toLowerCase().includes(searchTerm) ||
          pin.board.toLowerCase().includes(searchTerm) ||
          pin.tag.some((tag) => tag.toLowerCase().includes(searchTerm))
      );

      setResult(filtered);
    }
  };

  const focusHandler = () => {
    if (!focus) {
      setFocus(true);
    } else {
      setFocus(false);
    }
  };

  // useEffect's
  useEffect(() => {
    Listposts();
    handleSearch();
  }, [redux_pins, searchTerm]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      if (result.length <= 0) {
        setNotFound(true);
      }

      if (result.length > 0) {
        setNotFound(false);
        dispatch(addSearchPins(result));
      }
    } else {
      setNotFound(false);
      // dispatch(deleteSearchPins());
    }
  }, [searchTerm, result]);

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
        {NotFound && (
          <p className="text-xs font-Secondary text-red-500">Not Found</p>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
