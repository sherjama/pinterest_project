// icons
import { TiThMenu } from "react-icons/ti";
// react
import React, { useEffect, useState } from "react";
// index file
import { Logo, Button, SearchBar } from "../index";
// react router
import { Link, useNavigate, useLocation } from "react-router-dom";
// redux
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";
// auth service
import authservice from "../../appwrite/auth";

const Header = ({ className = "" }) => {
  // states
  const [toggle, setToggle] = useState(false);

  // react-router-dom
  const navigate = useNavigate();
  const location = useLocation();

  // redux
  const dispatch = useDispatch();

  // redux-authStatus data
  const authstatus = useSelector((state) => state.authStatus.status);
  const sessionID = useSelector((state) => state.authStatus.session);

  // functions
  const Logout = () => {
    // auth Logout
    authservice.Logout(sessionID.$id).then(dispatch(logout()));

    navigate("/about");

    // Removing data of localSorage
    localStorage.removeItem("userdata");
    localStorage.removeItem("session");
    localStorage.removeItem("id");
    localStorage.removeItem("password");
    localStorage.removeItem("status");
  };

  const menuHandler = () => {
    if (!toggle) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  };

  // useEffect's
  useEffect(() => {
    setToggle(false);
  }, [location]);

  return (
    <>
      <div className={`${className} flex  justify-center items-center mt-1`}>
        <nav className="w-[98%] h-full flex items-center justify-between ">
          {/* Logo  */}
          <div
            className="flex items-center justify-between hover:bg-gray-300  p-2 rounded-full"
            onClick={menuHandler}
          >
            {<Logo />}
            <span className="text-[#111111] text-lg font-normal pl-1 font-Secondary selection:text-[#111111]">
              Pinterest
            </span>
            {/* hamberger menu  */}
            <span className=" ml-2">
              <TiThMenu size={16} color="#1b1b1f" />
            </span>
          </div>
          {/* searchbar  */}

          <SearchBar className="max-md:hidden md:w-[56%]" />

          <div className="flex items-center">
            {/* login & signup Button*/}
            <div className="flex">
              <Button
                text="Log in"
                className={`${authstatus ? " hidden" : " inline-block"} `}
                onClick={() => navigate(`/auth/login`)}
              />
              <Button
                text="Sign up"
                bgColor="bg-gray-300"
                textColor="text-gray-900"
                className={`${authstatus ? " hidden" : " inline-block"} `}
                onClick={() => navigate(`/auth/signup`)}
              />

              {/* Logout Button  */}
              <Button
                text="Log out"
                className={`${authstatus ? " inline-block" : " hidden"}`}
                onClick={Logout}
              />
            </div>
          </div>
        </nav>
      </div>

      {/* navigations  */}
      <div
        className={`w-full h-[80vh]  absolute top-[10%] flex justify-evenly items-center bg-white ${
          toggle ? "" : "hidden"
        }`}
      >
        {/* Shortcuts  */}
        <div className="h-5/6 min-w-52  ">
          <h2 className="font-Primary text-gray-950 font-semibold  text-xl pb-5">
            Shortcuts
          </h2>
          <nav className="min-w-20 min-h-32 pl-5 flex flex-col space-y-2 ">
            <Link
              to={"/home"}
              className="font-Secondary text-sm text-gray-600 hover:bg-gray-200 p-4 rounded-xl"
            >
              Home feed
            </Link>
            <Link
              to={"/explore"}
              className="font-Secondary text-sm text-gray-600 hover:bg-gray-200 p-4 rounded-xl"
            >
              Explore
            </Link>
            <Link
              to={"/blog"}
              className="font-Secondary text-sm text-gray-600 hover:bg-gray-200 p-4 rounded-xl"
            >
              Blog
            </Link>
          </nav>
        </div>

        <span className="w-[2px] h-4/5 bg-slate-800"></span>

        <div className="h-5/6 min-w-52 ">
          <h2 className="font-Primary text-gray-950 font-semibold  text-xl pb-5">
            Create
          </h2>
          <nav className="min-w-20 min-h-32 pl-5 flex flex-col space-y-2 ">
            <Link
              to={"/creation-pin/create"}
              className="font-Secondary text-sm text-gray-600 hover:bg-gray-200 p-4 rounded-xl"
            >
              Create Pin
            </Link>
          </nav>
        </div>
        <span className="sm:w-[2px] sm:h-4/5 bg-slate-800 max-sm:hidden"></span>

        <div className="sm:h-5/6 sm:min-w-52 max-sm:hidden">
          <h2 className="font-Primary text-gray-950 font-semibold  text-xl ">
            Create1
          </h2>
        </div>
        <span className="max-sm:hidden w-[2px] h-4/5 bg-slate-800"></span>

        <div className="sm:h-5/6 sm:min-w-52  max-sm:hidden">
          <h2 className="font-Primary text-gray-950 font-semibold  text-xl">
            Create2
          </h2>
        </div>
      </div>
    </>
  );
};

export default Header;
