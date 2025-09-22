import React, { useState } from "react";

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, fileType) => {
    setUploadedFiles({ ...uploadedFiles, [fileType]: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    console.log("Uploaded Files:", uploadedFiles);
    // Use a custom modal or message box instead of alert()
    // For this example, we'll just log to the console
    console.log("Form submitted! Check console for values.");
  };

  const MineTypeRadio = ({ label, value, name, checked, onChange }) => (
    <label className="inline-flex items-center">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="form-radio h-4 w-4 text-green-600 rounded-full"
      />
      <span className="ml-2 text-gray-200">{label}</span>
    </label>
  );

  const InputField = ({ label, name, type = "text", value, onChange }) => (
    <div>
      <label className="block text-gray-200 font-medium mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 border border-gray-600 bg-transparent text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#56F000] [&::-webkit-calendar-picker-indicator]:invert"
      />
    </div>
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#181a29]">
      <div className="bg-[#2a2d3c] p-8 rounded-2xl shadow-lg w-full max-w-4xl">
        <h2 className="text-4xl font-light text-center mb-1 text-white">
          Input Mine Site Data
        </h2>
        <p className="text-center text-gray-400 mb-8">
          Please enter the required information and upload initial site files
        </p>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Site Information */}
              <div>
                <h3 className="text-xl font-medium mb-4 text-white">Site Information</h3>
                <div className="space-y-4">
                  <InputField
                    label="Mine Site Name"
                    name="siteName"
                    value={formData.siteName}
                    onChange={handleChange}
                  />
                  <InputField
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                  <div>
                    <label className="block text-gray-200 font-medium mb-2">
                      Mine Type
                    </label>
                    <div className="flex space-x-4">
                      <MineTypeRadio
                        label="Open Pit"
                        value="open-pit"
                        name="mineType"
                        checked={formData.mineType === "open-pit"}
                        onChange={handleChange}
                      />
                      <MineTypeRadio
                        label="Underground"
                        value="underground"
                        name="mineType"
                        checked={formData.mineType === "underground"}
                        onChange={handleChange}
                      />
                      <MineTypeRadio
                        label="Quarry"
                        value="quarry"
                        name="mineType"
                        checked={formData.mineType === "quarry"}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Geotechnical & Rock Data */}
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

            {/* Right Column */}
            <div className="space-y-6">
              {/* Contact Information */}
              <div>
                <h3 className="text-xl font-medium mb-4 text-white">Contact Information</h3>
                <div className="space-y-4">
                  <InputField label="Your Name" name="name" value={formData.name} onChange={handleChange} />
                  <InputField label="Work Email" name="workEmail" type="email" value={formData.workEmail} onChange={handleChange} />
                  <InputField label="Phone Number" name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleChange} />
                </div>
              </div>

              {/* Environmental & Seasonal Data */}
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

              {/* Rockfall-Specific Data */}
              <div className="mt-6">
                <h3 className="text-xl font-medium mb-4 text-white">Rockfall-Specific Data</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField label="Rock Size" name="rock_size" value={formData.rock_size} onChange={handleChange} />
                  <InputField label="Rock Volume" name="rock_volume" value={formData.rock_volume} onChange={handleChange} />
                  <InputField label="Rock Velocity" name="rock_velocity" value={formData.rock_velocity} onChange={handleChange} />
                </div>
              </div>
              
              {/* File Uploads Section */}
              <div className="mt-6">
                <h3 className="text-xl font-medium mb-4 text-white">Initial Data Upload</h3>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center flex flex-col items-center justify-center">
                  <svg
                    className="w-16 h-16 text-gray-400 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v9"
                    ></path>
                  </svg>
                  <p className="text-gray-400 text-lg">
                    Drag & Drop Files Here
                  </p>
                  <p className="text-[#56F000] font-medium text-lg">
                    or Click to Upload
                  </p>
                </div>
              </div>
              
              {/* Specific Upload Buttons and File Display */}
              <div className="space-y-4 mt-6">
                <div>
                  <label htmlFor="geological-surveys-upload" className="w-full bg-[#56F000] text-[#181a29] font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-[#46c900] transition duration-200 block text-center cursor-pointer">
                    Upload Geological Surveys
                  </label>
                  <input
                    id="geological-surveys-upload"
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, 'geologicalSurveys')}
                  />
                  {uploadedFiles.geologicalSurveys && (
                    <p className="mt-2 text-sm text-gray-400 truncate">File: {uploadedFiles.geologicalSurveys.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="topography-maps-upload" className="w-full bg-[#FFA500] text-[#181a29] font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-[#d68a00] transition duration-200 block text-center cursor-pointer">
                    Upload Topography Maps
                  </label>
                  <input
                    id="topography-maps-upload"
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, 'topographyMaps')}
                  />
                  {uploadedFiles.topographyMaps && (
                    <p className="mt-2 text-sm text-gray-400 truncate">File: {uploadedFiles.topographyMaps.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-200 font-medium mb-1 mt-4">
                    Date of Data Collection
                  </label>
                  <input
                    type="date"
                    name="dataCollectionDate"
                    value={formData.dataCollectionDate}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-600 bg-transparent text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#56F000] [&::-webkit-calendar-picker-indicator]:invert"
                  />
                </div>

              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-[#56F000] text-[#181a29] font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-[#46c900] transition duration-200 flex items-center"
            >
              Submit & Analyze Data
              <svg
                className="w-4 h-4 ml-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
                <path
                  fillRule="evenodd"
                  d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Input;
