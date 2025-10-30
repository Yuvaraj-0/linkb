import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  getPostsByUserAPI,
  deletePostAPI,
  updatePostAPI,
} from "../api/postAPI";
import { getProfileById, deleteProfile } from "../api/profileAPI";
import EditProfile from "../components/EditProfile";

const Profile = () => {
  const { user, token, logout } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [showEditProfile, setShowEditProfile] = useState(false);
  const navigate = useNavigate();

  // 📡 Fetch profile + posts
useEffect(() => {
  if (!user?._id || !token) return;

  const fetchProfile = async () => {
    try {
      const profileData = await getProfileById(user._id, token);
      setProfile(profileData.profile);
    } catch (error) {
      console.error("❌ Error fetching profile:", error);
    }
  };

  const fetchPosts = async () => {
    try {
      const postsData = await getPostsByUserAPI(user._id, token);
      setPosts(postsData);
    } catch (error) {
      console.error("❌ Error fetching posts:", error);
    }
  };

  fetchProfile();
  fetchPosts();
}, [user, token]);
const handleProfileSave = async (updatedProfile) => {
  setProfile(updatedProfile.profile || updatedProfile);
  setShowEditProfile(false);

  // 🔄 Re-fetch posts after profile edit
  try {
    const postsData = await getPostsByUserAPI(user._id, token);
    setPosts(postsData);
  } catch (error) {
    console.error("❌ Error refetching posts:", error);
  }
};

  // 🗑️ Delete Post
  const handleDeletePost = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await deletePostAPI(postId, token);
      setPosts(posts.filter((p) => p._id !== postId));
    } catch (error) {
      console.error("❌ Error deleting post:", error);
    }
  };

  // ✏️ Edit Post
  const handleEdit = (post) => {
    setEditingPostId(post._id);
    setEditContent(post.content);
  };
  // 🧾 Handle saving updated profile data
  const handleProfileSave = (updatedProfile) => {
    setProfile(updatedProfile.profile || updatedProfile);
    setShowEditProfile(false);
  };
  

  // 💾 Save Post
  const handleSave = async () => {
    try {
      const updated = await updatePostAPI(editingPostId, editContent, token);
      setPosts(posts.map((p) =>
        p._id === editingPostId ? { ...p, content: updated.content } : p
      ));
      setEditingPostId(null);
      setEditContent("");
    } catch (error) {
      console.error("❌ Error updating post:", error);
    }
  };

  // ❌ Delete Profile
  const handleDeleteProfile = async () => {
    if (!window.confirm("Are you sure you want to delete your profile?")) return;
    try {
      await deleteProfile(profile._id, token);
      alert("Profile deleted successfully!");
      setProfile(null);
    } catch (error) {
      console.error("❌ Error deleting profile:", error);
    }
  };

  // 🔒 Logout
  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

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

  return (
    <div className="relative p-6 flex flex-col items-center bg-gray-50 min-h-screen">
      {/* 🔒 Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
      >
        🚪 Logout
      </button>

      {/* 🧍‍♂️ Profile Section */}
      <div className="bg-white shadow-md rounded-2xl p-6 w-full md:w-1/2 text-center mb-8">
        <h2 className="text-2xl font-semibold mb-3">{user?.name}</h2>
        <p className="text-gray-600 mb-1">📧 {user?.email}</p>
        {profile ? (
          <>
            <p className="text-gray-700 mt-2">🎓 {profile.degree}</p>
            <p className="text-gray-700">💼 {profile.skills}</p>
            <p className="text-gray-700">📍 {profile.address}</p>
          </>
        ) : (
          <p className="text-gray-500">No profile info yet.</p>
        )}

        <div className="mt-4 flex justify-center gap-4">
          <button
            onClick={() => setShowEditProfile(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            ✏️ Edit Profile
          </button>

          {profile && (
            <button
              onClick={handleDeleteProfile}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              🗑️ Delete Profile
            </button>
          )}
        </div>
      </div>

      {/* 🧩 User's Posts */}
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
                    onClick={() => handleDeletePost(post._id)}
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

      {/* ✏️ Edit Profile Popup */}
      {showEditProfile && (
        <EditProfile
          onClose={() => setShowEditProfile(false)}
          onSave={handleProfileSave}
        />
      )}
    </div>
  );
};

export default Profile;
