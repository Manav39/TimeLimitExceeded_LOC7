import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Ambulance as AmbulanceIcon, PhoneCall } from "lucide-react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import ConfirmBooking from "./ConfirmBooking";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  TrafficLayer,
  useLoadScript,
} from "@react-google-maps/api";

const GOOGLE_MAPS_API = "AIzaSyCNw9GjD1I5pYYkCyl7omRtbRftzoftOCc";
const libraries = ["places"];
const mapContainerStyle = { width: "100%", height: "400px" };
const options = { disableDefaultUI: false, zoomControl: true };
const defaultLocation = { lat: 19.076, lng: 72.8777 };

const AmbulanceCard = ({ ambulance, isSelected, onSelect }) => {
  return (
    <div
      className={`p-4 border rounded-lg shadow-sm bg-white cursor-pointer transition ${
        isSelected ? "border-2 border-red-500 bg-red-100" : ""
      }`}
      onClick={() => onSelect(ambulance)}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <AmbulanceIcon className="h-8 w-8 text-red-600 mr-3" />
          <div>
            <h3 className="font-semibold text-lg">{ambulance.name}</h3>
            <p className="text-sm text-gray-500">
              {ambulance.ambulanceType} Ambulance
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-2 text-sm">
        <p>
          <span className="font-medium text-gray-700">License:</span>{" "}
          {ambulance.license}
        </p>
        <p>
          <span className="font-medium text-gray-700">Ambulance No:</span>{" "}
          {ambulance.ambulanceNumber}
        </p>
        <p>
          <span className="font-medium text-gray-700">Category:</span>{" "}
          {ambulance.category}
        </p>
        <p className="text-sm flex items-center">
          <PhoneCall className="h-4 w-4 text-gray-500 mr-2" />
          <span className="text-blue-600">{ambulance.mobile}</span>
        </p>
      </div>
    </div>
  );
};

const GoogleMapComponent = ({ ambulances }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API,
    libraries,
  });

  if (loadError) return <p>Error loading maps</p>;
  if (!isLoaded) return <p>Loading...</p>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={14}
      center={defaultLocation}
      options={options}
    >
      <TrafficLayer />
      <Marker position={defaultLocation} label="You" />

      {ambulances.map((ambulance, index) => (
        <Marker
          key={index}
          position={{ lat: ambulance.lat, lng: ambulance.long }}
          icon={{
            url: "https://img.freepik.com/premium-vector/ambulance-emergency-medical-services-cartoon-ambulance-ambulance-icon-vector-illustration_1234575-9079.jpg",
            scaledSize: new window.google.maps.Size(40, 40),
          }}
        />
      ))}
    </GoogleMap>
  );
};

const Ambulances = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [ambulances, setAmbulances] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAmbulance, setSelectedAmbulance] = useState(null);

  useEffect(() => {
    const fetchAmbulances = async () => {
      const q = query(collection(db, "drivers"), where("status", "==", "A"));
      const querySnapshot = await getDocs(q);
      const ambulanceList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAmbulances(ambulanceList);
    };

    fetchAmbulances();
  }, []);

  const filteredAmbulances = ambulances.filter(
    (ambulance) =>
      (selectedType === "" || ambulance.ambulanceType === selectedType) &&
      (selectedCategory === "" || ambulance.category === selectedCategory)
  );

  const handleBookNow = () => {
    if (selectedAmbulance) {
      const params = new URLSearchParams(location.search);
      const src = params.get("source");
      const dst = params.get("destination");
      console.log(src, dst);
      navigate(
        `/confirm-booking?src=${src}&dst=${dst}&lat=${selectedAmbulance.lat}&long=${selectedAmbulance.long}`
      );
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Book an Ambulance</h1>
      <GoogleMapComponent ambulances={filteredAmbulances} />

      <div className="flex space-x-4">
        <select
          className="p-2 border rounded-lg"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="Private">Private</option>
          <option value="Government">Government</option>
        </select>

        <select
          className="p-2 border rounded-lg"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Normal">Normal</option>
          <option value="Oxygen">Oxygen</option>
          <option value="ICU">ICU</option>
          <option value="Dead Body">Dead Body</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredAmbulances.length > 0 ? (
          filteredAmbulances.map((ambulance) => (
            <AmbulanceCard
              key={ambulance.id}
              ambulance={ambulance}
              isSelected={selectedAmbulance?.id === ambulance.id}
              onSelect={setSelectedAmbulance}
            />
          ))
        ) : (
          <p className="text-gray-500">No ambulances available.</p>
        )}
      </div>

      {/* Book Now Button */}
      <button
        className={`w-full p-3 rounded-lg text-white font-semibold ${
          selectedAmbulance
            ? "bg-red-600 hover:bg-red-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
        onClick={handleBookNow}
        disabled={!selectedAmbulance}
      >
        Book Now
      </button>
    </div>
  );
};

export default Ambulances;
