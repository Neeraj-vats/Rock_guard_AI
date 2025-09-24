import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/Card";
import { Badge } from "./ui/Badge";
import {
  Map,
  Activity,
  Database,
  Camera,
  AlertTriangle,
  CloudRain,
  FileText,
  Settings,
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Map className="h-8 w-8" />,
      title: "Real-time Risk Maps",
      description:
        "Visualize vulnerable mine zones with color-coded severity levels powered by AI models.",
      badge: "Live",
      link: "/results",
    },
    {
      icon: <Activity className="h-8 w-8" />,
      title: "Probability Forecasts",
      description:
        "Get predictive insights with probability-based forecasts for rockfall risks over time.",
      badge: "AI",
      link: "/results",
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Sensor Data Monitoring",
      description:
        "Track geotechnical data such as displacement, strain, and pore pressure in real time.",
      badge: "IoT",
      comingSoon: true,
    },
    {
      icon: <Camera className="h-8 w-8" />,
      title: "Drone & DEM Integration",
      description:
        "Process drone-captured imagery and digital elevation models for slope stability analysis.",
      badge: "3D",
      comingSoon: true,
    },
    {
      icon: <AlertTriangle className="h-8 w-8" />,
      title: "Instant Alerts",
      description:
        "Receive SMS/email alerts with severity levels and suggested action plans for safety.",
      badge: "Critical",
      href: "#risk",
    },
    {
      icon: <CloudRain className="h-8 w-8" />,
      title: "Environmental Tracking",
      description:
        "Monitor rainfall, temperature, and vibrations to factor environmental risks into predictions.",
      badge: "Live Data",
      comingSoon: true,
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Reports & Action Plans",
      description:
        "Download risk assessment reports and recommended mitigation strategies instantly.",
      badge: "PDF",
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: "Custom Integration",
      description:
        "Easily integrate with low-cost monitoring hardware and open-source tools for scalability.",
      badge: "Flexible",
      link: "/analyse",
    },
  ];

  const handleClick = (feature) => {
    if (feature.comingSoon) return; // do nothing
    if (feature.link) {
      window.location.href = feature.link; // navigate to a page
    } else if (feature.href) {
      const target = document.querySelector(feature.href);
      if (target) target.scrollIntoView({ behavior: "smooth" }); // smooth scroll
    }
  };

  return (
    <section id="features" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-300 to-yellow-200 bg-clip-text text-transparent">
              Intelligent Mine Safety Features
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            From real-time monitoring to predictive analytics, our platform
            equips mine planners with the tools they need for safer operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              onClick={() => handleClick(feature)}
              className={`group relative hover:border-orange-400 transition-all duration-300 hover:scale-105 overflow-hidden cursor-pointer ${
                feature.comingSoon ? "cursor-not-allowed" : ""
              }`}
            >
              {feature.comingSoon && (
                <div className="absolute inset-0 bg-black/70 z-10 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-2xl font-bold transition-opacity duration-300">
                  Coming Soon
                </div>
              )}

              <CardHeader className={feature.comingSoon ? "pointer-events-none" : ""}>
                <div className="flex items-start justify-between">
                  <div
                    className={`p-3 rounded-lg transition-colors ${
                      feature.comingSoon
                        ? "bg-gray-700 group-hover:bg-gray-700"
                        : "bg-gray-700 group-hover:bg-orange-400"
                    }`}
                  >
                    <span
                      className={`transition-colors ${
                        feature.comingSoon
                          ? "text-gray-400"
                          : "text-gray-400 group-hover:text-white"
                      }`}
                    >
                      {feature.icon}
                    </span>
                  </div>
                  <Badge className="bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-semibold mt-4">
                  {feature.title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <CardDescription
                  className={feature.comingSoon ? "blur-sm pointer-events-none" : ""}
                >
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
