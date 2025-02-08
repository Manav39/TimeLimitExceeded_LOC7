import React, { useState, useEffect, useCallback } from "react";
import { Ambulance as AmbulanceIcon, PhoneCall } from "lucide-react";
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

const ambulanceData = [
  {
    name: "Driver 1",
    phone: "+917725686331",
    licenseNumber: "LIC959084",
    ambulanceNumber: "AMB5845",
    hospitalId: "hospital247",
    experience: "5 years",
    pastTrips: ["tripId50", "tripId75", "tripId68"],
    availabilityStatus: "available",
    location: { latitude: 12.9804, longitude: 77.5996 },
    is_ambulance_private: false,
    category: "Normal",
  },
  {
    name: "Driver 2",
    phone: "+919669579580",
    licenseNumber: "LIC289533",
    ambulanceNumber: "AMB4915",
    hospitalId: "hospital375",
    experience: "11 years",
    pastTrips: ["tripId39", "tripId58", "tripId74", "tripId44", "tripId93"],
    availabilityStatus: "busy",
    location: { latitude: 19.0744, longitude: 72.8741 },
    is_ambulance_private: true,
    category: "Oxygen",
  },
  {
    name: "Driver 3",
    phone: "+919677140748",
    licenseNumber: "LIC376861",
    ambulanceNumber: "AMB8740",
    hospitalId: "hospital344",
    experience: "4 years",
    pastTrips: ["tripId57", "tripId56", "tripId52"],
    availabilityStatus: "available",
    location: { latitude: 19.0773, longitude: 72.8737 },
    is_ambulance_private: false,
    category: "ICU",
  },
  {
    name: "Driver 4",
    phone: "+919953048694",
    licenseNumber: "LIC710313",
    ambulanceNumber: "AMB9124",
    hospitalId: "hospital325",
    experience: "11 years",
    pastTrips: ["tripId48", "tripId61"],
    availabilityStatus: "available",
    location: { latitude: 19.0765, longitude: 72.8689 },
    is_ambulance_private: true,
    category: "Dead Body",
  },
  {
    name: "Driver 5",
    phone: "+918796610482",
    licenseNumber: "LIC503130",
    ambulanceNumber: "AMB8041",
    hospitalId: "hospital398",
    experience: "10 years",
    pastTrips: ["tripId20", "tripId28"],
    availabilityStatus: "busy",
    location: { latitude: 12.974, longitude: 77.5895 },
    is_ambulance_private: true,
    category: "Normal",
  },
  {
    name: "Driver 6",
    phone: "+916408766932",
    licenseNumber: "LIC102474",
    ambulanceNumber: "AMB9060",
    hospitalId: "hospital208",
    experience: "6 years",
    pastTrips: ["tripId63", "tripId73"],
    availabilityStatus: "busy",
    location: { latitude: 19.0752, longitude: 72.8688 },
    is_ambulance_private: false,
    category: "Oxygen",
  },
  {
    name: "Driver 7",
    phone: "+916141931579",
    licenseNumber: "LIC573713",
    ambulanceNumber: "AMB9403",
    hospitalId: "hospital131",
    experience: "11 years",
    pastTrips: ["tripId94", "tripId28", "tripId12", "tripId80"],
    availabilityStatus: "available",
    location: { latitude: 12.9791, longitude: 77.5914 },
    is_ambulance_private: true,
    category: "ICU",
  },
  {
    name: "Driver 8",
    phone: "+917448979490",
    licenseNumber: "LIC389530",
    ambulanceNumber: "AMB9146",
    hospitalId: "hospital255",
    experience: "15 years",
    pastTrips: ["tripId74", "tripId96", "tripId25", "tripId18", "tripId88"],
    availabilityStatus: "available",
    location: { latitude: 12.9754, longitude: 77.5878 },
    is_ambulance_private: true,
    category: "Dead Body",
  },
  {
    name: "Driver 9",
    phone: "+916653042605",
    licenseNumber: "LIC452030",
    ambulanceNumber: "AMB1152",
    hospitalId: "hospital334",
    experience: "9 years",
    pastTrips: ["tripId65", "tripId59"],
    availabilityStatus: "available",
    location: { latitude: 12.97, longitude: 77.5879 },
    is_ambulance_private: true,
    category: "Normal",
  },
  {
    name: "Driver 10",
    phone: "+917804286419",
    licenseNumber: "LIC972125",
    ambulanceNumber: "AMB4758",
    hospitalId: "hospital228",
    experience: "12 years",
    pastTrips: ["tripId81", "tripId33"],
    availabilityStatus: "available",
    location: { latitude: 19.077, longitude: 72.8748 },
    is_ambulance_private: true,
    category: "Oxygen",
  },
];

