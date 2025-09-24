import { useState, useEffect, useRef } from "react";
import { Activity, AlertTriangle, MapPin, CloudRain, TrendingUp, Eye, Clock, ArrowRight } from "lucide-react";

// Mock components since we don't have the actual ones
const Card = ({ children, className }) => (
  <div className={`rounded-lg shadow-lg ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="p-6 pb-2">
    {children}
  </div>
);

const CardTitle = ({ children, className }) => (
  <h3 className={`font-semibold ${className}`}>
    {children}
  </h3>
);

const CardDescription = ({ children, className }) => (
  <p className={`text-sm ${className}`}>
    {children}
  </p>
);

const Badge = ({ children, className }) => (
  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${className}`}>
    {children}
  </span>
);

const Button = ({ children, variant, size, className, onClick }) => {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    outline: "border-2 bg-transparent hover:bg-opacity-20 focus:ring-current",
    default: "text-white focus:ring-white"
  };
  const sizes = {
    lg: "px-8 py-4 text-lg rounded-xl",
    default: "px-6 py-3 text-base rounded-lg"
  };
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant] || variants.default} ${sizes[size] || sizes.default} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const RiskZones = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);
  const [currentBadge, setCurrentBadge] = useState(0);
  const [pulsingZone, setPulsingZone] = useState(0);
  const sectionRef = useRef(null);

  const zones = [
    {
      name: "Zone A - North Slope",
      severity: "Critical Alert",
      probability: "85%",
      factors: "Heavy rainfall, high displacement readings",
      recommendation: "Immediate inspection and slope reinforcement needed",
      lastUpdate: "2 min ago",
      trend: "increasing",
      color: "bg-red-600",
      borderColor: "border-red-500",
      textColor: "text-red-400",
      bgGradient: "bg-gradient-to-br from-red-900/50 to-red-800/30"
    },
    {
      name: "Zone B - East Wall",
      severity: "Moderate Risk",
      probability: "60%",
      factors: "Moderate pore pressure, increasing strain",
      recommendation: "Increase monitoring frequency",
      lastUpdate: "5 min ago",
      trend: "stable",
      color: "bg-yellow-500",
      borderColor: "border-yellow-400",
      textColor: "text-yellow-400",
      bgGradient: "bg-gradient-to-br from-yellow-900/50 to-yellow-800/30"
    },
    {
      name: "Zone C - South Pit",
      severity: "Low Risk",
      probability: "25%",
      factors: "Stable conditions, minor vibrations",
      recommendation: "Routine monitoring",
      lastUpdate: "12 min ago",
      trend: "decreasing",
      color: "bg-green-500",
      borderColor: "border-green-400",
      textColor: "text-green-400",
      bgGradient: "bg-gradient-to-br from-green-900/50 to-green-800/30"
    }
  ];

  const badges = [
    { icon: <MapPin className="h-4 w-4" />, text: "Open-Pit Mine Site", subtext: "3.2 km²" },
    { icon: <CloudRain className="h-4 w-4" />, text: "Rainfall: 42mm", subtext: "Last 24h" },
    { icon: <Activity className="h-4 w-4" />, text: "Active Sensors: 127", subtext: "All operational" }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setAnimateCards(true), 500);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Cycling animations
    const badgeInterval = setInterval(() => {
      setCurrentBadge((prev) => (prev + 1) % badges.length);
    }, 3000);

    const pulseInterval = setInterval(() => {
      setPulsingZone((prev) => (prev + 1) % zones.length);
    }, 4000);

    return () => {
      observer.disconnect();
      clearInterval(badgeInterval);
      clearInterval(pulseInterval);
    };
  }, []);

  const getTrendIcon = (trend) => {
    if (trend === "increasing") return <TrendingUp className="w-4 h-4 text-red-400 animate-pulse" />;
    if (trend === "decreasing") return <TrendingUp className="w-4 h-4 text-green-400 rotate-180" />;
    return <Activity className="w-4 h-4 text-yellow-400" />;
  };

  const handleViewReport = (zoneName) => {
    // Route to analysis page with zone parameter
    window.location.href = `/analyze?zone=${encodeURIComponent(zoneName)}`;
  };

  const handleGetMonitoring = () => {
    // Route to analysis/monitoring page
    window.location.href = '/analyze';
  };

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-orange-400/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 mt-[6rem] relative z-10">
        {/* Header Section */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-300 mb-6 backdrop-blur-sm">
            <AlertTriangle className="w-4 h-4 mr-2 animate-pulse" />
            <span className="text-sm font-medium">Live Risk Assessment Active</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-300 via-yellow-200 to-amber-100 bg-clip-text text-transparent">
              AI-Powered Risk Zones
            </span>
            <br />
            <span className="text-2xl md:text-3xl text-gray-300 font-light">
              Real-Time Predictions
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
            Advanced machine learning algorithms continuously analyze geological data, 
            weather patterns, and sensor readings to predict rockfall risks across all zones.
          </p>

          {/* Animated Info Badges */}
          <div className="flex flex-wrap justify-center gap-4">
            {badges.map((badge, index) => (
              <Badge 
                key={index}
                className={`group bg-gray-800/80 backdrop-blur-sm border border-gray-600 text-gray-300 hover:bg-gray-700 transition-all duration-500 px-6 py-3 transform hover:scale-105 ${
                  currentBadge === index ? 'ring-2 ring-orange-400 bg-gray-700/80 scale-105' : ''
                }`}
              >
                <div className="flex items-center">
                  <div className={`mr-3 transition-colors duration-300 ${currentBadge === index ? 'text-orange-400' : 'text-gray-400'}`}>
                    {badge.icon}
                  </div>
                  <div className="text-left">
                    <div className="font-medium">{badge.text}</div>
                    <div className="text-xs text-gray-400">{badge.subtext}</div>
                  </div>
                </div>
              </Badge>
            ))}
          </div>
        </div>

        {/* Risk Zone Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {zones.map((zone, index) => (
            <Card 
              key={index} 
              className={`group relative overflow-hidden bg-gray-800/50 backdrop-blur-sm border-2 ${zone.borderColor} transition-all duration-500 hover:scale-105  hover:shadow-2xl ${zone.bgGradient} transform ${
                animateCards ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              } ${pulsingZone === index ? 'animate-pulse ring-4 ring-orange-400/50' : ''}`}
              style={{
                transitionDelay: `${index * 200}ms`
              }}
            >
              {/* Animated Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <CardHeader>
                <div className="flex justify-between items-start mb-4">
                  <CardTitle className="text-xl md:text-2xl font-bold text-white">
                    {zone.name}
                  </CardTitle>
                  <Badge className={`${zone.color} text-white font-semibold px-3 py-2 animate-pulse`}>
                    {zone.severity}
                  </Badge>
                </div>
                
                {/* Probability with animated progress */}
                <div className="space-y-2">
                  <CardDescription className="font-medium flex justify-between items-center">
                    <span className="text-gray-300">Risk Probability</span>
                    <span className={`${zone.textColor} font-bold text-lg`}>{zone.probability}</span>
                  </CardDescription>
                  
                  <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-2 ${zone.color.replace('bg-', 'bg-')} rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: animateCards ? zone.probability : '0%' }}
                    />
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Key Factors */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400 font-medium">Key Risk Factors</p>
                    {getTrendIcon(zone.trend)}
                  </div>
                  <p className="font-semibold text-white bg-gray-900/50 rounded-lg p-3 border-l-4" style={{borderLeftColor: zone.textColor.includes('red') ? '#ef4444' : zone.textColor.includes('yellow') ? '#eab308' : '#22c55e'}}>
                    {zone.factors}
                  </p>
                </div>

                {/* Recommendation */}
                <div className="border-t border-gray-600 pt-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-gray-400 font-medium">Recommended Action</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          {zone.lastUpdate}
                        </div>
                      </div>
                      <p className="text-sm font-bold text-white leading-relaxed">{zone.recommendation}</p>
                    </div>
                    <AlertTriangle className={`h-8 w-8 ${zone.textColor} ml-4 flex-shrink-0 group-hover:animate-bounce`} />
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  variant="outline" 
                  className={`w-full text-white border-gray-600 hover:${zone.borderColor.replace('border-', 'border-')} hover:${zone.textColor} hover:bg-gray-700/50 transition-all duration-300 group-hover:shadow-lg`}
                  onClick={() => handleViewReport(zone.name)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Analyze Zone Details
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className={`text-center transform transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <Button
            size="lg"
            className="group relative overflow-hidden text-lg font-semibold bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 text-white hover:from-red-600 hover:via-orange-600 hover:to-yellow-500 transition-all duration-300 px-12 py-4 shadow-2xl hover:shadow-orange-500/25"
            onClick={handleGetMonitoring}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            <div className="relative flex items-center">
              <Activity className="w-6 h-6 mr-3 group-hover:animate-spin" />
              Start Advanced Analysis
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
            </div>
          </Button>
          
          <div className="mt-6 space-y-2">
            <p className="text-sm text-gray-400">
              Access comprehensive risk analysis, predictive modeling, and real-time monitoring
            </p>
            <div className="flex items-center justify-center text-xs text-gray-500 space-x-4">
              <span>✓ 24/7 Monitoring</span>
              <span>✓ AI Predictions</span>
              <span>✓ Instant Alerts</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RiskZones;