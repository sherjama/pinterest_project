// icons
import { FaSearch } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { GiCancel } from "react-icons/gi";
// react
import React, { useEffect, useState } from "react";
// index file
import { Logo, Button, SearchBar, Dp } from "../index";
// react router
import { Link, useNavigate, useLocation, NavLink } from "react-router-dom";
// redux
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";
import { deletePins } from "../../store/pinSlice";
// auth service
import authservice from "../../appwrite/auth";

const Header = ({ className = "" }) => {
  // states
  const [toggle, setToggle] = useState(false);
  const [searchTgl, setSearchTgl] = useState(false);

  // react-router-dom
  const navigate = useNavigate();
  const location = useLocation();

  // redux
  const dispatch = useDispatch();

  // redux-authStatus data

  const authstatus = useSelector((state) => state.authStatus.status);
  const sessionID = useSelector((state) => state.authStatus.session);
  const userdata = useSelector((state) => state.authStatus.userdata);

  // functions
  const Logout = () => {
    // auth Logout
    authservice.Logout(sessionID.$id).then(dispatch(logout()));

    navigate("/auth/login");

    // Removing data of localSorage
    localStorage.removeItem("userdata");
    localStorage.removeItem("session");
    localStorage.removeItem("id");
    localStorage.removeItem("password");
    localStorage.removeItem("status");
    localStorage.removeItem("prefs");

    dispatch(deletePins());
  };

  // useEffect's
  useEffect(() => {
    setToggle(false);
  }, [location]);

  return (
    <>
      <div className={`${className} flex  justify-between items-center `}>
        {/* searchbar for mobiles  */}
        {authstatus && searchTgl && (
          <div className="w-full flex items-center justify-center space-x-2">
            <SearchBar className="w-3/4" />
            <span onClick={() => setSearchTgl(false)}>
              <GiCancel size={26} color="gray" />
            </span>
          </div>
        )}

        <div
          className={`w-[85%] h-full flex items-center justify-start max-[900px]:justify-between max-md:justify-start max-sm:w-[77%]  space-x-8 px-3 ${
            searchTgl ? "hidden" : ""
          }`}
        >
          {/* Logo  */}
          <div
            className="flex items-center  justify-between hover:bg-gray-300  p-2 rounded-full"
            onClick={() => setToggle((prev) => !prev)}
          >
            {<Logo className="max-[360px]:hidden" />}
            <Dp
              className="size-10 min-[360px]:hidden"
              onClick={() => navigate(`/profile/${userdata.$id}`)}
            />
            <span className="text-[#111111] text-lg font-normal pl-1 font-Secondary selection:text-[#111111] max-[360px]:hidden">
              Pinterest
            </span>
            <span className="text-[#111111] text-lg font-normal pl-1 font-Secondary selection:text-[#111111] min-[360px]:hidden">
              {userdata ? userdata.name : "Pinterest"}
            </span>
            {/* hamberger menu  */}
            <span className=" ml-2">
              <TiThMenu size={16} color="#1b1b1f" />
            </span>
          </div>

          {/* header navigation  */}
          <div className="flex items-center justify-center max-[900px]:max-w-96  min-[900px]:min-w-[74%] min-[1000px]:min-w-[77%]">
            <div className="flex items-center  justify-between space-x-5 max-[900px]:hidden ">
              <NavLink
                to={"/home"}
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "bg-black text-white p-3 hover:bg-black"
                      : "hover:bg-slate-300"
                  } ${!authstatus ? "hidden" : ""} p-3  rounded-full `
                }
              >
                <p className="font-Primary font-semibold text-sm">Home</p>
              </NavLink>
              {/* <NavLink
              to={"/explore"}
              className={({ isActive }) =>
                `${
                  isActive ? "bg-black text-white p-3 rounded-full" : ""
                } p-3 ${!authstatus ? "hidden" : ""}`
              }
            >
              <p className="font-Primary font-semibold text-sm">Explore</p>
            </NavLink> */}
              <NavLink
                to={"/creation-pin/create"}
                className={({ isActive }) =>
                  `${
                    isActive ? "bg-black text-white p-3 rounded-full" : ""
                  } p-3 ${!authstatus ? "hidden" : ""}`
                }
              >
                <p className="font-Primary font-semibold text-sm">Create</p>
              </NavLink>
              <NavLink
                to={"/blog"}
                className={({ isActive }) =>
                  `${
                    isActive ? "bg-black text-white p-3 rounded-full" : ""
                  } p-3 max-[1080px]:hidden`
                }
              >
                <p className="font-Primary font-semibold text-sm">Blog</p>
              </NavLink>
              <NavLink
                to={"/contact-us"}
                className={({ isActive }) =>
                  `${
                    isActive ? "bg-black text-white p-3 rounded-full" : ""
                  } p-3 `
                }
              >
                <p className="font-Primary font-semibold text-sm">Contact</p>
              </NavLink>
            </div>

            {/* searchbar  */}

            {authstatus && !searchTgl && (
              <>
                <SearchBar className="max-[900px]:min-w-full max-sm:hidden ml-4 w-full" />{" "}
              </>
            )}
          </div>
        </div>

        {/* Account display picture  */}
        <div
          className={`flex items-center justify-end mr-3 min-w-[160px] sm:min-w-max h-full max-sm:min-w-max ${
            searchTgl ? "hidden" : ""
          }`}
        >
          {authstatus && (
            <span
              className="sm:hidden relative  rounded-full p-2 bg-gray-300 mr-2"
              // onClick={() => setSearchTgl(true)}
              onClick={() => setSearchTgl((prev) => !prev)}
            >
              <FaSearch size={20} />
            </span>
          )}
          <Dp
            className="size-10 max-[360px]:hidden"
            onClick={() => navigate(`/profile/${userdata.$id}`)}
          />

          {/* login & signup Button*/}
          <div className="flex items-center ">
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
                className={`${authstatus ? " hidden" : " inline-block "} `}
                onClick={() => navigate(`/auth/signup`)}
              />

              {/* Logout Button  */}
              <Button
                text="Log out"
                className={`${
                  authstatus ? " inline-block" : " hidden"
                }  max-sm:text-xs`}
                onClick={Logout}
              />
            </div>
          </div>
        </div>
      </div>

      {/* navigations  */}
      <div
        className={`w-full h-[75vh]  fixed  p-8 top-[10%] flex justify-evenly items-start bg-white z-10 max-sm:flex-wrap max-sm:min-h-max ${
          toggle ? "" : "hidden"
        }`}
      >
        {/* Shortcuts */}
        <div className="h-min min-w-52  ">
          <h2 className="font-Primary text-gray-950 font-semibold  text-xl pb-5 max-sm:pb-0">
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
              to={"/blog"}
              className="font-Secondary text-sm text-gray-600 hover:bg-gray-200 p-4 rounded-xl"
            >
              Blog
            </Link>
            <Link
              to={"/contact-us"}
              className="font-Secondary text-sm text-gray-600 hover:bg-gray-200 p-4 rounded-xl"
            >
              Contact Us
            </Link>
          </nav>
        </div>
        <span className="w-[2px] h-4/5 bg-slate-800 max-sm:hidden"></span>
        <div className="h-min min-w-52 ">
          <h2 className="font-Primary text-gray-950 font-semibold  text-xl pb-5 max-sm:pb-0">
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
