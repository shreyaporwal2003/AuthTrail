# app.py
from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model = joblib.load("behavior_model.pkl")

@app.route("/predict", methods=["POST"])

def predict():
    data = request.get_json()
    features = np.array(data["features"]).reshape(1, -1)

    

    result = model.predict(features)[0]
    return jsonify({
        "result": "FRAUDULENT" if result == 1 else "SAFE"
    })

if __name__ == "__main__":
    app.run(port=5001)
