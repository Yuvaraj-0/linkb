import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import {
  getPostsByUserAPI,
  deletePostAPI,
  updatePostAPI,
} from "../api/postAPI";
import { uploadAvatarAPI } from "../api/profileAPI"; // ✅ Avatar upload API

const Profile = () => {
  const { user, token, setUser } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // 🌀 Loading state
  const [editingPostId, setEditingPostId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || "");

  // 📡 Fetch user posts
  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!user?._id || !token) return;
      try {
        setLoading(true);
        const data = await getPostsByUserAPI(user._id, token);
        setPosts(data);
      } catch (error) {
        console.error("❌ Error fetching user posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserPosts();
  }, [user, token]);

  // 🖼️ Handle Avatar Upload
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewURL = URL.createObjectURL(file);
    setAvatarPreview(previewURL);

    try {
      const data = await uploadAvatarAPI(token, file);
      setUser({ ...user, avatar: data.avatar.avatarUrl });
      setAvatarPreview(data.avatar.avatarUrl);
      alert("✅ Avatar updated successfully!");
    } catch (error) {
      console.error("❌ Error uploading avatar:", error);
      alert("Failed to upload avatar");
    }
  };

  // 🗑️ Delete post
  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await deletePostAPI(postId, token);
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("❌ Error deleting post:", error);
    }
  };

  // ✏️ Start editing post
  const handleEdit = (post) => {
    setEditingPostId(post._id);
    setEditContent(post.content);
  };

  // 💾 Save updated post
  const handleSave = async () => {
    try {
      const updatedPost = await updatePostAPI(editingPostId, editContent, token);
      setPosts(
        posts.map((p) =>
          p._id === editingPostId ? { ...p, content: updatedPost.content } : p
        )
      );
      setEditingPostId(null);
      setEditContent("");
    } catch (error) {
      console.error("❌ Error updating post:", error);
    }
  };

  // 🌀 Show loading animation while fetching
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white">
        <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 font-medium animate-pulse">
          Loading your profile...
        </p>
      </div>
    );
  }

  // ✅ Main UI after loading
  return (
    <div className="p-6 flex flex-col items-center bg-gray-50 min-h-screen">
      {/* 🧍‍♂️ User Profile Card */}
      <div className="bg-white shadow-md rounded-2xl p-5 w-full md:w-1/3 text-center mb-6">
        <div className="relative w-24 h-24 mx-auto mb-4">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              alt="User Avatar"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl font-semibold">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
          )}

          <label
            htmlFor="avatarUpload"
            className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1 cursor-pointer hover:bg-blue-600"
          >
            ✏️
          </label>
          <input
            id="avatarUpload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>

        <h3 className="font-semibold text-xl">{user?.name || "Guest User"}</h3>
        <p className="text-sm text-gray-500 mb-3">
          {user?.email || "No email available"}
        </p>
        <Link to="/upload" className="text-blue-600 font-medium hover:underline">
          Upload a Post
        </Link>
      </div>

      {/* 🧩 User's Posts Section */}
      <div className="w-full md:w-3/4">
        <h2 className="text-2xl font-semibold mb-5 text-center">
          {user?.name}'s Posts
        </h2>

        {posts.length === 0 ? (
          <p className="text-gray-500 text-center">No posts yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white shadow rounded-xl p-3 hover:shadow-lg transition-all duration-200"
              >
                {post.image && (
                  <img
                    src={post.image}
                    alt="Post"
                    className="rounded-lg w-full h-48 object-cover mb-3"
                  />
                )}

                {editingPostId === post._id ? (
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="border rounded-lg w-full p-2 text-sm mb-2"
                  />
                ) : (
                  <h3 className="font-semibold text-lg text-gray-800 mb-1">
                    {post.content?.split("\n")[0].slice(0, 50) || "Untitled Post"}
                  </h3>
                )}

                <div className="text-sm text-gray-500 flex justify-between mt-2">
                  <span>❤️ {post.likes?.length || 0} Likes</span>
                  <span>📅 {new Date(post.createdAt).toLocaleDateString()}</span>
                </div>

                <div className="flex justify-end gap-2 mt-3">
                  {editingPostId === post._id ? (
                    <button
                      onClick={handleSave}
                      className="bg-green-500 text-white px-3 py-1 rounded-md text-sm hover:bg-green-600"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(post)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md text-sm hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
