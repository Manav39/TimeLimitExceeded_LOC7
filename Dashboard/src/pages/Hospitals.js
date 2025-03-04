import React, { useState, useEffect } from "react";
import {
  MapPin,
  Hospital,
  PhoneCall,
  Star,
  RefreshCcw,
  Filter,
  Navigation,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_KEY = process.env.REACT_APP_GOOGLE_PLACES_API_KEY;
const latitude = 19.1072258;
const longitude = 72.8372432;
const hospitalImages = [
  "https://th.bing.com/th/id/OIP.Ie2QgToJYsLdNPyn5_o96QHaFr?rs=1&pid=ImgDetMain",  
  "https://wallpaperaccess.com/full/4113244.jpg",
  "https://th.bing.com/th/id/R.631cb60dc3126c0daee552dff2020753?rik=9FYEMdiyo%2faxaA&riu=http%3a%2f%2fupload.wikimedia.org%2fwikipedia%2fcommons%2f8%2f8a%2fNationwide_Childrens_Hospital%2c_Exterior_from_Fragrance_Maze%2c_May_2013.jpg&ehk=CgubPHMq4mvuTvJ5b%2bNaUJdf9J7nJLYzHWrYAOXef%2bo%3d&risl=1&pid=ImgRaw&r=0",  
  "https://th.bing.com/th/id/OIP.gRGkO9mkKSSZMIPNsCnLuwHaKR?w=577&h=800&rs=1&pid=ImgDetMain",
]; // Added image URLs here

const DEFAULT_HOSPITAL_IMAGE =
  "https://www.kokilabenhospital.com/images/hospital1.png"; // Fallback image

const HospitalCard = ({
  name,
  vicinity,
  rating,
  userRatings,
  phone,
  placeId,
  photoRef,
  plusCode,
  lat,
  lng,
}) => {
  const navigate = useNavigate();

  // Function to pick a random hospital image
  const randomImage = hospitalImages[Math.floor(Math.random() * hospitalImages.length)];

  console.log("img,..", randomImage);

  // Function to navigate to the Ambulance page with source and destination
  const handleNavigateToAmbulance = () => {
    const source = `${latitude},${longitude}`;
    const destination = `${lat},${lng}`;
    navigate(`/ambulance?source=${source}&destination=${destination}`);
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm flex flex-col min-h-[460px]">
      {/* Hospital Image */}
      <img
        src={randomImage}
        alt={name}
        className="w-full h-40 object-contain rounded-lg mb-3"
      />

      {/* Header */}
      <div className="flex items-center mb-3">
        <Hospital className="h-8 w-8 text-red-600 mr-3 flex-shrink-0" />
        <h3 className="font-semibold text-lg flex-1">{name}</h3>
      </div>

      {/* Location */}
      <p className="text-sm flex items-center">
        <MapPin className="h-4 w-4 text-gray-500 mr-2" />
        {vicinity}
      </p>

      {/* Plus Code (Approximate Area) */}
      {plusCode && <p className="text-xs text-gray-500 mt-1">📍 {plusCode}</p>}

      {/* Ratings */}
      <div className="flex items-center mt-2">
        <Star className="h-4 w-4 text-yellow-500" />
        <span className="text-sm text-gray-700 ml-1">{rating || "N/A"}</span>
        {userRatings && (
          <span className="text-xs text-gray-500 ml-2">
            ({userRatings} reviews)
          </span>
        )}
      </div>

      {/* Phone Number */}
      <p className="text-sm mt-1 font-semibold">📞 {phone}</p>

      {/* Actions */}
      <div className="mt-auto flex justify-between items-center space-x-2">
        <a
          href={`tel:${phone}`}
          className="flex items-center justify-center text-white bg-blue-600 px-3 py-2 rounded shadow text-sm hover:bg-blue-700 w-1/2"
        >
          <PhoneCall className="h-4 w-4 mr-2" />
          Call
        </a>
        <button
          onClick={handleNavigateToAmbulance}
          className="flex items-center justify-center text-white bg-green-600 px-3 py-2 rounded shadow text-sm hover:bg-green-700 w-1/2"
        >
          <Navigation className="h-4 w-4 mr-2" />
          Add to Destination
        </button>
      </div>
    </div>
  );
};

const Hospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/api/hospitals?lat=${latitude}&lng=${longitude}`
        );
        const data = await response.json();

        if (Array.isArray(data)) {
          setHospitals(data);
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

  // Extract all unique specialties from hospitals
  const specialties = Array.from(
    new Set(hospitals.flatMap((hospital) => hospital.types))
  );

  // Filter hospitals by specialty
  const filteredHospitals = selectedSpecialty
    ? hospitals.filter((hospital) => hospital.types.includes(selectedSpecialty))
    : hospitals;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Nearby Open Hospitals</h1>
        <button
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
          onClick={() => window.location.reload()}
          style={{ backgroundColor: "#ff0000" }}
        >
          <RefreshCcw className="h-4 w-4 mr-2" style={{ color: "white" }} />
          Refresh
        </button>
      </div>

      {/* Filter Dropdown */}
      <div className="flex gap-4">
        <div className="relative">
          <Filter className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
          <select
            className="pl-10 p-2 border rounded-lg shadow-sm text-gray-700"
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
          >
            <option value="">All Specialties</option>
            {specialties.map((specialty, index) => (
              <option key={index} value={specialty}>
                {specialty.replace("_", " ").toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading State */}
      {loading && <p className="text-gray-500">Loading hospitals...</p>}

      {/* Error State */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Hospital List */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredHospitals.length > 0 ? (
            filteredHospitals.map((hospital, index) => (
              <HospitalCard
                key={index}
                name={hospital.name}
                vicinity={hospital.vicinity}
                rating={hospital.rating}
                userRatings={hospital.user_ratings_total}
                phone={hospital.phone}
                placeId={hospital.place_id}
                photoRef={hospital.photo_reference}
                plusCode={hospital.plus_code}
                lat={hospital.lat}
                lng={hospital.lng}
              />
            ))
          ) : (
            <p className="text-gray-500">No hospitals available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Hospitals;
