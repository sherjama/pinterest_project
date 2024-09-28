import React, { useState } from "react";
import { PinsGrid } from "../components";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const pins = useSelector((state) => state.pins.pins);

  return (
    <div className=" w-full ">
      <PinsGrid pin={pins} />
    </div>
  );
};

export default Home;
