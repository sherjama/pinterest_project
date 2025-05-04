import React from "react";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";

const Dp = ({ className = "", cusstomDp = "", ...prop }) => {
  const authSlice = useSelector((state) => state.authStatus);

  const { status, prefs } = authSlice;

  const dp = prefs
    ? `https://fra.cloud.appwrite.io/v1/storage/buckets/66d801490026bec522c7/files/${prefs.displayPicture}/view?project=66d70efe003c16e69527&mode=admin`
    : "https://fra.cloud.appwrite.io/v1/storage/buckets/66d801490026bec522c7/files/670926b1000cb03e26cc/view?project=66d70efe003c16e69527&mode=admin";

  const costomDP = `https://fra.cloud.appwrite.io/v1/storage/buckets/66d801490026bec522c7/files/${cusstomDp}/view?project=66d70efe003c16e69527&mode=admin`;

  return (
    <div
      className={`${className} rounded-full  mr-2 bg-slate-900 ${
        status ? "" : "hidden"
      } flex items-center justify-center overflow-hidden`}
      {...prop}
    >
      <img
        className="object-cover w-full h-full "
        src={dp ? (cusstomDp ? costomDP : dp) : null}
        alt="dp"
      />
    </div>
  );
};

export default Dp;
