import { useEffect, useState, useCallback } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  TrafficLayer,
  useLoadScript,
} from "@react-google-maps/api";

const GOOGLE_MAPS_API = "AIzaSyCNw9GjD1I5pYYkCyl7omRtbRftzoftOCc";
const libraries = ["places"];
const mapContainerStyle = { width: "100vw", height: "100vh" };
const options = { disableDefaultUI: false, zoomControl: true };

// Default location: Mumbai
const defaultLocation = { lat: 19.076, lng: 72.8777 };

const generateRandomLocations = (baseLocation, count = 10, radius = 0.02) => {
  return Array.from({ length: count }, (_, i) => ({
    lat: baseLocation.lat + (Math.random() * 2 - 1) * radius,
    lng: baseLocation.lng + (Math.random() * 2 - 1) * radius,
    id: `ambulance-${i}`,
  }));
};

const GoogleMapComponent = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API,
    libraries,
  });

  const [ambulances, setAmbulances] = useState([]);
  const [directions, setDirections] = useState(null);
  const [hoveredAmbulance, setHoveredAmbulance] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  console.log(distance, duration);

  // Fetch route from ambulance to user location
  const fetchRoute = useCallback((ambulance) => {
    if (!window.google || !window.google.maps) return;

    const directionsService = new window.google.maps.DirectionsService();
    const request = {
      origin: { lat: ambulance.lat, lng: ambulance.lng },
      destination: defaultLocation,
      travelMode: window.google.maps.TravelMode.DRIVING,
      drivingOptions: {
        departureTime: new Date(), // Use real-time traffic conditions
        trafficModel: "bestguess", // "bestguess", "optimistic", "pessimistic"
      },
    };

    directionsService.route(request, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        setDirections(result);
        setDistance(result.routes[0].legs[0].distance.text);
        setDuration(result.routes[0].legs[0].duration.text); // Extract ETA
      } else {
        console.error("Error fetching directions:", status);
      }
    });
  }, []);

  // Initialize ambulances on load
  useEffect(() => {
    if (isLoaded) {
      setAmbulances(generateRandomLocations(defaultLocation, 10, 0.02));
    }
  }, [isLoaded]);

  if (loadError) return <p>Error loading maps</p>;
  if (!isLoaded) return <p>Loading...</p>;

  return (
    <>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={defaultLocation}
        options={options}
      >
        {/* Traffic Layer */}
        <TrafficLayer />

        {/* User Location */}
        <Marker position={defaultLocation} label="You" />

        {/* Ambulances */}
        {ambulances.map((ambulance) => (
          <Marker
            key={ambulance.id}
            position={{ lat: ambulance.lat, lng: ambulance.lng }}
            icon={{
              url: "https://img.freepik.com/premium-vector/ambulance-emergency-medical-services-cartoon-ambulance-ambulance-icon-vector-illustration_1234575-9079.jpg",
              scaledSize: new window.google.maps.Size(40, 40),
            }}
            onMouseOver={() => {
              setHoveredAmbulance(ambulance);
              fetchRoute(ambulance);
            }}
            onMouseOut={() => {
              setHoveredAmbulance(null);
              setDirections(null);
              setDistance("");
              setDuration("");
            }}
          />
        ))}

        {/* Display Route */}
        {directions && <DirectionsRenderer directions={directions} />}

        {/* Show Distance & ETA when hovering */}
        {hoveredAmbulance && (
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              backgroundColor: "white",
              padding: "8px",
              borderRadius: "5px",
              boxShadow: "0px 0px 5px rgba(0,0,0,0.2)",
              color: "black",
            }}
          >
            <p>🚑 Distance: {distance}</p>
            <p>⏳ Estimated Arrival: {duration}</p>
          </div>
        )}
      </GoogleMap>
    </>
  );
};

export default GoogleMapComponent;
