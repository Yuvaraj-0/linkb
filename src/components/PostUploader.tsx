import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { createPost } from "../api/postAPI";

const PostUploader = ({ onPostCreated }) => {
  const { user, token } = useContext(AuthContext);
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handlePost = async () => {
    if (!content.trim() && !image) return alert("Please add content or an image!");

    setLoading(true);
    try {
      const data = await createPost(content, image, token);

      if (data?.success) {
        alert("✅ Post uploaded successfully!");
        setContent("");
        setImage(null);
        setPreview("");
        if (onPostCreated) onPostCreated(data.post);
      } else {
        alert(data?.message || "Failed to upload post");
      }
    } catch (err) {
      console.error("❌ Error creating post:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-6">
      <div className="flex items-center mb-4">
        
        <span className="font-medium text-gray-800">
          {user?.name || "User"}
        </span>
      </div>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Share your thoughts or updates..."
        className="w-full h-32 border border-gray-300 rounded-lg p-3 mb-3 focus:outline-blue-500"
      />

      {/* ✅ Image Upload & Preview */}
      <div className="mb-3">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-2"
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border"
          />
        )}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handlePost}
          disabled={loading}
          className={`px-4 py-2 rounded-lg text-white transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
};

export default PostUploader;
