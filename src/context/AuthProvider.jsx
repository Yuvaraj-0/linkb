// /* eslint-disable react-refresh/only-export-components */
import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // 👈 added to track auth initialization

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
        console.log("✅ Auth loaded from localStorage");
      } catch (err) {
        console.error("❌ Error parsing user from storage:", err);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
    setLoading(false); // ✅ mark as done loading
  }, []);

  const login = (userData, tokenData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", tokenData);
    setUser(userData); // ✅ triggers re-render immediately
    setToken(tokenData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {!loading && children} {/* ✅ Prevents flashing or blank user before loaded */}
    </AuthContext.Provider>
  );
};
