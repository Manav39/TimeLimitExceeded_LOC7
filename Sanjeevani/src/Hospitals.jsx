import React, { useEffect, useState } from "react";

const HospitalsList = () => {
  const API_KEY = "AIzaSyCNw9GjD1I5pYYkCyl7omRtbRftzoftOCc";
  const latitude = 19.1072258; // Replace with actual latitude
  const longitude = 72.8372432; // Replace with actual longitude
  const radius = 1000; // 1km range

  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=hospital&key=${API_KEY}`
        );
        const data = await response.json();

        if (data.results) {
          setHospitals(data.results);
        } else {
          setError("No hospitals found.");
        }
      } catch (err) {
        setError("Error fetching hospital data.");
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        🏥 Nearby Hospitals
      </h2>

      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {!loading && !error && hospitals.length === 0 && (
        <p style={{ textAlign: "center" }}>No hospitals found nearby.</p>
      )}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {hospitals.map((hospital) => (
          <div
            key={hospital.place_id}
            style={{
              width: "300px",
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
              backgroundColor: "#fff",
              transition: "transform 0.3s ease-in-out",
              cursor: "pointer",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h3 style={{ marginBottom: "10px", color: "#2c3e50" }}>
              {hospital.name}
            </h3>
            <p>📍 Address: {hospital.vicinity}</p>
            <p>⭐ Rating: {hospital.rating || "N/A"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HospitalsList;
