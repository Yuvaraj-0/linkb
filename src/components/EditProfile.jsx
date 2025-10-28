import React, { useState } from "react";

export default function EditProfile({ profile, onSave }) {
  const [form, setForm] = useState({
    name: profile?.name || "",
    degree: profile?.degree || "",
    skills: profile?.skills || "",
    address: profile?.address || "",
    email: profile?.email || "",
    portfolio: profile?.portfolio || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/profile/${profile._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      onSave(data); // update parent state
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-6 mt-10 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Edit Profile</h2>

      <div className="grid grid-cols-1 gap-4">
        {["name", "degree", "skills", "address", "email", "portfolio"].map((field) => (
          <div key={field} className="flex flex-col">
            <label className="capitalize font-medium mb-1">{field}</label>
            <input
              type="text"
              name={field}
              value={form[field]}
              onChange={handleChange}
              placeholder={`Enter your ${field}`}
              className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
