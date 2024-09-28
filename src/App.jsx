import React, { useEffect } from "react";
import { Header, Footer } from "./components/index";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import appwriteService from "./appwrite/config";
import { addPins } from "./store/pinSlice";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    appwriteService
      .ListPosts()
      .then((posts) => {
        posts ? dispatch(addPins(posts)) : null;
      })
      .finally(navigate("/home"));
  });

  return (
    <>
      <div className="w-full h-screen ">
        <Header className="w-full h-[10%] z-20 fixed top-0 bg-white" />
        <div className="w-full h-[10%]"></div>
        <main className="w-full min-h-min ">
          <Outlet />
        </main>
        <Footer className="" />
      </div>
    </>
  );
};

export default App;
