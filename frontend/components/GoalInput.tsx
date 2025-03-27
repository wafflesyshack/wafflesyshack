// components/GoalInput.tsx

import React from "react";

interface GoalInputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const GoalInput: React.FC<GoalInputProps> = ({ label, type, name, value, onChange, placeholder }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-white">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 bg-white border border-gray-300 rounded-md mt-1"
        placeholder={placeholder}
      />
    </div>
  );
};

export default GoalInput;
