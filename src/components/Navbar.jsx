import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="flex justify-between items-center px-6 py-3 md:px-10">
        {/* ✅ Left Section — Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-800">
          LinkB
        </Link>

        {/* ✅ Center Section — Search (Always Visible) */}
        <div className="flex-1 flex justify-center px-3">
          <input
            type="text"
            placeholder="Search..."
            className="w-full max-w-xs md:max-w-sm lg:max-w-md border rounded-full px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* ✅ Right Section — Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/dashboard" className="hover:text-blue-500 font-medium">
            Dashboard
          </Link>
          <Link to="/profile" className="hover:text-blue-500 font-medium">
            Profile
          </Link>
          <Link to="/about" className="hover:text-blue-500 font-medium">
            About
          </Link>
        </div>

        {/* ✅ Mobile Menu Button */}
        <button
          className="md:hidden text-gray-800"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* ✅ Mobile Menu Dropdown */}
      {open && (
        <div className="flex flex-col bg-white shadow-md md:hidden px-6 py-4 gap-3">
          <Link
            to="/dashboard"
            onClick={() => setOpen(false)}
            className="hover:text-blue-500"
          >
            Dashboard
          </Link>
          <Link
            to="/profile"
            onClick={() => setOpen(false)}
            className="hover:text-blue-500"
          >
            Profile
          </Link>
          <Link
            to="/about"
            onClick={() => setOpen(false)}
            className="hover:text-blue-500"
          >
            About
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
