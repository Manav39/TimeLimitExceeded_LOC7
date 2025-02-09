import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Import Firestore
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";

const DriverRequests = () => {
  const [requests, setRequests] = useState([]);
  const driverEmail = localStorage.getItem("driverEmail"); // Get driver email from localStorage

  useEffect(() => {
    const fetchRequests = async () => {
      if (!driverEmail) return;

      const q = query(
        collection(db, "rides"),
        where("confirm", "==", "No"),
        where("email", "==", driverEmail)
      );
      const querySnapshot = await getDocs(q);

      const rideRequests = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setRequests(rideRequests);
    };

    fetchRequests();

    // Poll every 5 seconds to check for new requests
    const interval = setInterval(fetchRequests, 5000);
    return () => clearInterval(interval);
  }, [driverEmail]);

  const handleAccept = async (ride) => {
    try {
      // Update the ride status to "Yes"
      await updateDoc(doc(db, "rides", ride.id), { confirm: "Yes" });

      // Move ride to "history" collection
      const historyEntry = {
        driverId: ride.driverId,
        driverEmail: driverEmail,
        driverName: ride.driverName,
        mobile: ride.mobile,
        ambulanceNumber: ride.ambulanceNumber,
        category: ride.category,
        source: ride.source,
        destination: ride.destination,
        timestamp: new Date(),
      };

      await addDoc(collection(db, "history"), historyEntry);

      setRequests(requests.filter((req) => req.id !== ride.id));
      alert(`✅ Ride Accepted! Ride moved to history.`);
    } catch (error) {
      console.error("Error accepting ride:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await deleteDoc(doc(db, "rides", id));
      setRequests(requests.filter((req) => req.id !== id));
      alert(`❌ Ride Rejected!`);
    } catch (error) {
      console.error("Error rejecting ride:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">🚑 Ride Requests</h1>
      {requests.length === 0 ? (
        <p className="text-gray-500">No new ride requests.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {requests.map((req) => (
            <div
              key={req.id}
              className="p-4 border rounded-lg shadow-sm bg-white"
            >
              <h3 className="text-lg font-semibold">{req.driverName}</h3>
              <p className="text-sm text-gray-600">📍 {req.destination}</p>
              <p className="text-sm text-gray-600">📞 {req.mobile}</p>
              <div className="mt-4 flex justify-between">
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded-lg"
                  onClick={() => handleAccept(req)}
                >
                  ✅ Accept
                </button>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-lg"
                  onClick={() => handleReject(req.id)}
                >
                  ❌ Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DriverRequests;
