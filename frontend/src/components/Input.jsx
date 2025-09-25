import React, { useState, useCallback, memo } from "react";
import axios from "axios";

// Alert popup for SAFE, WARNING, DANGER
const AlertComponent = memo(({ alertSection, onClose }) => {
  if (!alertSection) return null;

  const alertConfig = {
    DANGER: {
      bgColor: "bg-red-600",
      textColor: "text-white",
      icon: "⚠️",
      title: "DANGER ALERT",
      message: "High hazard risk detected at this site! Take immediate precautions.",
      borderColor: "border-red-700",
    },
    SAFE: {
      bgColor: "bg-green-600",
      textColor: "text-white",
      icon: "✅",
      title: "SAFE STATUS",
      message: "This site shows low hazard risk. Normal operations can proceed.",
      borderColor: "border-green-700",
    },
    WARNING: {
      bgColor: "bg-yellow-600",
      textColor: "text-white",
      icon: "⚡",
      title: "WARNING",
      message: "Medium hazard risk detected. Monitor conditions closely.",
      borderColor: "border-yellow-700",
    },
  };

  const config = alertConfig[alertSection];
  if (!config) return null;

  return (
    <div
      className={`${config.bgColor} ${config.textColor} p-4 rounded-lg mb-6 border-2 ${config.borderColor} shadow-lg`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{config.icon}</span>
          <div>
            <h3 className="font-bold text-lg">{config.title}</h3>
            <p className="text-sm opacity-90">{config.message}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 text-xl font-bold"
        >
          ×
        </button>
      </div>
    </div>
  );
});
AlertComponent.displayName = "AlertComponent";

// Utility: Decide alert based on form values
const determineAlertStatus = (formData) => {
  const { hazard_level, slope_deg } = formData;
  const slope = parseFloat(slope_deg) || 0;

  if (hazard_level?.toLowerCase() === "high" || slope > 35) return "DANGER";
  if (hazard_level?.toLowerCase() === "medium" || slope > 30) return "WARNING";

  return "SAFE";
};

// Fast, memoized input component
const InputField = memo(({ label, name, type = "text", value, onChange }) => (
  <div>
    <label className="block text-gray-300 font-medium mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-slate-600 bg-slate-700/50 text-gray-100 rounded-lg 
               focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 
               hover:border-slate-500 transition-all duration-200
               [&::-webkit-calendar-picker-indicator]:invert"
    />
  </div>
));
InputField.displayName = "InputField";

// Main Form Component
const Input = () => {
  const [formData, setFormData] = useState({
    latitude: "",
    longitude: "",
    slope_deg: "",
    distance_to_rock: "",
    rock_type: "",
    soil_type: "",
    rock_size: "",
    rock_volume: "",
  });

  const [alertSection, setAlertSection] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  // Standard field change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
  };
  // Geolocation handler
const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // On success, update the state
          setFormData((prev) => ({
            ...prev,
            latitude: position.coords.latitude.toFixed(5), // .toFixed for cleaner input
            longitude: position.coords.longitude.toFixed(5),
          }));
        },
        (error) => {
          // Handle errors (e.g., user denies permission)
          console.error("Error getting geolocation:", error);
          alert("Could not retrieve your location. Please enter it manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  // Submit handler with axios
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/data", formData
        
      );

      console.log("Server response:", res.data);

      const status = determineAlertStatus(formData);
      setAlertSection(status);
      setShowAlert(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleCloseAlert = () => setShowAlert(false);

  return (
    <div className="h-screen w-screen relative top-[4rem]">
      <div className="flex justify-center items-center bg-gradient-to-br from-slate-800 via-slate-900 to-blue-900 p-4">
        <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 p-8 rounded-2xl shadow-2xl w-full max-w-4xl mt-[7rem]">
          {showAlert && (
            <AlertComponent alertSection={alertSection} onClose={handleCloseAlert} />
          )}

          <h2 className="text-4xl font-light text-center mb-1 text-white">
            Input Mine Site Data
          </h2>
          <p className="text-center text-gray-400 mb-8">
            Please enter the required information
          </p>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Geotechnical Data */}
              <div className="space-y-6">
                <h3 className="text-xl font-medium mb-4 text-white">
                  Geotechnical Data
                </h3>
                <div className="mb-4">
                  <button
                    type="button" // Important: prevents form submission
                    onClick={handleGetLocation}
                    className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-200 flex items-center justify-center"
                  >
                    📍 Use My Current Location
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField label="Latitude" name="latitude" value={formData.latitude} onChange={handleChange} />
                  <InputField label="Longitude" name="longitude" value={formData.longitude} onChange={handleChange} />
                  <InputField label="Slope (deg)" name="slope_deg" value={formData.slope_deg} onChange={handleChange} />
                  <InputField label="Distance to Rock" name="distance_to_rock" value={formData.distance_to_rock} onChange={handleChange} />
                  <InputField label="Rock Type" name="rock_type" value={formData.rock_type} onChange={handleChange} />
                  <InputField label="Soil Type" name="soil_type" value={formData.soil_type} onChange={handleChange} />
                </div>
              </div>

              {/* Environmental & Seasonal Data */}
              <div className="space-y-6">
                <h3 className="text-xl font-medium mb-4 text-white">
                  Environmental & Seasonal Data
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField label="Rainfall (mm)" name="rainfall_mm" value={formData.rainfall_mm} onChange={handleChange} />
                  <InputField label="Snow (mm)" name="snow_mm" value={formData.snow_mm} onChange={handleChange} />
                  <InputField label="Temperature" name="temperature" value={formData.temperature} onChange={handleChange} />
                  <InputField label="Wind Speed" name="wind_speed" value={formData.wind_speed} onChange={handleChange} />
                  <InputField label="Humidity" name="humidity" value={formData.humidity} onChange={handleChange} />
                  <InputField label="Vegetation" name="vegetation" value={formData.vegetation} onChange={handleChange} />
                  <InputField label="Land Cover" name="land_cover" value={formData.land_cover} onChange={handleChange} />
                </div>

                {/* Rockfall-Specific Data */}
                <div className="mt-6">
                  <h3 className="text-xl font-medium mb-4 text-white">
                    Rockfall-Specific Data
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField label="Rock Size" name="rock_size" value={formData.rock_size} onChange={handleChange} />
                    <InputField label="Rock Volume" name="rock_volume" value={formData.rock_volume} onChange={handleChange} />
                    <InputField label="Rock Velocity" name="rock_velocity" value={formData.rock_velocity} onChange={handleChange} />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="bg-orange-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-orange-600 transition duration-200 flex items-center"
              >
                Submit & Analyze Data
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default memo(Input);
