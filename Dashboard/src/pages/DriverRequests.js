import React, { useState, useEffect } from "react";

const DriverRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch ride requests from backend (Replace with API call)
    const mockRequests = [
      { id: 1, user: "Rahul Sharma", phone: "+91 9876543210", hospital: "Apollo Hospital, Delhi", amount: 500 },
      { id: 2, user: "Neha Verma", phone: "+91 8765432109", hospital: "Fortis Hospital, Mumbai", amount: 700 },
      { id: 3, user: "Amit Kumar", phone: "+91 7654321098", hospital: "AIIMS, Bangalore", amount: 600 },
    ];
    setRequests(mockRequests);
  }, []);

  const handleAccept = (id) => {
    alert(`🚑 Ride Accepted! Request ID: ${id}`);
    setRequests(requests.filter((req) => req.id !== id));
  };

  const handleReject = (id) => {
    alert(`❌ Ride Rejected! Request ID: ${id}`);
    setRequests(requests.filter((req) => req.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">🚑 Ride Requests</h1>
      {requests.length === 0 ? (
        <p className="text-gray-500">No new ride requests.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {requests.map((req) => (
            <div key={req.id} className="p-4 border rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold">{req.user}</h3>
              <p className="text-sm text-gray-600">📍 {req.hospital}</p>
              <p className="text-sm text-gray-600">📞 {req.phone}</p>
              <p className="text-sm font-bold mt-2">💰 ₹{req.amount}</p>
              <div className="mt-4 flex gap-2">
                <button className="bg-green-600 text-white px-3 py-1 rounded" onClick={() => handleAccept(req.id)}>Accept</button>
                <button className="bg-red-600 text-white px-3 py-1 rounded" onClick={() => handleReject(req.id)}>Reject</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DriverRequests;
