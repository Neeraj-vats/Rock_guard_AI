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
    },
    {
      icon: <Activity className="h-8 w-8" />,
      title: "Probability Forecasts",
      description:
        "Get predictive insights with probability-based forecasts for rockfall risks over time.",
      badge: "AI",
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Sensor Data Monitoring",
      description:
        "Track geotechnical data such as displacement, strain, and pore pressure in real time.",
      badge: "IoT",
    },
    {
      icon: <Camera className="h-8 w-8" />,
      title: "Drone & DEM Integration",
      description:
        "Process drone-captured imagery and digital elevation models for slope stability analysis.",
      badge: "3D",
    },
    {
      icon: <AlertTriangle className="h-8 w-8" />,
      title: "Instant Alerts",
      description:
        "Receive SMS/email alerts with severity levels and suggested action plans for safety.",
      badge: "Critical",
    },
    {
      icon: <CloudRain className="h-8 w-8" />,
      title: "Environmental Tracking",
      description:
        "Monitor rainfall, temperature, and vibrations to factor environmental risks into predictions.",
      badge: "Live Data",
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Reports & Action Plans",
      description:
        "Download risk assessment reports and recommended mitigation strategies instantly.",
      badge: "PDF/CSV",
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: "Custom Integration",
      description:
        "Easily integrate with low-cost monitoring hardware and open-source tools for scalability.",
      badge: "Flexible",
    },
  ];

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
              className="group hover:border-orange-400 transition-all duration-300 hover:scale-105"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="p-3 bg-gray-700 rounded-lg group-hover:bg-orange-400 transition-colors">
                    <span className="text-gray-400 group-hover:text-white transition-colors">
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
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
