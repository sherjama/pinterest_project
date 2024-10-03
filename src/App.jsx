import React, { useEffect, useState } from "react";
import { Header, Footer } from "./components/index";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import appwriteService from "./appwrite/config";
import { addPins, deletePins } from "./store/pinSlice";

const App = () => {
  const [pins, setPins] = useState([]);
  const status = useSelector((state) => state.authStatus.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (status) {
      appwriteService.ListPosts().then((posts) => {
        posts ? setPins(posts) : null;
      });
    }
    if (pins) {
      dispatch(addPins(pins));
    }
  }, [pins, setPins]);

  return (
    <>
      <div className="w-full h-screen ">
        <Header className="w-full h-[12%] z-20 fixed top-0 bg-white" />
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
