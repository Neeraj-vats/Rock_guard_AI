import React, { useState, useCallback, memo } from "react";

// Optional: Sample mine site data
export const mineSiteDataSamples = [
  {
    id: 1,
    siteName: "Alpha Mine",
    location: "Region A",
    mineType: "open-pit",
    latitude: 34.56,
    longitude: 79.12,
    elevation: 450,
    slope_deg: 12,
    aspect_deg: 75,
    distance_to_rock: 30,
    rock_type: "Granite",
    soil_type: "Loamy",
    lithology: "Sedimentary",
    rock_hardness: 4,
    fracture: 1,
    rainfall_mm: 80,
    snow_mm: 10,
    temperature: 25,
    wind_speed: 7,
    humidity: 60,
    vegetation: "Sparse",
    land_cover: "Rocky",
    ndvi: 0.35,
    rock_size: 2,
    rock_volume: 20,
    rock_velocity: 3,
    month: "June",
    season: "Summer",
    hazard_level: "Low",
    alertSection: "SAFE",
  },
  {
    id: 2,
    siteName: "Beta Mine",
    location: "Region B",
    mineType: "underground",
    latitude: 45.67,
    longitude: 82.34,
    elevation: 1200,
    slope_deg: 40,
    aspect_deg: 150,
    distance_to_rock: 120,
    rock_type: "Shale",
    soil_type: "Sandy",
    lithology: "Metamorphic",
    rock_hardness: 7,
    fracture: 4,
    rainfall_mm: 200,
    snow_mm: 30,
    temperature: 45,
    wind_speed: 20,
    humidity: 85,
    vegetation: "Dense",
    land_cover: "Mountainous",
    ndvi: 0.75,
    rock_size: 10,
    rock_volume: 200,
    rock_velocity: 15,
    month: "December",
    season: "Winter",
    hazard_level: "High",
    alertSection: "DANGER",
  },
];

