import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import appwriteService from "../appwrite/config";

import { Dp } from "./index";

const Pin = ({ pinData }) => {
  // console.log(pinData);

  return (
    <div className="w-full mb-5 overflow-hidden rounded-xl flex justify-center items-center flex-col">
      <LazyLoadImage
        key={pinData.$id}
        src={appwriteService.getFilePreview(pinData.image)}
        alt={`Image ${pinData.$id}`}
        effect="blur" // You can also use "opacity" or other effects
        className="rounded-xl"
      />
      <div className="ml-2 mt-1 size w-full h-16 font-Secondary  ">
        <p className="font-medium text-sm text-[#323232]">
          {pinData.description}
        </p>
        <div className="mt-1 flex items-center justify-start text-[#B4B4B4]">
          <Dp className="size-8" cusstomDp={pinData.autherDp} />
          <span className="text-sm underline">{pinData.auther}</span>
        </div>
      </div>
    </div>
  );
};

export default Pin;
//
