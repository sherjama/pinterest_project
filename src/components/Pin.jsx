import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import appwriteService from "../appwrite/config";

import { Dp } from "./index";
import { useNavigate } from "react-router-dom";

const Pin = ({ pinData }) => {
  // console.log(pinData);
  const navigate = useNavigate();
  const [hoverd, setHoverd] = useState(false);

  // const handleDownload = () => {
  //   // Create a temporary link element
  //   const link = document.createElement('a');
  //   link.href = imageUrl;
  //   link.download = imageName || 'downloaded_image'; // You can set the image name here
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link); // Clean up the DOM
  // };

  return (
    <div
      className="w-full mb-5 overflow-hidden rounded-xl flex justify-center items-center flex-col flex-wrap"
      id={pinData.$id}
      onMouseMove={(e) => setHoverd(true)}
      onMouseLeave={(e) => setHoverd(false)}
      onClick={() => navigate(`/pin/${pinData.$id}`)}
    >
      <LazyLoadImage
        id={pinData.$id}
        key={pinData.$id}
        src={appwriteService.getFilePreview(pinData.image)}
        alt={`Image ${pinData.$id}`}
        effect="blur" // You can also use "opacity" or other effects
        className="rounded-xl hover:border-2 border-blue-400"
      />
      {/* <h1
        className={`${
          hoverd ? "" : "hidden"
        } relative z-20 top-[-3.8rem] left-[32%] text-slate-50 bg-red-600 p-3 rounded-3xl`}
      >
        save
      </h1> */}
      <div
        className={`ml-2 mt-1 size w-full min-h-16 font-Secondary `}
        id={pinData.$id}
      >
        <p className="font-medium text-sm text-[#323232]">
          {pinData.description}
        </p>
        <div className="mt-1 flex items-center justify-start text-[#B4B4B4]">
          <Dp className="size-8" cusstomDp={pinData.autherDp} />
          <span className="text-sm underline">{pinData.auther}</span>
        </div>
      </div>
      {/* <h1 className={`${hoverd ? null : "hidden"}`}>hello</h1> */}
    </div>
  );
};

export default Pin;
//
