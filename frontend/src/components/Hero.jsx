import { AlertTriangle, BarChart3, PlayCircle, Shield, Zap, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import HeroImage from "../assets/hero-rockfall1.png"; // Replace with your actual image path

// Mock Button component since we don't have the actual one
const Button = ({ children, variant, size, className, onClick }) => {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    default: "bg-white text-black hover:bg-gray-100 focus:ring-white",
    outline: "border-2 bg-transparent hover:bg-opacity-20 focus:ring-current"
  };
  const sizes = {
    lg: "px-8 py-4 text-lg rounded-xl"
  };
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant] || variants.default} ${sizes[size] || sizes.lg} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);

  const stats = [
    { value: "99.7%", label: "Accuracy Rate", icon: <Eye className="w-5 h-5" /> },
    { value: "24/7", label: "Real-time Monitoring", icon: <Zap className="w-5 h-5" /> },
    { value: "500+", label: "Lives Protected Daily", icon: <Shield className="w-5 h-5" /> }
  ];

  useEffect(() => {
    setIsVisible(true);
    
    // Cycle through stats
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);



  return (
    <section id="Home" className="relative min-h-screen  flex items-center overflow-hidden">
      {/* Animated Background */}
      <div
        className="absolute inset-0 bg-cover  bg-center bg-no-repeat transition-transform duration-[20s] hover:scale-105"
        style={{ backgroundImage: `url(${HeroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r  from-black/60 via-black/30 to-transparent" />
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 mt-[5.8rem]">
        <div className="max-w-4xl">
          {/* Alert Banner */}
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-500/20 border border-red-500/30 text-red-300 mb-6 backdrop-blur-sm">
              <AlertTriangle className="w-4 h-4 mr-2 animate-pulse" />
              <span className="text-sm font-medium">Critical Infrastructure Protection Active</span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className={`text-5xl md:text-7xl font-bold text-white mb-8 leading-tight transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <span className="block mb-2">
              Next-Gen
            </span>
            <span className="block bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-200 bg-clip-text text-transparent animate-pulse">
              Rockfall Prediction
            </span>
            <span className="block text-3xl md:text-4xl mt-4 text-gray-300 font-light">
              & Safety Monitoring
            </span>
          </h1>

          {/* Description */}
          <p className={`text-xl md:text-2xl text-gray-200 mb-12 leading-relaxed max-w-3xl transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            Harness the power of AI and real-time monitoring to predict landslides, 
            prevent disasters, and safeguard communities with precision alerts and 
            comprehensive risk assessment.
          </p>

          {/* Stats Section */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 transform transition-all duration-500 hover:scale-105 hover:bg-white/15 ${
                  currentStat === index ? 'ring-2 ring-amber-400 shadow-lg shadow-amber-400/20' : ''
                }`}
              >
                <div className="flex items-center justify-center mb-3">
                  <div className="text-amber-400">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-300">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-6 transform transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <Button
              variant="default"
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-semibold shadow-2xl shadow-amber-500/25 hover:shadow-amber-500/40 border-0"
              onClick={() => window.location.href = '/dashboard'}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              <div className="relative flex items-center">
                <BarChart3 className="h-6 w-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                Access Dashboard
              </div>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="group relative overflow-hidden border-2 border-red-500 text-red-400 hover:text-white hover:border-red-400 hover:shadow-lg hover:shadow-red-500/25"
              onClick={() => window.location.href = '/alerts'}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              <div className="relative flex items-center">
                <AlertTriangle className="h-6 w-6 mr-3 group-hover:animate-bounce" />
                Emergency Alerts
              </div>
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="group relative overflow-hidden border-2 border-white/30 text-white hover:text-black hover:border-white hover:shadow-lg hover:shadow-white/25"
              onClick={() => window.location.href = '/demo'}
            >
              <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              <div className="relative flex items-center">
                <PlayCircle className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
                Watch Demo
              </div>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className={`mt-16 flex flex-wrap items-center gap-8 text-gray-400 transform transition-all duration-1000 delay-1200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <span className="text-sm">Trusted by:</span>
            <div className="flex items-center gap-6 text-gray-300">
              <span className="font-semibold">Government Agencies</span>
              <span>•</span>
              <span className="font-semibold">Mining Companies</span>
              <span>•</span>
              <span className="font-semibold">Infrastructure Teams</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;