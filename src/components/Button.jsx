import React from "react";
import { useNavigate } from "react-router-dom";

const Button = ({
  className,
  text = "submit",
  type = "submit",
  bgColor = "bg-red-600 ",
  textColor = "text-gray-200",

  ...props
}) => {
  return (
    <div>
      <button
        className={`${className} ${bgColor} ${textColor} py-2 px-3 rounded-3xl  font-medium text-md mx-1`}
        type={type}
        {...props}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
