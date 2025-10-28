import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.js";
import { useContext, useEffect, useState, useRef } from "react";

export default function Navbar() {
  const { user, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(user);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // ✅ Update when user changes
  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  // ✅ Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  if (loading) return null;

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand */}
        <Link to="/dashboard" className="text-2xl font-bold text-blue-600">
          Linked In
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          {!currentUser && (
            <NavLink to="/signin" className="text-gray-700 hover:text-blue-500">
              Sign In
            </NavLink>
          )}
        </div>

        {/* Right Side (User Info / Dropdown) */}
        {currentUser ? (
          <div className="relative" ref={dropdownRef}>
            {/* Profile Circle */}
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white font-semibold focus:outline-none"
            >
              {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : "U"}
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-3 text-sm text-gray-800 border-b border-gray-200">
                  <p className="font-medium">{currentUser.name}</p>
                  <p className="text-xs text-gray-500">{currentUser.email}</p>
                </div>

                <Link
                  to="/profile"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  View Profile
                </Link>

                <Link
                  to="/upload"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Upload Post
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <NavLink
            to="/signin"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign In
          </NavLink>
        )}
      </div>
    </nav>
  );
}
