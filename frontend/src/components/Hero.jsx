import { AlertTriangle, BarChart3, PlayCircle, Shield, Zap, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import HeroImage from "../assets/hero-rockfall-bg.jpg"; // Your specified image path

// --- Updated Mock Button Component ---
// Now includes the 'geological' and 'alert' variants used in your code.
const Button = ({ children, variant, size, className, onClick }) => {
  const baseClasses = "inline-flex items-center justify-center font-semibold tracking-wide transition-all duration-300 transform rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background";
  
  const variants = {
    default: "bg-foreground text-background hover:bg-foreground/90 focus:ring-foreground",
    outline: "border-2 border-border bg-transparent hover:bg-foreground/10 hover:text-foreground focus:ring-foreground",
    geological: "bg-gradient-to-r from-amber-500 to-yellow-500 text-black hover:from-amber-400 hover:to-yellow-400 focus:ring-amber-500",
    alert: "border-2 border-red-500/80 text-red-400 bg-transparent hover:bg-red-500/10 hover:border-red-500 hover:text-red-300 focus:ring-red-500"
  };

  const sizes = {
    lg: "px-6 py-3 text-base md:px-8 md:py-4 md:text-lg"
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

  // Your stats data is preserved
  const stats = [
    { value: "97.82%", label: "Accuracy Rate", icon: <Eye size={28} /> },
    { value: "24/7", label: "Real-time Monitoring", icon: <Zap size={28} /> },
    { value: "Saving Life", label: "Lives Protected Daily", icon: <Shield size={28} /> }
  ];

  // Your logic for visibility and cycling stats is preserved
  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000); // Stat cycles every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="Home" className="relative min-h-screen flex items-center justify-center sm:justify-start text-center sm:text-left overflow-hidden bg-background">
      
      {/* --- Polished Background & Overlays --- */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[15s] ease-in-out hover:scale-105"
        style={{ backgroundImage: `url(${HeroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-background/20" />
        <div className="absolute inset-0 bg- /20 " />
      </div>

      {/* --- Content --- */}
      <div className="container mx-auto px-4 relative z-10 ml-[5rem]">
        <div className="max-w-3xl">

          {/* --- Main Heading --- */}
          <h1 
            className={`text-5xl md:text-7xl font-extrabold text-foreground mb-6 leading-tight tracking-tighter transform transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
          >
            <span className="block text-orange-400/75 leading-[2.5rem]">Next-Generation</span>
            <span className="block bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
              Rockfall Prediction
            </span>
          </h1>

          {/* --- Description --- */}
          <p className={`text-lg md:text-xl text-muted-foreground text-white mb-10 max-w-2xl leading-relaxed transform transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Harnessing AI to predict landslides, prevent disasters, and safeguard communities with real-time alerts and comprehensive risk assessment.
          </p>

          {/* --- Stats Section --- */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 transform transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`group rounded-xl p-4 border border-border bg-card/60 backdrop-blur-lg transition-all duration-300 hover:border-amber-400/50 hover:scale-105 hover:bg-card/80 ${
                  currentStat === index ? 'ring-2 ring-amber-400 shadow-xl shadow-amber-500/20' : 'ring-1 ring-transparent'
                }`}
              >
                <div className="flex flex-col items-center justify-center text-center h-full">
                  <div className="text-amber-400 mb-2 transition-transform duration-300 group-hover:-translate-y-1">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* --- CTA Buttons --- */}
          <div className={`flex flex-col sm:flex-row gap-4 transform transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Button
              variant="geological"
              size="lg"
              className="group w-full sm:w-auto shadow-lg shadow-amber-500/20 hover:shadow-xl hover:shadow-amber-500/30 hover:-translate-y-1"
              onClick={() => window.location.href = '/dashboard'}
            >
              <BarChart3 className="h-5 w-5 mr-2 transition-transform duration-300 group-hover:rotate-12" />
              Access Dashboard
            </Button>
            
            <Button
              variant="alert"
              size="lg"
              className="group w-full sm:w-auto hover:-translate-y-1"
              onClick={() => document.getElementById('risk')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <AlertTriangle className="h-5 w-5 mr-2 transition-transform duration-300 group-hover:animate-ping" />
              Emergency Alerts
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="group w-full sm:w-auto text-foreground hover:border-foreground hover:-translate-y-1"
              onClick={() => window.location.href = '/demo'}
            >
              <PlayCircle className="h-5 w-5 mr-2 transition-transform duration-300 group-hover:scale-110" />
              Watch Demo
            </Button>
          </div>
        </div>
      </div>
      
      {/* --- Modern Scroll Down Indicator --- */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-xs font-mono tracking-widest text-foreground">SCROLL</span>
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-foreground/70 to-transparent animate-pulse" />
      </div>
    </section>
  );
};

export default Hero;