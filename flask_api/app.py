from flask import Flask, request, jsonify
import tensorflow as tf
import joblib
import pandas as pd
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Load preprocessor and model
preprocessor = joblib.load("preprocessor.pkl")
model = tf.keras.models.load_model("rockfall_model.h5", compile=False)

# Features used during training
categorical_features = ["Rock_Type", "Soil_Type", "Vegetation", "Land_Cover", "Season"]

numerical_features = [
    "Latitude", "Longitude", "Elevation_m", "Slope_deg",
    "Distance_to_fault_km", "Rock_Hardness", "Fracture_Density",
    "Rainfall_mm", "Temperature_C", "Wind_speed_kmh", "NDVI",
    "Rock_Size_cm", "Rock_Volume_m3", "Rock_Velocity_mps",
    "Prior_Events"
]

all_features = numerical_features + categorical_features

@app.route('/')
def home():
    return "Rockfall Susceptibility Prediction API is running 🚀"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON input
        data = request.get_json()
        

        # Convert to DataFrame with correct columns
        input_df = pd.DataFrame([data], columns=all_features)
        print(input_df)

        # Cast types
        for col in numerical_features:
            input_df[col] = pd.to_numeric(input_df[col], errors="coerce")
        for col in categorical_features:
            input_df[col] = input_df[col].astype(str)

        # Preprocess input
        processed_input = preprocessor.transform(input_df)
        print("hello",processed_input)
        # Predict
        prediction = model.predict(processed_input)
        result = float(prediction[0][0])
        print(f"Predicted Susceptibility Score: {result}")

        return jsonify({"Susceptibility_Score": result})

    except Exception as e:
        return jsonify({"error": str(e)})


if __name__ == '__main__':
    app.run(debug=True)
