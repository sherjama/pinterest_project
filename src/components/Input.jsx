import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  {
    label,
    labelStyle = "text-sm text-gray-800",
    type = "text",
    className = "",
    ...props
  },
  ref
) {
  const id = useId();
  return (
    <>
      {label && (
        <label className={`${labelStyle} `} htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`w-full px-4 py-2 mt-1 border rounded-md focus:ring-red-500 focus:border-red-500 ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </>
  );
});

export default Input;
