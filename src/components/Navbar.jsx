import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.js";
import { useContext, useEffect, useState, useRef } from "react";
import { Menu, X } from "lucide-react";
import SearchBar from "./SearchBar.jsx";

export default function Navbar() {
  const { user, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(user);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => setCurrentUser(user), [user]);

  useEffect(() => {
    const closeDropdown = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
    };
    document.addEventListener("mousedown", closeDropdown);
    return () => document.removeEventListener("mousedown", closeDropdown);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  if (loading) return null;

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/dashboard" className="text-2xl font-bold text-blue-600">
          LinkB
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <SearchBar />
          {!currentUser ? (
            <NavLink
              to="/signin"
              className="text-gray-700 hover:text-blue-500"
            >
              Sign In
            </NavLink>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white font-semibold focus:outline-none"
              >
                {currentUser.name
                  ? currentUser.name.charAt(0).toUpperCase()
                  : "U"}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-3 text-sm text-gray-800 border-b border-gray-200">
                    <p className="font-medium">{currentUser.name}</p>
                    <p className="text-xs text-gray-500">
                      {currentUser.email}
                    </p>
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
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-md">
          <div className="px-4 py-4 flex flex-col gap-3">
            <SearchBar />
            {!currentUser ? (
              <NavLink
                to="/signin"
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 hover:text-blue-500"
              >
                Sign In
              </NavLink>
            ) : (
              <>
                <p className="font-semibold text-gray-800">
                  {currentUser.name}
                </p>
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-700 hover:text-blue-500"
                >
                  View Profile
                </Link>
                <Link
                  to="/upload"
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-700 hover:text-blue-500"
                >
                  Upload Post
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="text-red-600 font-medium hover:underline"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
