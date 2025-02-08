import React, { useState, useEffect } from "react";

const RidesHistory = () => {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    // Fetch ride history from backend (Replace with API call)
    const mockHistory = [
      { id: 1, date: "2024-02-05", hospital: "Max Hospital, Noida", fare: 450 },
      { id: 2, date: "2024-02-04", hospital: "AIIMS, Hyderabad", fare: 600 },
      { id: 3, date: "2024-02-03", hospital: "KMC, Chennai", fare: 750 },
    ];
    setRides(mockHistory);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">🕒 Ride History</h1>
      {rides.length === 0 ? (
        <p className="text-gray-500">No previous rides found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rides.map((ride) => (
            <div key={ride.id} className="p-4 border rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold">📅 {ride.date}</h3>
              <p className="text-sm text-gray-600">📍 {ride.hospital}</p>
              <p className="text-sm font-bold mt-2">💰 ₹{ride.fare}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RidesHistory;
