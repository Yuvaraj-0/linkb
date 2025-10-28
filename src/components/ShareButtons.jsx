import React from "react";
import { useNavigate } from "react-router-dom";

const ShareButtons = ({ postId }) => {
  const navigate = useNavigate();

  const handleShareClick = () => {
    navigate(`/share/${postId}`);
  };

  return (
    <button
      onClick={handleShareClick}
      className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 font-medium transition"
    >
      🔗 Share
    </button>
  );
};

export default ShareButtons;
