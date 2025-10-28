

const API_URL = "https://linkedin-nrom.onrender.com/api/profile";
import axios from "axios";
// ✅ Get user profile by ID (Public)
export const getUserById = async (userId) => {
    const res = await fetch(`${API_URL}/${userId}`);
    if (!res.ok) throw new Error("Failed to fetch user profile");
    return res.json();
  };

  export const searchUsers = async (query) => {
    const res = await axios.get(`${API_URL}/search?query=${query}`);
    return res.data;
  };