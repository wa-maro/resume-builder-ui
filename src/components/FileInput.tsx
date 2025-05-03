import React from "react";

const FileInput = ({
  name,
  required = false,
  value,
  onChange,
}: {
  name: string;
  required?: boolean;
  value: string;
  style?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
      className="font-medium text-sm text-gray-500 bg-gray-100 rounded max-w-fit cursor-pointer file:cursor-pointer file:border-0 file:py-1.5 file:px-2.5 file:mr-4 file:bg-gray-800 file:text-white"
      type="file"
      name={name}
      id={name}
      onChange={onChange}
      value={value}
      required={required}
    />
  );
};

export default FileInput;
