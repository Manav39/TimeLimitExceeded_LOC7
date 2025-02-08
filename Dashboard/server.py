from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

GOOGLE_PLACES_API_KEY = os.getenv("GOOGLE_PLACES_API_KEY")

@app.route("/api/hospitals", methods=["GET"])
def get_hospitals():
    try:
        lat = request.args.get("lat", default="19.1072258")  # Default Latitude
        lng = request.args.get("lng", default="72.8372432")  # Default Longitude
        radius = 5000  # 5km range

        google_api_url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={lat},{lng}&radius={radius}&type=hospital&key={GOOGLE_PLACES_API_KEY}"

        response = requests.get(google_api_url)
        data = response.json()

        return jsonify(data)  # Return JSON response to frontend

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
