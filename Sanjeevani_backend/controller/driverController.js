const db = require("../firebase-config");

const DRIVERS_COLLECTION = "drivers";

// 📌 Register a Driver
const registerDriver = async (req, res) => {
  try {
    const {
      name,
      phone,
      licenseNumber,
      ambulanceNumber,
      hospitalId,
      experience,
      aadharCard,
      latitude,
      longitude,
    } = req.body;

    if (
      !name ||
      !phone ||
      !licenseNumber ||
      !ambulanceNumber ||
      !hospitalId ||
      !aadharCard
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const driverData = {
      name,
      phone,
      licenseNumber,
      ambulanceNumber,
      hospitalId,
      experience: experience || "0 years",
      pastTrips: [],
      availabilityStatus: "available",
      location: { latitude, longitude },
      aadharCard,
    };

    const newDriverRef = await db
      .collection(DRIVERS_COLLECTION)
      .add(driverData);
    res.status(201).json({ success: true, driverId: newDriverRef.id });
  } catch (error) {
    console.error("Error registering driver:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// 📌 Update Driver Availability Status
const updateDriverStatus = async (req, res) => {
  try {
    const { driverId } = req.params;
    const { availabilityStatus } = req.body;

    if (!["available", "on-trip", "off-duty"].includes(availabilityStatus)) {
      return res.status(400).json({ error: "Invalid availability status" });
    }

    await db
      .collection(DRIVERS_COLLECTION)
      .doc(driverId)
      .update({ availabilityStatus });
    res.status(200).json({ success: true, message: "Driver status updated" });
  } catch (error) {
    console.error("Error updating driver status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// 📌 Get Driver by ID
const getDriverById = async (req, res) => {
  try {
    const { driverId } = req.params;
    const driverDoc = await db
      .collection(DRIVERS_COLLECTION)
      .doc(driverId)
      .get();

    if (!driverDoc.exists) {
      return res.status(404).json({ error: "Driver not found" });
    }

    res.status(200).json({ success: true, driver: driverDoc.data() });
  } catch (error) {
    console.error("Error fetching driver details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// 📌 Get All Available Drivers
const getAvailableDrivers = async (req, res) => {
  try {
    const driversSnapshot = await db
      .collection(DRIVERS_COLLECTION)
      .where("availabilityStatus", "==", "available")
      .get();

    if (driversSnapshot.empty) {
      return res.status(404).json({ error: "No available drivers found" });
    }

    const drivers = [];
    driversSnapshot.forEach((doc) => {
      drivers.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json({ success: true, drivers });
  } catch (error) {
    console.error("Error fetching available drivers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  registerDriver,
  updateDriverStatus,
  getDriverById,
  getAvailableDrivers,
};
