const API_URL = "https://linkedin-nrom.onrender.com/api/profile";

// ✅ Create profile (with token)
export const createProfile = async (profileData, token) => {
  const res = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // 👈 include token
    },
    body: JSON.stringify(profileData),
  });

  if (!res.ok) throw new Error("Failed to create profile");
  return res.json();
};

// ✅ Get profile by ID
export const getProfileById = async (id, token) => {
  const res = await fetch(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
};

// ✅ Update profile
export const updateProfile = async (id, profileData, token) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });
  if (!res.ok) throw new Error("Failed to update profile");
  return res.json();
};

// ✅ Delete profile
export const deleteProfile = async (id, token) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to delete profile");
  return res.json();
};
