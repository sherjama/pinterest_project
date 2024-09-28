import React from "react";
import PinterestLogo from "../assets/Logo.png";
import { FaPinterest } from "react-icons/fa";

const Logo = ({ size = 35 }) => {
  return (
    <div className="overflow-hidden  rounded-full border-2 flex items-center justify-center">
      <FaPinterest color="red" size={size} />
    </div>
  );
};

export default Logo;
