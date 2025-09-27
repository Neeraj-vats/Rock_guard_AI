import requests

# URL of your running Flask app
url = "http://127.0.0.1:5000/predict"

# Example input data (must match training features)
data = {
    "Latitude": 26.872701,
    "Longitude": 87.903895,
    "Elevation_m": 1206.469918,
    "Slope_deg": 12.637969,
    "Distance_to_fault_km":7.955506,
    "Rock_Hardness": 7.194709,
    "Fracture_Density": 0.156296,
    "Rainfall_mm": 130.351581,
    "Temperature_C": 35,
    "Wind_speed_kmh": 15.014921,
    "NDVI": 0.107810,
    "Rock_Size_cm": 95.777653,
    "Rock_Volume_m3": 0.717936	,
    "Rock_Velocity_mps": 2.046624,
    "Prior_Events": 0,
    "Land_Cover": "Bare",
    "Vegetation": "Sparse",
    "Rock_Type": "Igneous",
    "Soil_Type": "Clay",
    "Season": "Winter"
}

# Send POST request
response = requests.post(url, json=data)

# Print the response
print(response.json())
