import React from "react";
import { useParams } from "react-router-dom";

const PostView = () => {
  const { postId } = useParams();

  const baseUrl = "https://linkb-git-main-yuvaraj-0s-projects.vercel.app"; // ✅ your live domain
  const postUrl = `${baseUrl}/post/${postId}`;

  const encodedUrl = encodeURIComponent(postUrl);
  const encodedTitle = encodeURIComponent("Check out this post on LinkB!");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(postUrl);
    alert("✅ Link copied to clipboard!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm text-center">
        <h2 className="text-xl font-semibold mb-3">Share This Post</h2>

        <input
          type="text"
          value={postUrl}
          readOnly
          onClick={(e) => e.target.select()}
          className="border w-full rounded-lg p-2 text-center mb-3 text-gray-700"
        />

        <button
          onClick={copyToClipboard}
          className="w-full bg-blue-500 text-white py-2 rounded-lg mb-3 hover:bg-blue-600"
        >
          Copy Link
        </button>

        <div className="flex flex-col gap-2">
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
      </div>
    </div>
  );
};

export default PostView