const AmbulanceCard = ({
  name,
  phone,
  licenseNumber,
  ambulanceNumber,
  hospitalId,
  experience,
  availabilityStatus,
  is_ambulance_private,
}) => (
  <div className="p-4 border rounded-lg shadow-sm bg-white">
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center">
        <AmbulanceIcon className="h-8 w-8 text-blue-600 mr-3" />
        <div>
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-sm text-gray-500">
            {is_ambulance_private
              ? "Private Ambulance"
              : "Government Ambulance"}
          </p>
        </div>
      </div>
    </div>
    <div className="space-y-2 text-sm">
      <p>
        <span className="font-medium text-gray-700">Experience:</span>{" "}
        {experience}
      </p>
      <p>
        <span className="font-medium text-gray-700">License:</span>{" "}
        {licenseNumber}
      </p>
      <p>
        <span className="font-medium text-gray-700">Ambulance No:</span>{" "}
        {ambulanceNumber}
      </p>
      <p>
        <span className="font-medium text-gray-700">Hospital ID:</span>{" "}
        {hospitalId}
      </p>
      <p
        className={`text-sm font-semibold px-2 py-1 rounded-md ${
          availabilityStatus === "available"
            ? "bg-green-100 text-green-600"
            : "bg-red-100 text-red-600"
        }`}
      >
        {availabilityStatus}
      </p>
      <p className="text-sm flex items-center">
        <PhoneCall className="h-4 w-4 text-gray-500 mr-2" />
        <span className="text-blue-600">{phone}</span>
      </p>
    </div>
  </div>
);

const GoogleMapComponent = ({ ambulances }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API,
    libraries,
  });
  const [directions, setDirections] = useState(null);

  const fetchRoute = useCallback((ambulance) => {
    if (!window.google || !window.google.maps) return;
    const directionsService = new window.google.maps.DirectionsService();
    const request = {
      origin: {
        lat: ambulance.location.latitude,
        lng: ambulance.location.longitude,
      },
      destination: defaultLocation,
      travelMode: window.google.maps.TravelMode.DRIVING,
    };
    directionsService.route(request, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        setDirections(result);
      }
    });
  }, []);

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
          position={{
            lat: ambulance.location.latitude,
            lng: ambulance.location.longitude,
          }}
          icon={{
            url: "https://img.freepik.com/premium-vector/ambulance-emergency-medical-services-cartoon-ambulance-ambulance-icon-vector-illustration_1234575-9079.jpg",
            scaledSize: new window.google.maps.Size(40, 40),
          }}
          onClick={() => fetchRoute(ambulance)}
        />
      ))}
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
};

const Ambulances = () => {
  const [selectedType, setSelectedType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredAmbulances = ambulanceData.filter(
    (ambulance) =>
      (selectedType === "" ||
        ambulance.is_ambulance_private.toString() === selectedType) &&
      (selectedCategory === "" || ambulance.category === selectedCategory)
  );

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
          <option value="true">Private</option>
          <option value="false">Government</option>
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
          filteredAmbulances.map((ambulance, index) => (
            <AmbulanceCard key={index} {...ambulance} />
          ))
        ) : (
          <p className="text-gray-500">
            No ambulances available for the selected filters.
          </p>
        )}
      </div>
    </div>
  );
};

export default Ambulances;
