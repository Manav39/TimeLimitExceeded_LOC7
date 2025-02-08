const express = require("express");
const router = express.Router();
const db = require("../firebase-config");

router.post("/register", async (req, res) => {
  try {
    const { name, phone, emergencyContact, address } = req.body;
    if (!name || !phone || !emergencyContact || !address) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const userRef = db.collection("users").doc();
    await userRef.set({
      name,
      phone,
      emergencyContact,
      address,
      pastMedicalData: [],
      bookedTrips: [],
    });

    res.status(201).json({ success: true, userId: userRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Export router correctly
module.exports = router;
