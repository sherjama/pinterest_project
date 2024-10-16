import React from "react";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";

const Dp = ({ className = "", cusstomDp = "", ...prop }) => {
  const authSlice = useSelector((state) => state.authStatus);

  const { status, prefs } = authSlice;
  const dp = prefs ? prefs.displayPicture : "670926b1000cb03e26cc";
  return (
    <div
      className={`${className} rounded-full  mr-2 bg-slate-900 ${
        status ? "" : "hidden"
      } flex items-center justify-center overflow-hidden`}
      {...prop}
    >
      <img
        className="object-cover w-full h-full "
        src={
          dp ? appwriteService.getFilePreview(cusstomDp ? cusstomDp : dp) : null
        }
        alt="dp"
      />
    </div>
  );
};

export default Dp;
