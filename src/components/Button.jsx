import React from "react";

const Button = ({
  className,
  children,
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
        {children}
      </button>
    </div>
  );
};

export default Button;
