import React from 'react';

export const Footer = () => {
  return (
    <footer id='contacts' className="bg-gray-900 text-white ">
      <div className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-start mt-12">
        {/* Left Section - Project Info */}
        <div>
          <h1 className="text-2xl font-bold mb-2">RockFall Predictor</h1>
          <p className="text-gray-400 max-w-xs">
            Leveraging AI  to predict rockfall hazards and ensure safer terrains.
          </p>
        </div>

        {/* Middle Section - Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Quick Links</h2>
          <ul className="space-y-1">
            <li><a href="#home" className="hover:text-gray-300 transition">Home</a></li>
            <li><a href="#features" className="hover:text-gray-300 transition">Features</a></li>
            <li><a href="#how-it-works" className="hover:text-gray-300 transition">How it Works</a></li>
            <li><a href="#dashboard" className="hover:text-gray-300 transition">Dashboard</a></li>
            <li><a href="#contact" className="hover:text-gray-300 transition">Contact</a></li>
          </ul>
        </div>

        {/* Right Section - Contact Info */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Contact</h2>
          <p className="text-gray-400">Email: info@rockfallpredictor.com</p>
          <p className="text-gray-400">Phone: +91 98765 XXXXX</p>
          <div className="flex gap-3 mt-2">
            <a  className="hover:text-gray-300 transition">Twitter</a>
            <a className="hover:text-gray-300 transition">LinkedIn</a>
            <a className="hover:text-gray-300 transition">GitHub</a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-gray-800 text-gray-400 text-center py-4 mt-6">
        © 2025 RockFall Predictor. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
