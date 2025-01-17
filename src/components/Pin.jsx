// react
import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
// appwrite
import appwriteService from "../appwrite/config";
// index file
import { Dp } from "./index";
// redux
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading } from "../store/loadSlice";

const Pin = ({ pinData }) => {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // set Loading value
  useEffect(() => {
    loaded ? dispatch(setLoading(false)) : dispatch(setLoading(true));
  }, [loaded]);

  return (
    <div
      className={`w-full mb-5 overflow-hidden rounded-xl flex justify-center items-center flex-col flex-wrap ${
        !loaded ? "bg-gray-400" : ""
      }`}
      id={pinData.$id}
      onClick={() => navigate(`/pin/${pinData.$id}`)}
    >
      {/* pin image  */}
      <LazyLoadImage
        onLoad={() => setLoaded(true)}
        id={pinData.$id}
        key={pinData.$id}
        src={appwriteService.getFilePreview(pinData.image)}
        alt={`Image ${pinData.$id}`}
        effect="blur" // You can also use "opacity" or other effects
        className="rounded-xl hover:scale-90 border-blue-400"
      />

      {/* data  */}
      {loaded && (
        <div
          className={`ml-2 mt-1 size w-full min-h-16 font-Secondary `}
          id={pinData.$id}
        >
          <p className="font-medium text-sm text-[#323232]">{pinData.title}</p>
          <div className="mt-1 flex items-center justify-start text-[#B4B4B4]">
            <Dp className="size-8" cusstomDp={pinData.autherDp} />
            <span className="text-sm underline">{pinData.auther}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pin;
