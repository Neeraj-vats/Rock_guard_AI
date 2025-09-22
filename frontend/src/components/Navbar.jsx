import React from 'react';
import  Button  from './ui/button';

export const Navbar = () => {
    return (
        <nav className="bg-gray-900 text-white fixed w-full top-0 z-50 shadow-md">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo with Gradient */}
                <a href="#home">
                    <h1 className="text-3xl font-extrabold tracking-tight">
                        <span className="bg-gradient-to-r from-orange-300 to-yellow-200 bg-clip-text text-transparent">
                            Rockfall Predictor
                        </span>
                    </h1>
                </a>
                <ul className="flex gap-8 items-center">
                    <li><a href="#home" className="font-medium hover:text-orange-400 transition-colors duration-300">Home</a></li>
                    <li><a href="#features" className="font-medium hover:text-orange-400 transition-colors duration-300">Features</a></li>
                    <li><a href="#how-it-works" className="font-medium hover:text-orange-400 transition-colors duration-300">How it Works</a></li>
                    <li><a href="#dashboard" className="font-medium hover:text-orange-400 transition-colors duration-300">Dashboard</a></li>
                    <li><a href="#contact" className="font-medium hover:text-orange-400 transition-colors duration-300">Contact</a></li>
                    <li>
                        <Button
                            className="text-lg font-semibold bg-gradient-to-r from-red-500 to-yellow-400 text-white hover:from-red-600 hover:to-yellow-500 transition-colors px-6 py-3"
                        >
                            Alerts
                        </Button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;