// src/pages/Home.jsx
//import React from 'react';
import React, { useEffect } from "react";

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Features from '../components/Features';
import RiskZones from '../components/RiskZones';
import ModelAccuracy from '../components/Accuracy';

const Home = () => {
    const goToInput = () => {
    navigate('/input'); // route to Input page
  };
   useEffect(() => {
    if (localStorage.getItem("scrollToContacts") === "true") {
      localStorage.removeItem("scrollToContacts");
      setTimeout(() => {
        const target = document.getElementById("contacts");
        if (target) target.scrollIntoView({ behavior: "smooth" });
      }, 300); // delay so page loads before scrolling
    }
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <Features /> 
      <ModelAccuracy/>
      <RiskZones />
      <Footer />
    </div>
  );
};

export default Home;
