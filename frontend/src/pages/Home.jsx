// src/pages/Home.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Features from '../components/Features';
import RiskZones from '../components/RiskZones';

const Home = () => {
    const goToInput = () => {
    navigate('/input'); // route to Input page
  };
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <Features /> 
      <RiskZones />
      <Footer />
    </div>
  );
};

export default Home;
