import React, { useState, useEffect } from "react";
import { MapPin, Hospital, PhoneCall, Star, Map, RefreshCcw } from "lucide-react";

const API_KEY = process.env.REACT_APP_GOOGLE_PLACES_API_KEY;
const latitude = 19.1072258;
const longitude = 72.8372432;
const radius = 5000; // 5km range

const HospitalCard = ({ name, vicinity, rating, userRatings, placeId, photoRef, plusCode }) => {
  // Construct hospital image URL
  const photoUrl = photoRef
    ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${API_KEY}`
    : "https://via.placeholder.com/400?text=No+Image"; // Fallback image

  // Construct Google Maps directions URL
  const googleMapsUrl = `https://www.google.com/maps/place/?q=place_id:${placeId}`;

  return (
    <div className="p-4 border rounded-lg shadow-sm flex flex-col min-h-[400px]">
      {/* Hospital Image */}
      <img src={photoUrl} alt={name} className="w-full h-40 object-cover rounded-lg mb-3" />

      {/* Header */}
      <div className="flex items-center mb-3">
        <Hospital className="h-8 w-8 text-red-600 mr-3" />
        <h3 className="font-semibold text-lg">{name}</h3>
      </div>

      {/* Location */}
      <p className="text-sm flex items-center">
        <MapPin className="h-4 w-4 text-gray-500 mr-2" />
        {vicinity}
      </p>

      {/* Plus Code (Approximate Area) */}
      {plusCode && (
        <p className="text-xs text-gray-500 mt-1">📍 {plusCode}</p>
      )}

      {/* Ratings */}
      <div className="flex items-center mt-2">
        <Star className="h-4 w-4 text-yellow-500" />
        <span className="text-sm text-gray-700 ml-1">{rating || "N/A"}</span>
        {userRatings && <span className="text-xs text-gray-500 ml-2">({userRatings} reviews)</span>}
      </div>

      {/* Actions */}
      <div className="mt-auto flex justify-between items-center">
        <a href={`tel:+91XXXXXXXXXX`} className="text-white bg-blue-600 px-3 py-2 rounded shadow text-sm hover:bg-blue-700 flex items-center">
          <PhoneCall className="h-4 w-4 mr-2" />
          Call Now
        </a>
        <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer"
          className="text-white bg-green-600 px-3 py-2 rounded shadow text-sm hover:bg-green-700 flex items-center">
          <Map className="h-4 w-4 mr-2" />
          Get Directions
        </a>
      </div>
    </div>
  );
};

const Hospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/api/hospitals?lat=${latitude}&lng=${longitude}`
        );
        const data = await response.json();

        if (data.results) {
          // Filter out non-operational hospitals and show only open ones
          const openHospitals = data.results.filter(
            (hospital) => hospital.business_status === "OPERATIONAL" && hospital.opening_hours?.open_now
          );
          setHospitals(openHospitals);
        } else {
          setError("No hospitals found.");
        }
      } catch (err) {
        setError("Failed to fetch hospitals.");
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Nearby Open Hospitals</h1>
        <button
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
          onClick={() => window.location.reload()}
        >
          <RefreshCcw className="h-4 w-4 mr-2" />
          Refresh
        </button>
      </div>

      {/* Google Map Placeholder */}
      <div className="h-64 w-full bg-gray-200 flex items-center justify-center rounded-lg">
        <p className="text-gray-500">Google Map Display Here</p>
      </div>

      {/* Loading State */}
      {loading && <p className="text-gray-500">Loading hospitals...</p>}

      {/* Error State */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Hospital List */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {hospitals.length > 0 ? (
            hospitals.map((hospital, index) => (
              <HospitalCard
                key={index}
                name={hospital.name}
                vicinity={hospital.vicinity}
                rating={hospital.rating}
                userRatings={hospital.user_ratings_total}
                placeId={hospital.place_id}
                photoRef={hospital.photos?.[0]?.photo_reference}
                plusCode={hospital.plus_code?.compound_code}
              />
            ))
          ) : (
            <p className="text-gray-500">No open hospitals available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Hospitals;
