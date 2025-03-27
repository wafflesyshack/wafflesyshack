// components/SubmitButton.tsx

import React from "react";

interface SubmitButtonProps {
  text: string;
  onClick: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ text, onClick }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="w-full h-13 bg-[#3E4078] text-white flex items-center justify-center p-3 rounded-full mt-4 transition-all duration-300 transform hover:scale-110 hover:bg-[#5e5496] shadow-lg hover:shadow-2xl"
    >
      {text}
    </button>
  );
};

export default SubmitButton;
