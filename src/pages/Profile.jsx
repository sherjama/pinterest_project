import React, { useEffect, useState } from "react";
import { PinsGrid } from "../components";
import appwriteService from "../appwrite/config";
import authservice from "../appwrite/auth";
import { Query } from "appwrite";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Profile = () => {
  const { userId } = useParams();
  const [autherDp, setAutherDp] = useState();
  const [auther, setAuther] = useState();
  const [pins, setPins] = useState([]);

  useEffect(() => {
    getUserDetails();
  }, [setPins, pins]);

  const getUserDetails = async () => {
    await appwriteService
      .ListPosts([Query.equal("userId", userId)])
      .then((post) => (post ? setPins(post) : null));
    if (pins) {
      setAutherDp(pins.documents[0].autherDp);
      setAuther(pins.documents[0].auther);
    }
  };

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

        {/* <p className="text-gray-500">@s4h2004</p>
        <p className="mt-2 text-gray-700">578 followers · 1 following</p>
        <p className="text-gray-500">326k monthly views</p>
        <div className="flex mt-4 space-x-4">
          <button className="bg-red-500 text-white px-4 py-2 rounded-full">
            Follow
          </button>
          <i className="fas fa-ellipsis-h text-gray-700"></i>
        </div> */}
        <div className="flex mt-6 space-x-8">
          <button className="border-b-2 border-black pb-1">Created</button>
        </div>
      </div>
      <PinsGrid pin={pins.documents} userPins={true} />
    </div>
  );
};

export default Profile;
