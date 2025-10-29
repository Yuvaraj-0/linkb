const API_URL = "https://linkedin-nrom.onrender.com/api/user";
import axios from "axios";

// ✅ Get user profile by ID (Public)
export const getUserById = async (userId) => {
  console.log("📡 getUserById called with:", userId);
  try {
    const res = await fetch(`${API_URL}/profile/${userId}`);
    console.log("✅ Response status:", res.status);
    if (!res.ok) throw new Error("❌ Failed to fetch user profile");
    const data = await res.json();
    console.log("📦 Profile data received:", data);
    return data;
  } catch (error) {
    console.error("🔥 Error in getUserById:", error);
    throw error;
  }
};

// ✅ Search users
export const searchUsers = async (query) => {
  console.log("📡 searchUsers called with query:", query);
  try {
    const res = await axios.get(`${API_URL}/profile/search?query=${query}`);
    console.log("✅ searchUsers success:", res.data);
    return res.data;
  } catch (error) {
    console.error("🔥 Error in searchUsers:", error);
    throw error;
  }
};
