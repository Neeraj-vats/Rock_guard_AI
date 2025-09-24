import React from "react";
import { Link } from "react-router-dom"; // ✅ import Link
import Button from "./ui/Button";

export const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white fixed w-full top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo with Gradient */}
        <Link to="/">
          <h1 className="text-3xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-orange-300 to-yellow-200 bg-clip-text text-transparent">
              Rockfall Predictor
            </span>
          </h1>
        </Link>

        <ul className="flex gap-8 items-center">
          {/* ✅ Use Link for routes */}
          <li>
            <a
            to="/"
            
              href="/"
              className="font-medium hover:text-orange-400 transition-colors duration-300"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#features"
              className="font-medium hover:text-orange-400 transition-colors duration-300"
            >
              Features
            </a>
          </li>
          <li>
            <Link
              href="#"
              className="font-medium hover:text-orange-400 transition-colors duration-300"
            >
              Results
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard"
              className="font-medium hover:text-orange-400 transition-colors duration-300"
            >
              Dashboard
            </Link>
          </li>

          {/* ✅ Route to Analyze page */}
          <li>
            <Link
              to="/analyze"
              className="font-medium hover:text-orange-400 transition-colors duration-300"
            >
              Analyze
            </Link>
          </li>

          <li>
            <a
              href="#contacts"
              className="font-medium hover:text-orange-400 transition-colors duration-300"
            >
              Contact
            </a>
          </li>
          <li>
            <a href="#risk" className="text-lg font-semibold bg-gradient-to-r from-red-500 to-yellow-400 text-white hover:from-red-600 hover:to-yellow-500 transition-colors px-6 rounded-2xl py-3">
              Alerts
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
