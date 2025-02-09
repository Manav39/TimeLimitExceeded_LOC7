const express = require("express");
const cors = require("cors");
const Razorpay = require("razorpay");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

app.use(
  cors({
    origin: "*", // Add all allowed origins
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Correct the method syntax
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
  })
);

app.use(express.json());

app.post("/pay", async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: "rzp_test_RCqZF0EIXUQt7G",
      key_secret: "oZbbnv5A0YNHmLuEvSbKtiqL",
    });

    if (!req.body) {
      return res.status(400).json({
        error: "No data provided",
      });
    }
    const options = req.body;
    console.log("1");
    const payment = await razorpay.orders.create(options);
    console.log("2");
    if (!payment) {
      return res.status(500).json({
        error: "An error occurred",
      });
    }
    return res.json(payment);
  } catch (e) {
    console.error("Error : ", e);
    res.status(500).send(e);
  }
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(3000, (req, res) => {
  console.log("server is running");
});
