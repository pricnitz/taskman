import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate(); // ✅ use hook at the top

  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <h1 
          className="text-2xl font-bold text-blue-600 cursor-pointer"
          onClick={() => navigate("/")} // click logo → home
        >
          MyLogo
        </h1>

        {/* Auth Buttons */}
        <div className="flex space-x-4">
          <button
            className="border border-blue-600 text-blue-600 px-4 py-2 rounded-xl hover:bg-blue-50 transition-colors"
            onClick={() => navigate("/login")} // ✅ navigate to /login
          >
            Login
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
            onClick={() => navigate("/register")} // ✅ navigate to /register
          >
            Register
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
