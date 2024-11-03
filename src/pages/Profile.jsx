// loader
import { LazyLoadImage } from "react-lazy-load-image-component";
import LoadingBar from "react-top-loading-bar";
// react
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// index file
import { PinsGrid, Button } from "../components/index";
// appwrite
import appwriteService from "../appwrite/config";
import { Query } from "appwrite";
// redux
import { useSelector } from "react-redux";
import authservice from "@/appwrite/auth";

const Profile = () => {
  // states
  const { userId } = useParams();
  const [userIdFORstate, setUserIdFORstate] = useState();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(70);
  const [autherDp, setAutherDp] = useState();
  const [auther, setAuther] = useState();
  const [pins, setPins] = useState([]);
  const [saved, setSaved] = useState([]);
  const [nonUserSaved, setNonUserSaved] = useState();
  const [toggle, setToggle] = useState(false);
  const [isLogedinUser, setisLogedinUser] = useState();

  // redux
  const savedpins_Store = useSelector((state) => state.pins.savedPinsDATA);
  const { userdata, prefs } = useSelector((state) => state.authStatus);

  const navigate = useNavigate();

  // functions
  const LoadingHandler = () => {
    setLoading(true);
    setProgress(100);
  };

  const getUserDetails = async () => {
    const user = userId == userdata.$id ? true : false;
    setisLogedinUser(user);
    const res = await appwriteService
      .ListPosts([Query.equal("userId", userId)])
      .then((post) => (post ? setPins(post) : false));

    if (pins.total > 0) {
      setAutherDp(pins.documents[0].autherDp);
      setAuther(pins.documents[0].auther);
    } else {
      if (isLogedinUser) {
        setAuther(userdata.name);
        setAutherDp(prefs.displayPicture);
      }
    }
  };

  const getSavedPins = async () => {
    if (isLogedinUser) {
      setSaved(savedpins_Store);
    } else {
      try {
        await appwriteService
          .ListSavePosts(userId)
          .then((posts) => setNonUserSaved(posts.documents));

        if (nonUserSaved) {
          const postIds = nonUserSaved.map((item) => item.pinId);

          if (postIds) {
            await appwriteService
              .ListPosts([Query.equal("$id", postIds)])
              .then((post) =>
                post.total >= 0 ? setSaved(post.documents) : null
              );
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const buttonHandler = (e) => {
    const button = e.target.id;
    if (button == "Create") {
      setToggle(false);
    } else {
      setToggle(true);
    }
  };

  // useEffect's
  useEffect(() => {
    // setUser ID
    setUserIdFORstate(userId);
    // getting user Details and pins he/her posted
    getUserDetails();
    // getting user Save pins
    getSavedPins();
  }, [pins, saved, userId]);

  return (
    <div className="w-full">
      <div className="flex flex-col items-center p-6">
        <LoadingBar
          color="#f11946"
          progress={progress}
          onLoaderFinished={LoadingHandler}
        />
        <LazyLoadImage
          onLoad={LoadingHandler}
          id={pins.$id}
          src={appwriteService.getFilePreview(autherDp ? autherDp : null)}
          alt={`Image ${pins.$id}`}
          effect="blur"
          className="rounded-full w-24 h-24 object-cover"
        />
        {loading && <h1 className="text-2xl font-semibold mt-4">{auther}</h1>}

        {loading && (
          <div className="flex mt-6 space-x-8 ">
            <Button
              text="Created"
              bgColor={toggle ? "bg-transparent" : "bg-black"}
              textColor={toggle ? "text-gray-800" : "text-white"}
              id="Create"
              onClick={buttonHandler}
            />
            <Button
              text="Saved"
              bgColor={toggle ? "bg-black" : " bg-transparent"}
              textColor={toggle ? "text-white" : "text-gray-800"}
              id="save"
              onClick={buttonHandler}
            />
          </div>
        )}
      </div>
      {loading && (
        <div className="w-full">
          <PinsGrid pin={toggle ? saved : pins.documents} userPins={true} />
        </div>
      )}
    </div>
  );
};

export default Profile;
