import React, { useEffect, useState } from "react";
import { PinsGrid } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addPins } from "../store/pinSlice";
import appwriteService from "../appwrite/config";

const Home = () => {
  const [pins, setPins] = useState([]);
  const { status, userdata } = useSelector((state) => state.authStatus);
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

  const StoredPins = useSelector((state) => state.pins.pins);

  return (
    <div className=" w-full ">
      <PinsGrid pin={StoredPins} />
    </div>
  );
};

export default Home;
