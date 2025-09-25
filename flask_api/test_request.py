import requests

# URL of your running Flask app
url = "http://127.0.0.1:5000/predict"

# Example input data
data = {
    "Slope_deg": 40,
    "Distance_to_fault_km": 2.5,
    "Rock_Volume_m3": 2.156,
    "Prior_Events": 3,
    "Rock_Type": "Metamorphic",
    "Soil_Type": "Clay",
    "Season": "winter"
}

# Send POST request
response = requests.post(url, json=data)

# Print the response
print(response.json())
