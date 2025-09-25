from flask import Flask, request, jsonify
import tensorflow as tf
import joblib
import numpy as np
import pandas as pd
import sklearn 

# Initialize Flask app
app = Flask(__name__)

# Load preprocessor and model
preprocessor = joblib.load("preprocessor.joblib")
model = tf.keras.models.load_model("rockfall_model.h5")

# Example feature order
categorical_features = ['Rock_Type', 'Soil_Type', 'Season']
numerical_features = ['Slope_deg', 'Distance_to_fault_km', 'Rock_Volume_m3', 'Prior_Events']

@app.route('/')
def home():
    return "Rockfall Susceptibility Prediction API is running 🚀"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON input
        data = request.get_json()

        # Convert input to DataFrame
        input_df = pd.DataFrame([data], columns=numerical_features + categorical_features)

        # Preprocess input
        processed_input = preprocessor.transform(input_df)

        # Predict
        prediction = model.predict(processed_input)
        result = float(prediction[0][0])

        return jsonify({"Susceptibility_Score": result})

    except Exception as e:
        return jsonify({"error": str(e)})


if __name__ == '__main__':
    app.run(debug=True)
