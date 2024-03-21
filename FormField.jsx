import React from "react";

const FormField = ({
  labelName,
  placeholder,
  inputType,
  isTextArea,
  value,
  handleChange,
  children,
}) => {
  return (
    <label className="flex-1 w-full flex flex-col">
      {labelName && (
        <span
          className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] 
      mb-[10px]"
        >
          {labelName}
        </span>
      )}
      {isTextArea ? (
        <textarea
          required
          value={value}
          onChange={handleChange}
          rows={10}
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
        />
      ) : inputType === "dropdown" ? (
        <div className="relative">
          <select
            required
            value={value}
            onChange={handleChange}
            className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-[#1c1c24] font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
          >
            <option value="">{placeholder}</option>
            {children}
          </select>
          <span className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          </span>
        </div>) 
        
        : (
        <input
          required
          value={value}
          onChange={handleChange}
          type={inputType}
          step="0.1"
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
        />
      )}
    </label>
  );
};

export default FormField;
