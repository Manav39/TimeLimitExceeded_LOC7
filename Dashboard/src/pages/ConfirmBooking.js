import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../firebase"; // Import Firestore
import { collection, query, where, getDocs } from "firebase/firestore";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useLoadScript,
} from "@react-google-maps/api";

const GOOGLE_MAPS_API = "AIzaSyCNw9GjD1I5pYYkCyl7omRtbRftzoftOCc";
const libraries = ["places"];
const mapContainerStyle = { width: "100%", height: "500px" };
const options = { disableDefaultUI: false, zoomControl: true };

const ConfirmBooking = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const driverLat = parseFloat(params.get("lat"));
  const driverLong = parseFloat(params.get("long"));
  const src = params.get("src").split(",").map(Number); // User's location (lat, long)
  const dst = params.get("dst").split(",").map(Number); // Hospital location (lat, long)

  const [directions, setDirections] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: src[0], lng: src[1] });
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [confirmStatus, setConfirmStatus] = useState("No"); // Default status: "No"
  const driverEmail = localStorage.getItem("driverEmail"); // Fetch driver email from localStorage

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API,
    libraries,
  });

  // Fetch ride confirmation status from Firestore
  useEffect(() => {
    const fetchRideStatus = async () => {
      if (!driverEmail) return;

      const q = query(
        collection(db, "rides"),
        where("email", "==", driverEmail)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const rideData = querySnapshot.docs[0].data();
        setConfirmStatus(rideData.confirm); // Update confirm status
      }
    };

    fetchRideStatus();

    // Poll for status update every 5 seconds
    const interval = setInterval(fetchRideStatus, 5000);
    return () => clearInterval(interval);
  }, [driverEmail]);

  useEffect(() => {
    if (!window.google || !window.google.maps) return;

    const directionsService = new window.google.maps.DirectionsService();

    // Create route: Driver → User → Hospital
    const request = {
      origin: { lat: driverLat, lng: driverLong },
      waypoints: [{ location: { lat: src[0], lng: src[1] }, stopover: true }],
      destination: { lat: dst[0], lng: dst[1] },
      travelMode: window.google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        setDirections(result);

        // Extract distance & duration
        const route = result.routes[0].legs;
        const totalDistance =
          route.reduce((sum, leg) => sum + leg.distance.value, 0) / 1000; // Convert to KM
        const totalDuration =
          route.reduce((sum, leg) => sum + leg.duration.value, 0) / 60; // Convert to Minutes

        setDistance(`${totalDistance.toFixed(2)} km`);
        setDuration(`${totalDuration.toFixed(0)} mins`);
      }
    });

    // Set the map center only once
    setMapCenter({ lat: src[0], lng: src[1] });
  }, [driverLat, driverLong, src, dst]);

  if (loadError) return <p>Error loading maps</p>;
  if (!isLoaded) return <p>Loading...</p>;

  return (
    <>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Confirm Your Booking</h1>
        <div className="mt-4 text-center">
          {confirmStatus === "No" ? (
            <p className="text-red-500 mt-30 text-lg font-medium">
              ⏳ Waiting for the rider to confirm...
            </p>
          ) : (
            <button
              className="w-full p-3 mt-30 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
              onClick={() => alert("Redirecting to Payment")}
            >
              Make Payment
            </button>
          )}
        </div>
        <p className="text-lg">🚑 Route Overview:</p>

        {/* Distance and Duration */}
        <div className="mt-2 p-3 bg-gray-100 rounded-lg">
          <p className="text-md font-medium">Total Distance: {distance}</p>
          <p className="text-md font-medium">Estimated Time: {duration}</p>
        </div>

        {/* Google Map */}
        <div className="w-full h-96 mt-4">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={13}
            center={mapCenter} // Fixed center
            options={options}
          >
            {/* Driver Marker */}
            <Marker
              position={{ lat: driverLat, lng: driverLong }}
              icon={{
                url: "https://img.icons8.com/color/48/000000/ambulance.png",
                scaledSize: new window.google.maps.Size(40, 40),
              }}
            />
            {/* User Location Marker */}
            <Marker
              position={{ lat: src[0], lng: src[1] }}
              icon={{
                url: "https://img.icons8.com/color/48/000000/user-location.png",
                scaledSize: new window.google.maps.Size(40, 40),
              }}
            />
            {/* Hospital Marker */}
            <Marker
              position={{ lat: dst[0], lng: dst[1] }}
              icon={{
                url: "https://img.icons8.com/color/48/000000/hospital.png",
                scaledSize: new window.google.maps.Size(40, 40),
              }}
            />

            {/* Render Directions */}
            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>
        </div>

        {/* Payment Button */}
      </div>
    </>
  );
};

export default ConfirmBooking;
