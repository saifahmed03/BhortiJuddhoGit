// src/components/Navbar.jsx
import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full fixed top-0 z-50 bg-[#0E0E14]/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-3 items-center h-16 w-full">

          {/* LEFT: Logo */}
          <div className="col-span-1 flex items-center">
            <img src="/logo.png" alt="Logo" className="h-10 mr-3" />
            <span className="text-white text-lg font-semibold">Bhortijuddho</span>
          </div>

          {/* CENTER: Nav links - exact center column */}
          <div className="col-span-1 justify-self-center hidden md:flex items-center gap-6">
            <a href="/" className="text-gray-300 hover:text-white transition font-medium no-underline">Home</a>
            <a href="/student/dashboard" className="text-gray-300 hover:text-white transition font-medium no-underline">Dashboard</a>
            <a href="/admin" className="text-gray-300 hover:text-white transition font-medium no-underline">Admin</a>
          </div>

          {/* RIGHT: Auth buttons */}
          <div className="col-span-1 flex items-center justify-end gap-4">
            <a
              href="/auth/login"
              className="px-4 py-2 border border-gray-600 text-gray-200 rounded-lg hover:bg-white/5 transition no-underline"
            >
              Sign In
            </a>

            <a
              href="/auth/signup"
              className="px-4 py-2 bg-gradient-to-r from-[#FF4FD2] via-[#4F9CFF] to-[#C5FF66] text-black font-semibold rounded-lg shadow-lg hover:opacity-90 transition no-underline"
            >
              Sign Up
            </a>
          </div>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;
