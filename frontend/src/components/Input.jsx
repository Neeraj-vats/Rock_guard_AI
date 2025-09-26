import React, { useState, useCallback, memo } from "react";

// Alert popup for SAFE, WARNING, DANGER with enhanced styling
const AlertComponent = memo(({ alertSection, onClose }) => {
  if (!alertSection) return null;

  const alertConfig = {
    DANGER: {
      bgGradient: "bg-gradient-to-r from-red-600 via-red-700 to-red-800",
      textColor: "text-white",
      icon: "⚠️",
      title: "DANGER ALERT",
      message: "High hazard risk detected at this site! Take immediate precautions.",
      borderColor: "border-red-500",
      shadowColor: "shadow-red-500/25",
    },
    SAFE: {
      bgGradient: "bg-gradient-to-r from-green-600 via-green-700 to-green-800",
      textColor: "text-white",
      icon: "✅",
      title: "SAFE STATUS",
      message: "This site shows low hazard risk. Normal operations can proceed.",
      borderColor: "border-green-500",
      shadowColor: "shadow-green-500/25",
    },
    WARNING: {
      bgGradient: "bg-gradient-to-r from-yellow-600 via-yellow-700 to-yellow-800",
      textColor: "text-white",
      icon: "⚡",
      title: "WARNING",
      message: "Medium hazard risk detected. Monitor conditions closely.",
      borderColor: "border-yellow-500",
      shadowColor: "shadow-yellow-500/25",
    },
  };

  const config = alertConfig[alertSection];
  if (!config) return null;

  return (
    <div className="animate-slideDown">
      <div
        className={`${config.bgGradient} ${config.textColor} p-6 rounded-xl mb-8 border ${config.borderColor} shadow-xl ${config.shadowColor} backdrop-blur-sm transform transition-all duration-500 hover:scale-[1.02]`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="animate-pulse">
              <span className="text-3xl">{config.icon}</span>
            </div>
            <div>
              <h3 className="font-bold text-xl tracking-wide">{config.title}</h3>
              <p className="text-sm opacity-90 mt-1">{config.message}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 text-2xl font-bold transition-all duration-200 hover:rotate-90 hover:scale-110"
          >
            ×
          </button>
        </div>
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

// Enhanced input component with floating labels and persistent animations
const InputField = memo(({ label, name, type = "text", value, onChange, min, max, icon }) => {
  const [countFocus, setCountFocus] = useState(0);
  
  const isInvalid = (min !== undefined && value && parseFloat(value) < min) ||
                    (max !== undefined && value && parseFloat(value) > max);

  const handleFocus = () => {
    if (countFocus === 0) {
      setCountFocus(1);
    }
  };

  // Use countFocus to determine if label should stay floating
  const shouldLabelFloat = countFocus === 1 || value !== "";

  return (
    <div className="group relative">
      <div className="relative">
        {icon && (
          <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
            countFocus === 1 ? 'text-orange-400' : 'text-gray-400'
          }`}>
            {icon}
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          placeholder=""
          className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-4 border-2 rounded-xl text-gray-100 bg-slate-800/60 backdrop-blur-sm transition-all duration-300
            ${isInvalid ? "border-red-500" 
                        : countFocus === 1 ? "border-orange-400 bg-slate-800/90 shadow-xl" 
                        : "border-slate-600 hover:border-slate-500 hover:bg-slate-800/80 hover:shadow-lg"}
            focus:outline-none focus:border-orange-400 focus:bg-slate-800/90 focus:shadow-xl`}
        />
        <label className={`absolute transition-all duration-300 pointer-events-none ${
          shouldLabelFloat 
            ? '-top-2 left-3 text-sm text-orange-400 bg-slate-800 px-2 rounded transform scale-90' 
            : `${icon ? 'left-10' : 'left-4'} top-4 text-base text-gray-500 transform scale-100`
          }`}>
          {label}
        </label>
      </div>
      {isInvalid && (
        <div className="flex items-center mt-2 text-red-400 text-sm animate-slideDown">
          <span className="mr-1">⚠️</span>
          Value must be between {min} and {max}
        </div>
      )}
    </div>
  );
});
InputField.displayName = "InputField";

// Enhanced dropdown component - labels start in floating position
const DropdownField = memo(({ label, name, options, value, onChange, icon }) => {
  const [countFocus, setCountFocus] = useState(0);

  const handleFocus = () => {
    if (countFocus === 0) {
      setCountFocus(1);
    }
  };

  return (
    <div className="group relative">
      <div className="relative">
        {icon && (
          <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 z-10 ${
            countFocus === 1 ? 'text-orange-400' : 'text-gray-400'
          }`}>
            {icon}
          </div>
        )}
        <select
          name={name}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-4 border-2 bg-slate-800/60 backdrop-blur-sm text-white rounded-xl appearance-none cursor-pointer transition-all duration-300
                   ${countFocus === 1 ? 'border-orange-400 bg-slate-800/90 shadow-xl' 
                                      : 'border-slate-600 hover:border-slate-500 hover:bg-slate-800/80 hover:shadow-lg'}
                   focus:outline-none focus:border-orange-400 focus:bg-slate-800/90 focus:shadow-xl`}
        >
          <option value="" className="bg-slate-800 text-gray-300">
            Select {label}
          </option>
          {options.map((opt, idx) => (
            <option key={idx} value={opt} className="bg-slate-800 text-gray-100">
              {opt}
            </option>
          ))}
        </select>
        <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none transition-transform duration-200 ${
          countFocus === 1 ? 'rotate-180' : 'rotate-0'
        }`}>
          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
        {/* Label always floats for dropdowns - no animation needed */}
        <label className="absolute -top-2 left-3 text-sm text-gray-400 bg-slate-800 px-2 rounded pointer-events-none">
          {label}
        </label>
      </div>
    </div>
  );
});
DropdownField.displayName = "DropdownField";

// Main Form Component with enhanced styling
const Input = () => {
  const [formData, setFormData] = useState({
    latitude: "",
    longitude: "",
    elevation_m: "",
    slope_deg: "",
    distance_to_fault_km: "",
    rock_hardness: "",
    fracture_density: "",
    rainfall_mm: "",
    temperature_c: "",
    wind_speed_kmh: "",
    ndvi: "",
    rock_size_cm: "",
    rock_volume_m3: "",
    rock_velocity_mps: "",
    prior_events: "",
    land_cover: "",
    vegetation: "",
    rock_type: "",
    soil_type: "",
    season: "",
  });

  const [alertSection, setAlertSection] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            latitude: position.coords.latitude.toFixed(5),
            longitude: position.coords.longitude.toFixed(5),
          }));
        },
        (error) => {
          console.error("Error getting geolocation:", error);
          alert("Could not retrieve your location. Please enter it manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const validateForm = () => {
    const requiredFields = ['latitude', 'longitude', 'elevation_m', 'slope_deg'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      setError(`Please fill in required fields: ${missingFields.join(', ')}`);
      return false;
    }
    
    setError("");
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setError("");

    try {
      // Convert string values to numbers where appropriate
      const processedData = {
        ...formData,
        latitude: parseFloat(formData.latitude) || 0,
        longitude: parseFloat(formData.longitude) || 0,
        elevation_m: parseFloat(formData.elevation_m) || 0,
        slope_deg: parseFloat(formData.slope_deg) || 0,
        distance_to_fault_km: parseFloat(formData.distance_to_fault_km) || 0,
        rock_hardness: parseFloat(formData.rock_hardness) || 0,
        fracture_density: parseFloat(formData.fracture_density) || 0,
        rainfall_mm: parseFloat(formData.rainfall_mm) || 0,
        temperature_c: parseFloat(formData.temperature_c) || 0,
        wind_speed_kmh: parseFloat(formData.wind_speed_kmh) || 0,
        ndvi: parseFloat(formData.ndvi) || 0,
        rock_size_cm: parseFloat(formData.rock_size_cm) || 0,
        rock_volume_m3: parseFloat(formData.rock_volume_m3) || 0,
        rock_velocity_mps: parseFloat(formData.rock_velocity_mps) || 0,
        prior_events: parseInt(formData.prior_events) || 0,
      };

      console.log("Submitting data:", processedData);

      // Make API call
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(processedData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("API Response:", result);

      // Determine alert status based on API response or form data
      let status;
      if (result && result.prediction) {
        // Use API prediction if available
        status = result.prediction.toUpperCase();
      } else {
        // Fallback to local determination
        status = determineAlertStatus(formData);
      }

      setAlertSection(status);
      setShowAlert(true);
      window.scrollTo({ top: 0, behavior: "smooth" });

    } catch (error) {
      console.error("Error submitting form:", error);
      setError(`Failed to submit data: ${error.message}`);
      
      // Show fallback analysis even on error
      const status = determineAlertStatus(formData);
      setAlertSection(status);
      setShowAlert(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseAlert = () => setShowAlert(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-orange-400/10 to-red-400/10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-br from-blue-400/10 to-purple-400/10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-br from-green-400/5 to-blue-400/5 animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 p-6 pt-20">
        <div className="max-w-7xl mx-auto">
          {showAlert && (
            <AlertComponent alertSection={alertSection} onClose={handleCloseAlert} />
          )}

          {/* Error Display */}
          {error && (
            <div className="max-w-4xl mx-auto mb-8 bg-red-600/20 border border-red-500 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center">
                <span className="text-red-400 mr-2">⚠️</span>
                <span className="text-red-300">{error}</span>
              </div>
            </div>
          )}

          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full mb-6 animate-bounce">
              <span className="text-3xl">⛏️</span>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Mine Site Analysis
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Advanced geological hazard assessment and risk evaluation system
            </p>
          </div>

          <div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Geotechnical Data Card */}
              <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700 rounded-2xl p-8 shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 hover:border-orange-500/30 group">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-xl">🏔️</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Geotechnical Data</h3>
                </div>

                <button
                  type="button"
                  onClick={handleGetLocation}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center mb-6 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="mr-2 text-xl">📍</span>
                  Use My Current Location
                </button>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField label="Latitude *" name="latitude" value={formData.latitude} onChange={handleChange} icon="🌍" />
                    <InputField label="Longitude *" name="longitude" value={formData.longitude} onChange={handleChange} icon="🌍" />
                  </div>
                  
                  <InputField label="Elevation (m) *" name="elevation_m" value={formData.elevation_m} onChange={handleChange} min={500} max={3000} icon="⛰️" />
                  <InputField label="Slope (degrees) *" name="slope_deg" value={formData.slope_deg} onChange={handleChange} min={0} max={90} icon="📐" />
                  <InputField label="Distance to Fault (km)" name="distance_to_fault_km" value={formData.distance_to_fault_km} onChange={handleChange} min={2.6} max={50} icon="📏" />
                  <InputField label="Rock Hardness" name="rock_hardness" value={formData.rock_hardness} onChange={handleChange} min={1} max={10} icon="🪨" />
                  <InputField label="Fracture Density" name="fracture_density" value={formData.fracture_density} onChange={handleChange} min={1.27} max={5} icon="🔍" />
                  
                  <DropdownField
                    label="Rock Type"
                    name="rock_type"
                    options={["Igneous", "Sedimentary", "Metamorphic", "Shale", "Granite", "Basalt", "Limestone", "Sandstone"]}
                    value={formData.rock_type}
                    onChange={handleChange}
                    icon="🗿"
                  />

                  <DropdownField
                    label="Soil Type"
                    name="soil_type"
                    options={["Clay", "Loamy", "Sandy", "Silty", "Rocky"]}
                    value={formData.soil_type}
                    onChange={handleChange}
                    icon="🌱"
                  />
                </div>
              </div>

              {/* Environmental Data Card */}
              <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700 rounded-2xl p-8 shadow-2xl hover:shadow-green-500/10 transition-all duration-500 hover:border-green-500/30 group">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-xl">🌿</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Environmental Data</h3>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField label="Rainfall (mm)" name="rainfall_mm" value={formData.rainfall_mm} onChange={handleChange} min={0} max={300} icon="🌧️" />
                    <InputField label="Temperature (°C)" name="temperature_c" value={formData.temperature_c} onChange={handleChange} min={-4} max={45} icon="🌡️" />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField label="Wind Speed (km/h)" name="wind_speed_kmh" value={formData.wind_speed_kmh} onChange={handleChange} min={0} max={99} icon="💨" />
                    <InputField label="NDVI" name="ndvi" value={formData.ndvi} onChange={handleChange} min={-1} max={1} icon="🌿" />
                  </div>
                  
                  
                  <DropdownField
                    label="Land Cover"
                    name="land_cover"
                    options={["Bare", "Forest", "Grassland", "Urban"]}
                    value={formData.land_cover}
                    onChange={handleChange}
                    icon="🗺️"
                  />

                  <DropdownField
                    label="Vegetation"
                    name="vegetation"
                    options={["Sparse", "Dense", "Medium"]}
                    value={formData.vegetation}
                    onChange={handleChange}
                    icon="🌳"
                  />

                  <DropdownField
                    label="Season"
                    name="season"
                    options={["Winter", "Spring", "Summer", "Autumn"]}
                    value={formData.season}
                    onChange={handleChange}
                    icon="🗓️"
                  />
                </div>
              </div>

              {/* Rockfall Analysis Card */}
              <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700 rounded-2xl p-8 shadow-2xl hover:shadow-red-500/10 transition-all duration-500 hover:border-red-500/30 group">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-xl">⚡</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Rockfall Analysis</h3>
                </div>

                <div className="space-y-6">
                  <InputField label="Rock Size (cm)" name="rock_size_cm" value={formData.rock_size_cm} onChange={handleChange} min={10} max={500} icon="📏" />
                  <InputField label="Rock Volume (m³)" name="rock_volume_m3" value={formData.rock_volume_m3} onChange={handleChange} min={0.5} max={7.5} icon="🪨" />
                  <InputField label="Rock Velocity (m/s)" name="rock_velocity_mps" value={formData.rock_velocity_mps} onChange={handleChange} min={1} max={29} icon="⚡" />
                  
                  
                  <DropdownField
                    label="Prior Events"
                    name="prior_events"
                    options={[0, 1, 2, 3, 4]}
                    value={formData.prior_events}
                    onChange={handleChange}
                    icon="📊"
                  />
                  
                  {/* Analysis Preview */}
                  <div className="mt-8 p-6 bg-slate-900/50 rounded-xl border border-slate-600">
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <span className="mr-2">📈</span>
                      Real-time Analysis
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Risk Level:</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          parseFloat(formData.slope_deg) > 35 ? 'bg-red-600 text-white' :
                          parseFloat(formData.slope_deg) > 30 ? 'bg-yellow-600 text-white' :
                          'bg-green-600 text-white'
                        }`}>
                          {parseFloat(formData.slope_deg) > 35 ? 'HIGH' :
                           parseFloat(formData.slope_deg) > 30 ? 'MEDIUM' : 'LOW'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Data Completeness:</span>
                        <span className="text-orange-400 font-semibold">
                          {Math.round((Object.values(formData).filter(v => v !== "").length / Object.keys(formData).length) * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-12">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl 
                  transition-all duration-300 flex items-center text-lg
                  ${isSubmitting 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:from-orange-600 hover:to-red-600 hover:shadow-orange-500/25 hover:scale-105 active:scale-95'
                  }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    Analyzing Data...
                  </>
                ) : (
                  <>
                    <span className="mr-3 text-xl">🔬</span>
                    Submit & Analyze Data
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        
        input[type=number] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
};

export default memo(Input);