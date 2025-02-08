import { useEffect, useState, useCallback } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const libraries = ["places"]; // Load Places API
const mapContainerStyle = { width: "100vw", height: "100vh" };
const options = { disableDefaultUI: false, zoomControl: true };

// Default location: Mumbai
const defaultLocation = { lat: 19.076, lng: 72.8777 };

// Generate random nearby locations
const generateRandomLocations = (baseLocation, count = 10, radius = 0.02) => {
  return Array.from({ length: count }, (_, i) => ({
    lat: baseLocation.lat + (Math.random() * 2 - 1) * radius,
    lng: baseLocation.lng + (Math.random() * 2 - 1) * radius,
    id: `ambulance-${i}`,
  }));
};

const GoogleMapComponent = ({ apiKey }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries,
  });

  const [hospitals, setHospitals] = useState([]);
  const [ambulances, setAmbulances] = useState([]);

  // Fetch hospitals (useCallback to prevent unnecessary re-renders)
  const fetchNearbyHospitals = useCallback((lat, lng) => {
    if (!window.google || !window.google.maps) return;

    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );

    const request = {
      location: { lat, lng },
      radius: 5000, // Search within 5 km
      type: "hospital",
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        console.log("Hospitals Found:", results);
        setHospitals(results);
      } else {
        console.error("No hospitals found or error fetching:", status);
      }
    });
  }, []);

  // Fetch hospitals & generate random ambulance locations
  useEffect(() => {
    if (isLoaded) {
      fetchNearbyHospitals(defaultLocation.lat, defaultLocation.lng);
      setAmbulances(generateRandomLocations(defaultLocation, 10, 0.02));
    }
  }, [isLoaded, fetchNearbyHospitals]);

  if (loadError) return <p>Error loading maps</p>;
  if (!isLoaded) return <p>Loading...</p>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={14}
      center={defaultLocation} // Fixed map location
      options={options}
    >
      {/* Default Marker (User's Location - Mumbai) */}
      <Marker position={defaultLocation} label="You" />

      {/* Nearby Hospitals Markers */}
      {hospitals.map((hospital) => (
        <Marker
          key={hospital.place_id}
          position={{
            lat: hospital.geometry.location.lat(),
            lng: hospital.geometry.location.lng(),
          }}
          label="H"
        />
      ))}

      {/* Ambulance Markers */}
      {ambulances.map((marker) => (
        <Marker
          key={marker.id}
          position={{ lat: marker.lat, lng: marker.lng }}
          icon={{
            url: "https://img.freepik.com/premium-vector/ambulance-emergency-medical-services-cartoon-ambulance-ambulance-icon-vector-illustration_1234575-9079.jpg",
            scaledSize: new window.google.maps.Size(40, 40),
          }}
        />
      ))}
    </GoogleMap>
  );
};

export default GoogleMapComponent;
