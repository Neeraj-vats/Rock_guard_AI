const mongoose = require("mongoose");
require('dotenv').config(); // To manage environment variables

// --- MongoDB Connection --- //
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/geohazardDB";

mongoose.connect(mongoURI)
    .then(() => console.log("Successfully connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));


// --- Mongoose Schemas & Models --- //

// User Schema for storing login information
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: { // This will be the hashed password
        type: String,
        required: true,
    }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

// GeoData Schema for storing the form data
const GeoDataSchema = new mongoose.Schema({
    siteName: String,
    location: String,
    mineType: String,
    name: String,
    workEmail: String,
    phoneNumber: String,
    dataCollectionDate: Date,
    latitude: String,
    longitude: String,
    elevation: String,
    slope_deg: String,
    aspect_deg: String,
    distance_to_rock: String,
    rock_type: String,
    soil_type: String,
    lithology: String,
    rock_hardness: String,
    fracture: String,
    rainfall_mm: String,
    snow_mm: String,
    temperature: String,
    wind_speed: String,
    humidity: String,
    vegetation: String,
    land_cover: String,
    ndvi: String,
    rock_size: String,
    rock_volume: String,
    rock_velocity: String,
    month: String,
    season: String,
    hazard_level: String,
    geologicalSurveyUrl: String,
    topographyMapUrl: String,
}, { timestamps: true });

const GeoData = mongoose.model('GeoData', GeoDataSchema);

// Export the models to be used in other files
module.exports = {
    User,
    GeoData
};
