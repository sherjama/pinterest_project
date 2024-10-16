// react
import React, { useEffect, useState } from "react";
// index file
import { Header, Footer } from "./components/index";
// router-dom
import { Outlet, useNavigate } from "react-router-dom";
// redux
import { useDispatch, useSelector } from "react-redux";
import { addPins } from "./store/pinSlice";
// appwrite
import appwriteService from "./appwrite/config";

const App = () => {
  // states
  const [pins, setPins] = useState([]);

  // redux
  const status = useSelector((state) => state.authStatus.status);
  const dispatch = useDispatch();

  // router-dom
  const navigate = useNavigate();

  // useEffect's
  useEffect(() => {
    if (status) {
      appwriteService.ListPosts().then((posts) => {
        posts ? setPins(posts) : null;
      });
    }
    if (pins) {
      dispatch(addPins(pins));
    }

    if (!status) {
      navigate("/auth/login");
    }
  }, [pins, setPins]);

  return (
    <>
      <div className="w-full h-screen ">
        <Header className="w-full h-[12%] z-50 fixed top-0 bg-white" />
        <div className="w-full h-[12%]"></div>
        <main className="w-full min-h-min ">
          <Outlet />
        </main>
        <Footer className="" />
      </div>
    </>
  );
};

export default App;
