import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  getComments,
  commentPost,
  likePost,
  getAllPosts,
} from "../api/postAPI";
import ShareButtons from "../components/ShareButtons";

const PostView = () => {
  const { id } = useParams(); // 🆔 post ID from URL
  const { user } = useContext(AuthContext); // ✅ Access logged-in user & token
  const token = user?.token;

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Fetch post details
  useEffect(() => {
    const fetchPost = async () => {
      if (!token) return;
      const allPosts = await getAllPosts(token);
      const selectedPost = allPosts.find((p) => p._id === id);
      setPost(selectedPost);
    };
    fetchPost();
  }, [id, token]);

  // Fetch comments
  useEffect(() => {
    const loadComments = async () => {
      if (!id || !token) return;
      const res = await getComments(id, token);
      setComments(res.comments || []);
    };
    loadComments();
  }, [id, token]);

  const handleComment = async () => {
    if (!newComment.trim()) return;
    await commentPost(id, newComment, token);
    setNewComment("");
    const updated = await getComments(id, token);
    setComments(updated.comments);
  };

  const handleLike = async () => {
    const res = await likePost(id, token);
    setPost({ ...post, likes: res.updatedLikes });
  };

  if (!post) return <div className="p-5 text-center">Loading post...</div>;

  const postUrl = `${window.location.origin}/post/${post._id}`;

  return (
    <div className="max-w-2xl mx-auto mt-6 bg-white shadow-md rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-2">{post.user?.name}</h2>
      <p className="text-gray-800 mb-4">{post.content}</p>

      {post.image && (
        <img
          src={post.image}
          alt="Post"
          className="rounded-lg mb-4 w-full object-cover"
        />
      )}

      <div className="flex items-center gap-4">
        <button
          onClick={handleLike}
          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg"
        >
          👍 {post.likes?.length || 0} Likes
        </button>

        <ShareButtons postUrl={postUrl} postTitle={post.content} />
      </div>

      {/* Comments Section */}
      <div className="mt-5 border-t pt-4">
        <h3 className="font-semibold mb-3">Comments ({comments.length})</h3>

        <div className="flex gap-2 mb-3">
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 border rounded-lg p-2"
          />
          <button
            onClick={handleComment}
            className="bg-blue-500 text-white px-3 rounded-lg"
          >
            Post
          </button>
        </div>

        {comments.map((c) => (
          <div key={c._id} className="mb-2 border-b pb-2">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">{c.user?.name}</span>: {c.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostView;
