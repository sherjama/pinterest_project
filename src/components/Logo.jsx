import React from "react";
import { FaPinterest } from "react-icons/fa";

const Logo = ({ size = 35, className = "" }) => {
  return (
    <div
      className={`overflow-hidden  rounded-full border-2 flex items-center justify-center ${className}`}
    >
      <FaPinterest color="red" size={size} />
    </div>
  );
};

export default Logo;