// Alert popup for SAFE, WARNING, DANGER
const AlertComponent = memo(({ alertSection, onClose }) => {
  if (!alertSection) return null;

  const alertConfig = {
    DANGER: {
      bgColor: 'bg-red-600',
      textColor: 'text-white',
      icon: '⚠️',
      title: 'DANGER ALERT',
      message: 'High hazard risk detected at this site! Take immediate precautions.',
      borderColor: 'border-red-700'
    },
    SAFE: {
      bgColor: 'bg-green-600',
      textColor: 'text-white',
      icon: '✅',
      title: 'SAFE STATUS',
      message: 'This site shows low hazard risk. Normal operations can proceed.',
      borderColor: 'border-green-700'
    },
    WARNING: {
      bgColor: 'bg-yellow-600',
      textColor: 'text-white',
      icon: '⚡',
      title: 'WARNING',
      message: 'Medium hazard risk detected. Monitor conditions closely.',
      borderColor: 'border-yellow-700'
    }
  };

  const config = alertConfig[alertSection];
  if (!config) return null;
  return (
    <div className={`${config.bgColor} ${config.textColor} p-4 rounded-lg mb-6 border-2 ${config.borderColor} shadow-lg`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{config.icon}</span>
          <div>
            <h3 className="font-bold text-lg">{config.title}</h3>
            <p className="text-sm opacity-90">{config.message}</p>
          </div>
        </div>
        <button onClick={onClose} className="text-white hover:text-gray-200 text-xl font-bold">×</button>
      </div>
    </div>
  );
});
AlertComponent.displayName = 'AlertComponent';

// Utility: Decide alert based on form values
const determineAlertStatus = (formData) => {
  const {
    hazard_level, slope_deg, rock_hardness, fracture, rainfall_mm, wind_speed, rock_velocity
  } = formData;

  // Parse fields for calculation
  const slope = parseFloat(slope_deg) || 0,
        hardness = parseFloat(rock_hardness) || 0,
        fractureLevel = parseFloat(fracture) || 0,
        rainfall = parseFloat(rainfall_mm) || 0,
        windSpeed = parseFloat(wind_speed) || 0,
        rockVel = parseFloat(rock_velocity) || 0;

  // Danger if any condition triggers (customize as needed)
  if (
    hazard_level?.toLowerCase() === 'high' ||
    slope > 35
   
  ) return 'DANGER';

  // Warning threshold
  if (
    hazard_level?.toLowerCase() === 'medium' ||
    slope > 30 
  ) return 'WARNING';

  // Otherwise safe
  return 'SAFE';
};

// Fast, memoized radio and input components
const MineTypeRadio = memo(({ label, value, name, checked, onChange }) => (
  <label className="inline-flex items-center cursor-pointer">
    <input
      type="radio"
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      className="form-radio h-4 w-4 text-orange-500 bg-slate-700 border-slate-600 focus:ring-orange-400"
    />
    <span className="ml-2 text-gray-300 hover:text-white transition-colors">{label}</span>
  </label>
));
MineTypeRadio.displayName = 'MineTypeRadio';

const InputField = memo(({ label, name, type = "text", value, onChange }) => (
  <div>
    <label className="block text-gray-300 font-medium mb-1">
      {label}
    </label>
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
InputField.displayName = 'InputField';

// Main Form Component
const Input = () => {
  const [formData, setFormData] = useState({
    siteName: "",
    location: "",
    mineType: "",
    name: "",
    workEmail: "",
    phoneNumber: "",
    dataCollectionDate: "",
    latitude: "",
    longitude: "",
    elevation: "",
    slope_deg: "",
    aspect_deg: "",
    distance_to_rock: "",
    rock_type: "",
    soil_type: "",
    lithology: "",
    rock_hardness: "",
    fracture: "",
    rainfall_mm: "",
    snow_mm: "",
    temperature: "",
    wind_speed: "",
    humidity: "",
    vegetation: "",
    land_cover: "",
    ndvi: "",
    rock_size: "",
    rock_volume: "",
    rock_velocity: "",
    month: "",
    season: "",
    hazard_level: "",
  });

  const [uploadedFiles, setUploadedFiles] = useState({
    geologicalSurveys: null,
    topographyMaps: null,
  });

  const [alertSection, setAlertSection] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  // Standard field change handler
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleFileChange = useCallback((e, fileType) => {
    const file = e.target.files[0];
    setUploadedFiles(prev => ({ ...prev, [fileType]: file }));
  }, []);

  // Only show alert when form is submitted
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const status = determineAlertStatus(formData);
    setAlertSection(status);
    setShowAlert(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    console.log("Form Submitted:", formData);
    console.log("Files:", uploadedFiles);
    console.log("Alert Status:", status);
  }, [formData, uploadedFiles]);

  const handleCloseAlert = useCallback(() => setShowAlert(false), []);

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
            Please enter the required information and upload initial site files
          </p>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium mb-4 text-white">Geotechnical Data</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField label="Latitude" name="latitude" value={formData.latitude} onChange={handleChange} />
                    <InputField label="Longitude" name="longitude" value={formData.longitude} onChange={handleChange} />
                    <InputField label="Elevation" name="elevation" value={formData.elevation} onChange={handleChange} />
                    <InputField label="Slope (deg)" name="slope_deg" value={formData.slope_deg} onChange={handleChange} />
                    <InputField label="Aspect (deg)" name="aspect_deg" value={formData.aspect_deg} onChange={handleChange} />
                    <InputField label="Distance to Rock" name="distance_to_rock" value={formData.distance_to_rock} onChange={handleChange} />
                    <InputField label="Rock Type" name="rock_type" value={formData.rock_type} onChange={handleChange} />
                    <InputField label="Soil Type" name="soil_type" value={formData.soil_type} onChange={handleChange} />
                    <InputField label="Lithology" name="lithology" value={formData.lithology} onChange={handleChange} />
                    <InputField label="Rock Hardness" name="rock_hardness" value={formData.rock_hardness} onChange={handleChange} />
                    <InputField label="Fracture" name="fracture" value={formData.fracture} onChange={handleChange} />
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium mb-4 text-white">Environmental & Seasonal Data</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField label="Rainfall (mm)" name="rainfall_mm" value={formData.rainfall_mm} onChange={handleChange} />
                    <InputField label="Snow (mm)" name="snow_mm" value={formData.snow_mm} onChange={handleChange} />
                    <InputField label="Temperature" name="temperature" value={formData.temperature} onChange={handleChange} />
                    <InputField label="Wind Speed" name="wind_speed" value={formData.wind_speed} onChange={handleChange} />
                    <InputField label="Humidity" name="humidity" value={formData.humidity} onChange={handleChange} />
                    <InputField label="Vegetation" name="vegetation" value={formData.vegetation} onChange={handleChange} />
                    <InputField label="Land Cover" name="land_cover" value={formData.land_cover} onChange={handleChange} />
                    <InputField label="NDVI" name="ndvi" value={formData.ndvi} onChange={handleChange} />
                    <InputField label="Month" name="month" value={formData.month} onChange={handleChange} />
                    <InputField label="Season" name="season" value={formData.season} onChange={handleChange} />
                    <InputField label="Hazard Level" name="hazard_level" value={formData.hazard_level} onChange={handleChange} />
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-xl font-medium mb-4 text-white">Rockfall-Specific Data</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField label="Rock Size" name="rock_size" value={formData.rock_size} onChange={handleChange} />
                    <InputField label="Rock Volume" name="rock_volume" value={formData.rock_volume} onChange={handleChange} />
                    <InputField label="Rock Velocity" name="rock_velocity" value={formData.rock_velocity} onChange={handleChange} />
                  </div>
                </div>
                <div className="border-2 w-[56rem] text-orange-500 mt-[5rem] relative left-[-29rem]"></div>
                <div className="-translate-x-[14rem] hidden">
                  <div className="mt-6">
                    <h3 className="text-xl font-medium mb-4 text-white">Initial Data Upload</h3>
                    <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center flex flex-col items-center justify-center hover:border-orange-400 transition-colors">
                      <svg className="w-16 h-16 text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v9"></path>
                      </svg>
                      <p className="text-gray-400 text-lg">Drag & Drop Files Here</p>
                      <p className="text-orange-400 font-medium text-lg">or Click to Upload</p>
                    </div>
                  </div>
                  <div className="space-y-4 mt-6">
                    <div>
                      <label htmlFor="geological-surveys-upload" className="w-full bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-orange-600 transition duration-200 block text-center cursor-pointer">
                        Upload Geological Surveys
                      </label>
                      <input id="geological-surveys-upload" type="file" className="hidden" onChange={(e) => handleFileChange(e, "geologicalSurveys")} />
                      {uploadedFiles.geologicalSurveys && (
                        <p className="mt-2 text-sm text-gray-400 truncate">File: {uploadedFiles.geologicalSurveys.name}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="topography-maps-upload" className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-200 block text-center cursor-pointer">
                        Upload Topography Maps
                      </label>
                      <input id="topography-maps-upload" type="file" className="hidden" onChange={(e) => handleFileChange(e, "topographyMaps")} />
                      {uploadedFiles.topographyMaps && (
                        <p className="mt-2 text-sm text-gray-400 truncate">File: {uploadedFiles.topographyMaps.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-gray-300 font-medium mb-1 mt-4">
                        Date of Data Collection
                      </label>
                      <input type="date" name="dataCollectionDate" value={formData.dataCollectionDate} onChange={handleChange}
                        className="w-full p-2 border border-slate-600 bg-slate-700/50 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 [&::-webkit-calendar-picker-indicator]:invert"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="bg-orange-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-orange-600 transition duration-200 flex items-center"
              >
                Submit & Analyze Data
                <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                  <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default memo(Input);
