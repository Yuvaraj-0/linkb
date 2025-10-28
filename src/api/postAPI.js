// postAPI.js
const BASE_URL = "https://linkedin-nrom.onrender.com/api/posts";
import axios from "axios";
// export const createPost = async (content, token) => {
//   try {
//     const res = await fetch(`${BASE_URL}/post`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ content }),
//     });

//     const data = await res.json();
//     return data; // ✅ return full response
//   } catch (error) {
//     console.error("❌ Error in createPost API:", error);
//     throw error;
//   }
// };
// ✅ Create Post (with optional image)


export const createPost = async (content, imageFile, token) => {
  try {
    const formData = new FormData();
    formData.append("content", content);
    if (imageFile) formData.append("image", imageFile);

    const res = await fetch(`${BASE_URL}/postc`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // no 'Content-Type' for FormData
      },
      body: formData,
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("❌ Error in createPost API:", error);
    throw error;
  }
};


// export const getAllPosts = async (token) => {
//   try {
//     const res = await fetch(`${BASE_URL}/get`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const data = await res.json();
//     console.log("📥 Fetched Posts:", data);
//     return data; // expects array of posts
//   } catch (error) {
//     console.error("❌ Error fetching posts:", error);
//     throw error;
//   }
// };


// 🧠 Get Post by ID
export const getPostsByUserAPI = async (userId, token) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("📥 Fetched Posts by User:", response.data);
    return response.data.posts || []; // Array of posts
  } catch (error) {
    console.error("❌ Error fetching posts by user:", error);
    throw error.response?.data || { success: false, message: "Network error" };
  }
};

// 🟢 Fetch all posts (including image URLs)
export const getAllPosts = async (token) => {
  try {
    console.log("📡 Fetching posts...");

    const res = await fetch(`${BASE_URL}/get`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("❌ Fetch failed:", data);
      throw new Error(data.message || "Failed to fetch posts");
    }

    console.log("📥 Fetched Posts:", data.posts || data);
    return data.posts || []; // return the array safely
  } catch (error) {
    console.error("🔥 Error fetching posts:", error);
    throw error;
  }
};

export const likePost = async (postId, token) => {
  const res = await fetch(`${BASE_URL}/${postId}/like`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
};

export const commentPost = async (postId, text, token) => {
  const res = await fetch(`${BASE_URL}/${postId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ text }),
  });
  return await res.json();
};

export const getComments = async (postId, token) => {
  try {
    const res = await fetch(`${BASE_URL}/${postId}/comments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch comments");

    return data; // { success, comments, commentCount }
  } catch (error) {
    console.error("❌ Error fetching comments:", error);
    throw error;
  }
};


export const deletePostAPI = async (postId, token) => {
  await axios.delete(`${BASE_URL}/${postId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ✏️ Update post
export const updatePostAPI = async (postId, content, token) => {
  const res = await axios.put(
    `${BASE_URL}/${postId}`,
    { content },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};