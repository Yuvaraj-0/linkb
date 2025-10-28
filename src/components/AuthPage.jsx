import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signInUser, signUpUser } from "../api/authAPI";
import { AuthContext } from "../context/AuthContext"; // ✅ import context

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // ✅ use login() from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const apiCall = isSignUp ? signUpUser : signInUser;
      const data = await apiCall(form);

      console.log("✅ Server response:", data);

      if (data?.token && data?.user) {
        // ✅ Update context + localStorage instantly
        login(data.user, data.token);

        console.log("🎯 Logged in and context updated!");
        navigate("/dashboard"); // instant navbar update!
      } else {
        alert(data.message || "Authentication failed");
      }
    } catch (err) {
      console.error("❌ Server error:", err);
      alert("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8 transition-all duration-300">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          {isSignUp ? "Create Account" : "Welcome Back"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Please wait..." : isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-600">
          {isSignUp ? "Already have an account?" : "Don’t have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-indigo-600 font-medium hover:underline"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}
