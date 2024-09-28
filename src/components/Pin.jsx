import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import appwriteService from "../appwrite/config";

const Pin = ({ pinData }) => {
  return (
    <div className="w-full mb-5 overflow-hidden rounded-lg">
      <LazyLoadImage
        key={pinData.$id}
        src={appwriteService.getFilePreview(pinData.image)}
        alt={`Image ${pinData.$id}`}
        effect="blur" // You can also use "opacity" or other effects
      />
    </div>
  );
};

export default Pin;
//
