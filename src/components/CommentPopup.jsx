import React, { useState, useEffect } from "react";
import { commentPost, getComments } from "../api/postAPI";

const CommentPopup = ({ postId, token }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false); // 🔄 Loading state

  // 🔄 Fetch all comments
  const loadComments = async () => {
    try {
      setLoading(true);
      const res = await getComments(postId, token);
      if (res.success) setComments(res.comments);
      else setComments([]);
    } catch (err) {
      console.error("❌ Error fetching comments:", err);
    } finally {
      setLoading(false);
    }
  };

  // 💬 Add new comment
  const handleComment = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await commentPost(postId, text, token);
    setText("");
    loadComments();
  };

  // 🔍 Load comments when popup opens
  useEffect(() => {
    if (showPopup) loadComments();
  }, [showPopup]);

  return (
    <>
      {/* 💬 Button to open popup */}
      <button
        onClick={() => setShowPopup(true)}
        className="flex items-center gap-1 text-gray-600 hover:text-blue-500 transition"
      >
        💬 <span>Comment</span>
      </button>

      {/* 🪟 Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-5 w-full max-w-sm shadow-xl relative">
            {/* ❌ Close button */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-800"
            >
              ✖
            </button>

            <h2 className="text-lg font-semibold mb-3 text-center md:text-left">
              Comments
            </h2>

            {/* 💫 Loader or Comments List */}
            <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-2 mb-3">
              {loading ? (
                <div className="flex justify-center items-center py-8">
                  {/* Animated Dots Loader */}
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-150"></div>
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-300"></div>
                  </div>
                </div>
              ) : comments.length === 0 ? (
                <p className="text-sm text-gray-500 text-center">
                  No comments yet 💤
                </p>
              ) : (
                comments.map((c, i) => (
                  <div
                    key={i}
                    className="p-2 border-b border-gray-100 text-sm md:text-base"
                  >
                    <strong>{c.user?.username || "Anonymous"}:</strong> {c.text}
                  </div>
                ))
              )}
            </div>

            {/* ✍️ Input Bar */}
            <form
              onSubmit={handleComment}
              className="flex gap-2 flex-col sm:flex-row"
            >
              <input
                type="text"
                placeholder="Write a comment..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="flex-1 border rounded-lg px-3 py-2 text-sm"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CommentPopup;
