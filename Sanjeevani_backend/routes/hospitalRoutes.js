const express = require("express");
const router = express.Router();
const db = require("../firebase-config");

router.post("/register", async (req, res) => {
  try {
    const { name, phone, latitude, longitude } = req.body;
    if (!name || !phone || !latitude || !longitude) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const hospitalRef = db.collection("hospitals").doc();
    await hospitalRef.set({
      name,
      phone,
      location: { latitude, longitude },
      registeredDrivers: [],
      availableAmbulances: [],
    });

    res.status(201).json({ success: true, hospitalId: hospitalRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Export router correctly
module.exports = router;
