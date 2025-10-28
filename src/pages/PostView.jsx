import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostByIdAPI } from "../api/postAPI";

const PostView = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await getPostByIdAPI(id, token);
        setPost(data);
      } catch (error) {
        console.error("❌ Error loading post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Post not found 😢</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-3">{post.user?.name || "User"}</h2>
      <p className="mb-3">{post.content}</p>
      {post.image && (
        <img
          src={post.image}
          alt="Post"
          className="w-full rounded-xl mb-4 shadow-md"
        />
      )}
    </div>
  );
};

export default PostView;
