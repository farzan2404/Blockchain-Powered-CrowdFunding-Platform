import React from "react";

const CustomButton = ({ btnType, title, handleClick, styles }) => {
  return (
    <button
      type={btnType}
      className={`font-epilogue fold-semibold text-[16px] 
      leading-[26px] text-white min-h-[35px] px-4 rounded-[10px] ${styles} hover:scale-110 transform transition duration-150 ease-in-out`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default CustomButton;
