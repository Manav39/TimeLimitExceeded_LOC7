import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../firebase"; // Import Firestore
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useLoadScript,
} from "@react-google-maps/api";
import Razorpay from "razorpay";

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

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const savePaymentDetails = async (paymentId, orderId, amount) => {
    try {
      const userEmail = localStorage.getItem("userEmail") || "user@example.com";
      const userName = localStorage.getItem("userName") || "User";
      const userMobile = localStorage.getItem("userMobile") || "9876543210";
      const driverEmail =
        localStorage.getItem("driverEmail") || "driver@example.com";

      await addDoc(collection(db, "payments"), {
        userEmail: userEmail,
        userName: userName,
        userMobile: userMobile,
        driverEmail: driverEmail,
        amount: amount / 100, // Convert paise to INR
        currency: "INR",
        paymentId: paymentId,
        orderId: orderId,
        status: "Success",
        timestamp: new Date(),
        userLocation: { lat: src[0], long: src[1] },
        hospitalLocation: { lat: dst[0], long: dst[1] },
        driverLocation: { lat: driverLat, long: driverLong },
      });

      console.log("✅ Payment details saved successfully!");
    } catch (error) {
      console.error("❌ Error saving payment details:", error);
    }
  };

  const [paymentCompleted, setPaymentCompleted] = useState(false); // Track payment status

  const handlePay = async (e) => {
    e.preventDefault();

    // Load Razorpay dynamically
    const razorpayLoaded = await loadRazorpay();
    if (!razorpayLoaded) {
      alert("Failed to load Razorpay. Please check your internet connection.");
      return;
    }

    // Fetch order details from backend
    const response = await fetch("http://localhost:3000/pay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: 50000, // Amount in paise (₹500)
        currency: "INR",
      }),
    });

    const order = await response.json();

    if (!order.id) {
      alert("Failed to create order. Please try again.");
      return;
    }

    var options = {
      key: "rzp_test_RCqZF0EIXUQt7G", // Razorpay Test Key
      amount: order.amount,
      currency: order.currency,
      name: "Ambulance Booking",
      description: "Ambulance Charge",
      image: "https://img.icons8.com/color/48/000000/ambulance.png",
      order_id: order.id,
      handler: async function (res) {
        alert("Payment Successful! Payment ID: " + res.razorpay_payment_id);

        // ✅ Store payment details in Firestore
        await savePaymentDetails(
          res.razorpay_payment_id,
          order.id,
          order.amount
        );

        // ✅ Change button text to "Payment Done"
        setPaymentCompleted(true);
      },
      prefill: {
        name: localStorage.getItem("userName") || "User",
        email: localStorage.getItem("userEmail") || "user@example.com",
        contact: localStorage.getItem("userMobile") || "9876543210",
      },
      theme: {
        color: "#ff0000",
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (res) {
      alert("Payment Failed: " + res.error.description);
    });

    rzp1.open();
  };

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
              className={`w-full p-3 mt-30 ${
                paymentCompleted
                  ? "bg-gray-500"
                  : "bg-red-500 hover:bg-green-700"
              } text-white font-semibold rounded-lg`}
              onClick={handlePay}
              disabled={paymentCompleted} // Disable button after successful payment
            >
              {paymentCompleted ? "Payment Done" : "Make Payment"}
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
