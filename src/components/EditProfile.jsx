import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  createProfile,
  updateProfile,
  deleteProfile,
} from "../api/profileAPI";

const EditProfile = ({ onClose, onSave, existingProfile }) => {
  const { token, user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: existingProfile?.name || user?.name || "",
    degree: existingProfile?.degree || "",
    skills: existingProfile?.skills || "",
    address: existingProfile?.address || "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // ✅ Create or Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = existingProfile
        ? await updateProfile(existingProfile._id, formData, token)
        : await createProfile(formData, token);

      onSave(response);
      onClose(); // close popup
    } catch (error) {
      console.error("❌ Error saving profile:", error);
    }
  };

  // 🗑️ Delete Profile
  const handleDelete = async () => {
    if (!existingProfile?._id) return alert("No profile to delete!");
    if (!window.confirm("Are you sure you want to delete your profile?")) return;
    try {
      await deleteProfile(existingProfile._id, token);
      onSave({ profile: null }); // remove profile from UI
      onClose();
    } catch (error) {
      console.error("❌ Error deleting profile:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          {existingProfile ? "Edit Profile" : "Create Profile"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
          <input
            name="degree"
            placeholder="Your Degree"
            value={formData.degree}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
          <input
            name="skills"
            placeholder="Your Skills"
            value={formData.skills}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
          <input
            name="address"
            placeholder="Your Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
            >
              Cancel
            </button>

            {existingProfile && (
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            )}

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              {existingProfile ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
