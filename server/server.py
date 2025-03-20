from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os


app = Flask(__name__)
CORS(app)  # Allow all origins for dev

@app.route("/api/products", methods=["GET"])
def get_products():
    try:
        file_path = os.path.join(os.path.dirname(__file__), "products.json")
        with open (file_path, "r") as file:
            products = json.load(file)
        return jsonify(products)
    except Exception as e:
        return jsonify({"error": "Failed to load products", "details": str(e)}), 500

@app.route("/send", methods=["POST"])
def receive_data():
    data = request.json  # Get JSON data from frontend
    print("Received:", data)
    return jsonify({"message": "Data received!", "your_data": data})

@app.route("/get", methods=["GET"])
def send_data():
    return jsonify({"message": "Hello from Flask!"})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
