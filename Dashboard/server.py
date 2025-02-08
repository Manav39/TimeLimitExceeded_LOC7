import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

GOOGLE_PLACES_API_KEY = os.getenv("GOOGLE_PLACES_API_KEY")

@app.route("/api/hospitals", methods=["GET"])
def get_hospitals():
    try:
        lat = request.args.get("lat", default="19.1072258")
        lng = request.args.get("lng", default="72.8372432")
        radius = 5000
        google_api_url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={lat},{lng}&radius={radius}&type=hospital&key={GOOGLE_PLACES_API_KEY}"

        response = requests.get(google_api_url)
        data = response.json()

        hospitals = []
        for hospital in data.get("results", []):
            if hospital.get("business_status") == "OPERATIONAL" and hospital.get("opening_hours", {}).get("open_now"):

                place_id = hospital.get("place_id")
                details_url = f"https://maps.googleapis.com/maps/api/place/details/json?place_id={place_id}&fields=name,formatted_phone_number&key={GOOGLE_PLACES_API_KEY}"
                details_response = requests.get(details_url).json()

                location = hospital.get("geometry", {}).get("location", {})
                hospital_lat = location.get("lat")
                hospital_lng = location.get("lng")

                hospitals.append({
                    "name": hospital.get("name"),
                    "vicinity": hospital.get("vicinity"),
                    "place_id": hospital.get("place_id"),
                    "rating": hospital.get("rating"),
                    "user_ratings_total": hospital.get("user_ratings_total"),
                    "photo_reference": hospital.get("photos", [{}])[0].get("photo_reference"),
                    "plus_code": hospital.get("plus_code", {}).get("compound_code"),
                    "types": hospital.get("types", []),
                    "phone": details_response.get("result", {}).get("formatted_phone_number", "Not Available"),
                    "lat": hospital_lat,  
                    "lng": hospital_lng   
                })

        return jsonify(hospitals)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
