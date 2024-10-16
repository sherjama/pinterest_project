// loader
import { LazyLoadImage } from "react-lazy-load-image-component";
// react
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// index file
import { PinsGrid } from "../components/index";
// appwrite
import appwriteService from "../appwrite/config";
import { Query } from "appwrite";

const Profile = () => {
  // states
  const { userId } = useParams();
  const [autherDp, setAutherDp] = useState();
  const [auther, setAuther] = useState();
  const [pins, setPins] = useState([]);

  // functions
  const getUserDetails = async () => {
    await appwriteService
      .ListPosts([Query.equal("userId", userId)])
      .then((post) => (post ? setPins(post) : null));
    if (pins) {
      setAutherDp(pins.documents[0].autherDp);
      setAuther(pins.documents[0].auther);
    }
  };

  // useEffect's
  useEffect(() => {
    getUserDetails();
  }, [setPins, pins]);

  return (
    <div className="w-full">
      <div className="flex flex-col items-center p-6">
        <LazyLoadImage
          id={pins.$id}
          src={appwriteService.getFilePreview(autherDp ? autherDp : null)}
          alt={`Image ${pins.$id}`}
          effect="blur"
          className="rounded-full w-24 h-24 object-cover"
        />
        <h1 className="text-2xl font-semibold mt-4">{auther}</h1>

        <div className="flex mt-6 space-x-8">
          <button className="border-b-2 border-black pb-1">Created</button>
        </div>
      </div>
      <PinsGrid pin={pins.documents} userPins={true} />
    </div>
  );
};

export default Profile;
