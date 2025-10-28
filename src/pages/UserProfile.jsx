import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../api/userAPI";
import { getPostsByUserAPI } from "../api/postAPI";

const UserProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserById(id);
        setProfile(userData.user || userData);
        setAvatarPreview(userData.user?.avatar || userData.avatar);

        const postsData = await getPostsByUserAPI(id);
        setPosts(postsData);
      } catch (error) {
        console.error("❌ Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 font-medium animate-pulse">
          Loading profile...
        </p>
      </div>
    );

  return (
    <div className="p-6 flex flex-col items-center bg-gray-50 min-h-screen">
      {/* 🧍 User Profile Info */}
      <div className="bg-white shadow-md rounded-2xl p-6 w-full md:w-1/3 text-center mb-6">
        <div className="w-24 h-24 mx-auto mb-4">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              alt="User Avatar"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-200 mx-auto"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl font-semibold mx-auto">
              {profile?.name ? profile.name.charAt(0).toUpperCase() : "U"}
            </div>
          )}
        </div>

        <h3 className="font-semibold text-xl text-gray-800">
          {profile?.name || "Unknown User"}
        </h3>
        <p className="text-gray-500 text-sm mb-2">{profile?.email}</p>
      </div>

      {/* 🧩 Posts Section */}
      <div className="w-full md:w-3/4">
        <h2 className="text-2xl font-semibold mb-5 text-center">
          {profile?.name}'s Posts
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
                <h3 className="font-semibold text-lg text-gray-800 mb-1">
                  {post.content?.split("\n")[0].slice(0, 80) || "Untitled Post"}
                </h3>
                <div className="text-sm text-gray-500 flex justify-between mt-2">
                  <span>❤️ {post.likes?.length || 0} Likes</span>
                  <span>📅 {new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
