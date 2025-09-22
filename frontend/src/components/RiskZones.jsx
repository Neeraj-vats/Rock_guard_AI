import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/Card";
import  Button  from "./ui/Button"; 
import { Badge } from "./ui/Badge";
import { Activity, AlertTriangle, MapPin, CloudRain } from "lucide-react";

const RiskZones = () => {
  const zones = [
    {
      name: "Zone A - North Slope",
      severity: "High Risk",
      probability: "85%",
      factors: "Heavy rainfall, high displacement readings",
      recommendation: "Immediate inspection and slope reinforcement needed",
      color: "bg-red-600",
      borderColor: "border-red-600",
      textColor: "text-red-600"
    },
    {
      name: "Zone B - East Wall",
      severity: "Moderate Risk",
      probability: "60%",
      factors: "Moderate pore pressure, increasing strain",
      recommendation: "Increase monitoring frequency",
      color: "bg-yellow-400",
      borderColor: "border-yellow-400",
      textColor: "text-yellow-400"
    },
    {
      name: "Zone C - South Pit",
      severity: "Low Risk",
      probability: "25%",
      factors: "Stable conditions, minor vibrations",
      recommendation: "Routine monitoring",
      color: "bg-green-500",
      borderColor: "border-green-500",
      textColor: "text-green-500"
    }
  ];

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-300 to-yellow-200 bg-clip-text text-transparent">
              Predicted Rockfall Risk Zones
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
            AI-powered predictions highlighting vulnerable areas in the mine, with severity levels and recommended actions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge className="bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors px-4 py-2 flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-gray-400" />
              Open-Pit Mine Site
            </Badge>
            <Badge className="bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors px-4 py-2 flex items-center">
              <CloudRain className="h-4 w-4 mr-2 text-gray-400" />
              Last 24h Rainfall: 42 mm
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {zones.map((zone, index) => (
            <Card key={index} className={`group bg-gray-800 border-2 ${zone.borderColor} transition-all duration-300 hover:scale-105`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-2xl font-bold">
                    {zone.name}
                  </CardTitle>
                  <Badge className={`${zone.color} text-white font-semibold px-3 py-1`}>
                    {zone.severity}
                  </Badge>
                </div>
                <CardDescription className="font-medium">
                  <span className="text-gray-400">Probability: </span>
                  <span className={`${zone.textColor}`}>{zone.probability}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400">Key Factors</p>
                  <p className="font-semibold text-white">{zone.factors}</p>
                </div>
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Recommended Action</p>
                      <p className="text-base font-bold text-white">{zone.recommendation}</p>
                    </div>
                    <AlertTriangle className={`h-8 w-8 ${zone.textColor}`} />
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full text-white border-gray-700 hover:bg-gray-700 transition-colors"
                >
                  View Detailed Report
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center">
          <Button
            size="lg"
            className="text-lg font-semibold bg-gradient-to-r from-red-500 to-yellow-400 text-white hover:from-red-600 hover:to-yellow-500 transition-colors px-8 py-3"
          >
            Get Real-Time Monitoring
          </Button>
          <p className="text-sm text-gray-400 mt-4">
            Sign up to receive live alerts and detailed reports for your mine site
          </p>
        </div>
      </div>
    </section>
  );
};

export default RiskZones;