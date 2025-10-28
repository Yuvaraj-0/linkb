import React, { useState } from "react";

const ShareButtons = ({ postId, postTitle }) => {
  const [open, setOpen] = useState(false);

  // 🧠 Create the actual post URL dynamically using your deployed domain
  const postUrl = `https://linkb-git-main-yuvaraj-0s-projects.vercel.app/post/${postId}`; // change to your actual domain
  const encodedUrl = encodeURIComponent(postUrl);
  const encodedTitle = encodeURIComponent(postTitle || "Check this post!");

  return (
    <div className="relative">
      {/* Share button */}
      <button
        onClick={() => setOpen(!open)}
        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 font-medium transition"
      >
        🔗 Share
      </button>

      {/* Popup options */}
      {open && (
        <div className="absolute top-10 left-0 bg-white shadow-lg border rounded-xl p-3 flex flex-col gap-2 z-10 w-40">
          <a
            href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:underline"
          >
            WhatsApp
          </a>

          <a
            href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Twitter / X
          </a>

          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Facebook
          </a>

          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:underline"
          >
            LinkedIn
          </a>
        </div>
      )}
    </div>
  );
};

export default ShareButtons;
