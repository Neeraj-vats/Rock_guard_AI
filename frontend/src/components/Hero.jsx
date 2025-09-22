// src/components/Hero.jsx
import Button from "./ui/Button";
import { AlertTriangle, BarChart3, PlayCircle } from "lucide-react";
import heroImage from "../assets/hero-rockfall1.png"; // replace with your rockfall image

const Hero = () => {
  return (
    <section className="relative min-h-[600px] flex items-center">
      {/* Background Image + Dark Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            
           <span className="block bg-gradient-to-r from-stone-400 to-yellow-100 bg-clip-text text-transparent">
  Rockfall Prediction & Safety Monitoring
</span>
          </h1>

          <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl">
            Stay ahead of landslides and falling rocks with AI-powered predictions, 
            real-time monitoring, and instant alerts. Protect communities, roads, 
            and infrastructure in high-risk zones.
          </p>

          {/* CTA Buttons */}
         <div className="flex flex-col sm:flex-row gap-4">
  <Button
    variant="default"
    size="lg"
    className="text-lg bg-white/10 border-white/30 text-white hover:bg-white/20"
    onClick={() => window.location.href = '/dashboard'}
  >
    <BarChart3 className="h-5 w-5 mr-2" />
    View Dashboard
  </Button>

 <Button
  variant="outline"
  size="lg"
  className="text-lg text-red-500 border-red-500 hover:bg-red-500 hover:text-white bg-red/30"
  onClick={() => (window.location.href = "/alerts")}
>
  <AlertTriangle className="h-5 w-5 mr-2" />
  Get Alerts
</Button>
  
  <Button
    variant="default"
    size="lg"
    className="text-lg font-semibold bg-gradient-to-r from-red-500 to-yellow-400 text-white hover:from-red-600 hover:to-yellow-500 transition-colors"
    onClick={() => window.location.href = '/demo'}
  >
    <PlayCircle className="h-5 w-5 mr-2" />
    Watch Demo
  </Button>
</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
