const express = require("express");
const twilio = require("twilio");
const bodyParser = require("body-parser");
const db = require("./firebase-config");
require("dotenv").config();
const driverRoutes = require("./routes/driverRoutes");
const userRoutes = require("./routes/userRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || "";
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || "";
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER || "";

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// Function to send SMS
async function sendMessage(toNumber, messageBody) {
  try {
    const message = await client.messages.create({
      body: messageBody,
      //   from: TWILIO_PHONE_NUMBER,
      messagingServiceSid: process.env.messagingServiceSid || "",
      to: toNumber,
    });

    return {
      success: true,
      messageSid: message.sid,
    };
  } catch (error) {
    console.error("Error sending message:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

app.post("/send-alert", async (req, res) => {
  const { phoneNumber, message } = req.body;

  if (!phoneNumber || !message) {
    return res.status(400).json({
      success: false,
      error: "Phone number and message are required",
    });
  }

  try {
    const result = await sendMessage(phoneNumber, message);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

async function handleHelpRequest(senderNumber) {
  console.log(`Help requested from ${senderNumber}`);
}

async function handleBookingRequest(senderNumber, message) {
  console.log(`Booking requested from ${senderNumber}: ${message}`);
}

app.post("/webhook", async (req, res) => {
  const twiml = new twilio.twiml.MessagingResponse();
  const incomingMsg = req.body.Body?.toLowerCase() || "";
  const fromNumber = req.body.From;

  // Only process messages from your verified number
  //   if (fromNumber !== "xyz") {
  //     twiml.message("Unauthorized number");
  //     res.writeHead(200, { "Content-Type": "text/xml" });
  //     return res.end(twiml.toString());
  //   }

  // Handle different commands
  try {
    switch (incomingMsg) {
      case "status":
        await checkServerStatus(twiml);
        break;

      case "start":
        await startProcess(twiml);
        break;

      default:
        twiml.message("Available commands: status, users, start");
    }

    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(twiml.toString());
  } catch (error) {
    console.error("Error:", error);
    twiml.message("An error occurred");
    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(twiml.toString());
  }
});

async function checkServerStatus(twiml) {
  const status = "Server is running normally";
  twiml.message(`Status: ${status}`);
}

async function getUserCount(twiml) {
  const count = 42;
  twiml.message(`Active users: ${count}`);
}

async function startProcess(twiml) {
  console.log("START MESSAGE RECEIVED");
  twiml.message("Process started successfully");
}

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: "Something went wrong!",
  });
});

app.use("/drivers", driverRoutes);

app.use("/users", userRoutes);
app.use("/hospitals", hospitalRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
