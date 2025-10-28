import axios from "axios";
const API_URL = "https://linkedin-nrom.onrender.com/api/profile";

export const fetchProfile = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to load profile");
  return res.json();
};

export const uploadAvatarAPI = async (formData, token) => {
  console.log("hitted-->>")
  try {
    const response = await axios.put(`${API_URL}/upload`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("✅ Avatar Uploaded:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Avatar Upload Error:", error);
    throw error.response?.data || { message: "Upload failed" };
  }
};

export const updateProfile = async (profile) => {
  const res = await fetch(`${API_URL}/get`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profile),
  });
  if (!res.ok) throw new Error("Failed to update profile");
  return res.json();
};

export const toggleFollow = async (followerId) => {
  const res = await fetch(`${API_URL}/follow`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ followerId }),
  });
  if (!res.ok) throw new Error("Follow action failed");
  return res.json();
};
