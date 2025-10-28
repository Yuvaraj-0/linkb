

const API_URL = "https://linkedin-nrom.onrender.com/api/profile";

// ✅ Get user profile by ID (Public)
export const getUserById = async (userId) => {
    const res = await fetch(`${API_URL}/${userId}`);
    if (!res.ok) throw new Error("Failed to fetch user profile");
    return res.json();
  };