const express = require("express");
const {
  registerDriver,
  updateDriverStatus,
  getDriverById,
  getAvailableDrivers,
} = require("../controller/driverController");

const router = express.Router();

router.post("/register", registerDriver);
router.put("/update-status/:driverId", updateDriverStatus);
router.get("/:driverId", getDriverById);
router.get("/available", getAvailableDrivers);

module.exports = router;
