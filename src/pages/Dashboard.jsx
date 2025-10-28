import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getAllPosts, likePost } from "../api/postAPI";
import { Link } from "react-router-dom";
import CommentPopup from "../components/CommentPopup";
import ShareButtons from "../components/ShareButtons";

const Dashboard = () => {
  const { user, token } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
 

  // 📡 Fetch all posts after login
  useEffect(() => {
    
  
    if (!token) return;
    const fetchPosts = async () => {
      try {
        const data = await getAllPosts(token);
        setPosts(data.posts || data || []);
      } catch (err) {
        console.error("❌ Error loading posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [token]);

  // ❤️ Like / Unlike handler
  const handleLike = async (postId) => {
    try {
      const res = await likePost(postId, token);
      if (res.success) {
        setPosts((prev) =>
          prev.map((p) =>
            p._id === postId
              ? { ...p, likeCount: res.likeCount, liked: res.liked }
              : p
          )
        );
      }
    } catch (err) {
      console.error("❌ Error liking post:", err);
    }
  };

  // ⚡ Animated Loading Spinner
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-full bg-transparent">
        <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-blue-500 font-semibold text-lg animate-pulse">
          Loading your feed...
        </p>
      </div>
    );
  }

  // 🏠 Main Dashboard
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row justify-center items-start p-4 md:p-6 gap-6">
      {/* 👤 Left Sidebar - User Info */}
      <div className="bg-white shadow-md rounded-2xl p-4 w-full md:w-1/4 text-center md:sticky md:top-24 h-fit">
        <Link to="/profile">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt="User Avatar"
              className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-blue-500 mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
          )}
        </Link>

        <h3 className="font-semibold text-lg">{user?.name || "Guest User"}</h3>
        <p className="text-sm text-gray-500 mb-3">
          {user?.email || "No email available"}
        </p>
        <Link to="/upload" className="text-blue-600 font-medium hover:underline">
          ➕ Upload a Post
        </Link>
      </div>

      {/* 📰 Posts Feed */}
      <div className="bg-white shadow-md rounded-2xl p-4 md:p-6 w-full md:w-2/4">
        <h2 className="text-xl font-semibold mb-4">All Posts</h2>

        <div className="space-y-6">
          {posts.length === 0 ? (
            <p className="text-gray-500 text-center">No posts yet 💤</p>
          ) : (
            posts.map((post) => (
              <div
                key={post._id}
                className="border border-gray-200 rounded-2xl bg-white shadow-sm"
              >
                {/* 👤 Post Header */}
                <div className="flex items-center gap-3 p-4">
                  <Link
                    to={`/profile/${post.user?._id}`}
                    className="flex items-center gap-3"
                  >
                    {post.user?.avatar ? (
                      <img
                        src={post.user.avatar}
                        alt="User Avatar"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                        {post.user?.name
                          ? post.user.name.charAt(0).toUpperCase()
                          : "U"}
                      </div>
                    )}
                  </Link>

                  <div>
                    <Link to={`/profile/${post.user?._id}`}>
                      <p className="font-semibold text-gray-800 hover:underline">
                        {post.user?.name || "Anonymous"}
                      </p>
                    </Link>
                    <p className="text-xs text-gray-500">
                      {new Date(post.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* 📝 Post Content */}
                <div className="p-4">
                  <p className="text-gray-800 mb-3">{post.content}</p>

                  {post.image && (
                    <div className="w-full mt-3">
                      <img
                        src={post.image}
                        alt="Post Image"
                        className="w-full h-auto rounded-xl shadow-md"
                      />
                    </div>
                  )}
                </div>

                {/* ❤️ Like | 💬 Comment | 📤 Share */}
                <div className="flex justify-between items-center px-4 pb-3 border-t border-gray-200">
                  <button
                    onClick={() => handleLike(post._id)}
                    className={`flex items-center gap-1 transition ${
                      post.liked
                        ? "text-red-500"
                        : "text-gray-600 hover:text-red-500"
                    }`}
                  >
                    ❤️ <span>{post.likeCount || 0}</span>
                  </button>

                  <CommentPopup postId={post._id} token={token} />

                  <ShareButtons postId={post._id} postTitle={post.content.slice(0, 50)} />

                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
