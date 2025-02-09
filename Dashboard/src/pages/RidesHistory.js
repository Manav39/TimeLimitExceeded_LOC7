import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Import Firestore
import { collection, query, where, getDocs } from "firebase/firestore";

const RidesHistory = () => {
  const [rides, setRides] = useState([]);
  const driverEmail = localStorage.getItem("driverEmail"); // Get driver email from localStorage

  useEffect(() => {
    const fetchRidesHistory = async () => {
      if (!driverEmail) return;

      const q = query(
        collection(db, "history"),
        where("driverEmail", "==", driverEmail)
      );
      const querySnapshot = await getDocs(q);

      const rideHistory = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setRides(rideHistory);
    };

    fetchRidesHistory();
  }, [driverEmail]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">🕒 Ride History</h1>
      {rides.length === 0 ? (
        <p className="text-gray-500">No previous rides found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rides.map((ride) => (
            <div
              key={ride.id}
              className="p-4 border rounded-lg shadow-sm bg-white"
            >
              <h3 className="text-lg font-semibold">
                📅 {new Date(ride.timestamp * 1000).toLocaleDateString()}
              </h3>
              <p className="text-sm text-gray-600">📍 {ride.destination}</p>
              <p className="text-sm font-bold mt-2">
                🚑 Ambulance: {ride.ambulanceNumber}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RidesHistory;
