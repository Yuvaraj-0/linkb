import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 text-center px-4">
      <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-6">
        Welcome to <span className="text-blue-600">YourApp</span>
      </h1>
      <p className="text-gray-600 text-lg md:text-xl mb-10 max-w-xl">
        Join us and start your journey — Sign in or Sign up to get started.
      </p>

      <Link
        to="/signin"
        className="bg-blue-600 text-white px-8 py-4 rounded-2xl shadow-lg hover:bg-blue-700 hover:scale-105 transition-all duration-300 text-lg font-semibold"
      >
        Sign In / Sign Up
      </Link>

      <footer className="absolute bottom-6 text-gray-500 text-sm">
        © {new Date().getFullYear()} YourApp. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
