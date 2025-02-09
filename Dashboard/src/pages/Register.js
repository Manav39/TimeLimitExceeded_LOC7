import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
const Register = () => {
  const [selectedOption, setSelectedOption] = useState("driver");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    aadhar: "",
    license: "",
    employerId: "",
    healthHistory: "",
    ambulanceNumber: "",
    ambulanceType: "Private",
    category: "Normal",
    otp: "",
  });
  const [errors, setErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");


  const handleOptionChange = (value) => {
    setSelectedOption(value);
    setErrors({});
    setFormData({
      name: "",
      email: "",
      mobile: "",
      password: "",
      aadhar: null,
      license: null,
      employerId: null,
      healthHistory: "",
      otp: "",
    });
  };

  const generateOtp = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

   // Function to send OTP via Twilio
   const sendOtp = async () => {
    // if (!validateForm()) return;

    const otp = generateOtp();
    setGeneratedOtp(otp);
    setOtpSent(true);


    try {
      const response = await fetch("http://127.0.0.1:5000/send-sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone_number: `+91${formData.mobile}`,
          message: `Your OTP for emergency verification is: ${otp}`,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert("OTP sent successfully!");
      } else {
        alert("Failed to send OTP. Try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  // Function to verify OTP
  const verifyOtp = async () => {
    if (formData.otp !== generatedOtp) {
      alert("Invalid OTP. Please try again.");
      return;
    }

    alert("OTP Verified Successfully!");

    // Send Emergency Confirmation Message via Twilio
    try {
      await fetch("http://127.0.0.1:5000/send-sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone_number: `+91${formData.mobile}`,
          message: "🚑 Your emergency request has been confirmed. Help is on the way! Kindly contact the driver Mr. Raj Singh - +918369456359",
        }),
      });

      alert("Emergency confirmation sent successfully!");
    } catch (error) {
      console.error("Error sending confirmation:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile number must be 10 digits";
      isValid = false;
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (selectedOption === "driver" && !formData.aadhar) {
      newErrors.aadhar = "Aadhar Card Photo is required";
      isValid = false;
    }

    if (selectedOption === "driver" && !formData.license) {
      newErrors.license = "Driving License is required";
      isValid = false;
    }

    if (selectedOption === "driver" && !formData.employerId) {
      newErrors.employerId = "Employer ID Photo is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const addAmbulanceDrivers = async () => {
    const drivers = [
      {
        name: "Driver 1",
        email: "driver1@example.com",
        mobile: "9876543200",
        password: "securepassword123",
        aadhar: "1234-5678-9000",
        license: "LIC0001",
        employerId: "EMP0001",
        status: "A",
        lat: 19.079,
        long: 72.8693,
        ambulanceNumber: "AMB0001",
        ambulanceType: "Private",
        category: "Normal",
        timestamp: new Date(),
      },
      {
        name: "Driver 2",
        email: "driver2@example.com",
        mobile: "9876543201",
        password: "securepassword123",
        aadhar: "1234-5678-9001",
        license: "LIC0002",
        employerId: "EMP0002",
        status: "A",
        lat: 19.0743,
        long: 72.874,
        ambulanceNumber: "AMB0002",
        ambulanceType: "Government",
        category: "Oxygen",
        timestamp: new Date(),
      },
      {
        name: "Driver 3",
        email: "driver3@example.com",
        mobile: "9876543202",
        password: "securepassword123",
        aadhar: "1234-5678-9002",
        license: "LIC0003",
        employerId: "EMP0003",
        status: "A",
        lat: 19.0837,
        long: 72.8823,
        ambulanceNumber: "AMB0003",
        ambulanceType: "Government",
        category: "Dead Body",
        timestamp: new Date(),
      },
      // ... Add remaining 7 records
    ];

    try {
      const promises = drivers.map(async (driver) => {
        await addDoc(collection(db, "drivers"), driver);
      });

      await Promise.all(promises);
      console.log("All ambulance drivers added successfully!");
    } catch (error) {
      console.error("Error adding ambulance drivers:", error);
    }
  };

  useEffect(() => {
    //addAmbulanceDrivers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      e.preventDefault(); // Prevent form from reloading the page

      try {
        if (selectedOption === "driver") {
          // Reference to Firestore collection
          const docRef = await addDoc(collection(db, "drivers"), {
            name: formData.name,
            email: formData.email,
            mobile: formData.mobile,
            password: formData.password,
            aadhar: formData.aadhar || "",
            license: formData.license || "",
            employerId: formData.employerId || "",
            status: "A",
            lat: localStorage.getItem("userLatitude"),
            long: localStorage.getItem("userLongitude"),
            ambulanceNumber: formData.ambulanceNumber || "",
            ambulanceType: formData.ambulanceType,
            category: formData.category,
            timestamp: new Date(),
          });

          console.log("Document written with ID: ", docRef.id);
          alert("Driver registered successfully!");
        } else if (selectedOption === "user") {
          // Reference to Firestore collection
          const docRef = await addDoc(collection(db, "users"), {
            name: formData.name,
            email: formData.email,
            mobile: formData.mobile,
            password: formData.password, // Hash this in a real-world scenario
            healthHistory: formData.healthHistory || "",
            lat: "",
            long: "",
            timestamp: new Date(),
          });

          console.log("User registered with ID: ", docRef.id);
          alert("User registered successfully!");
        }
      } catch (error) {
        console.error("Error adding document: ", error);
        alert("Error registering driver");
      }
    }
  };

  const renderFormContent = () => {
    switch (selectedOption) {
      case "driver":
        return (
          <>
            <label style={styles.labelStyle}>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              style={styles.input}
            />
            {errors.name && <span style={styles.error}>{errors.name}</span>}

            <label style={styles.labelStyle}>Email ID:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              style={styles.input}
            />
            {errors.email && <span style={styles.error}>{errors.email}</span>}

            <label style={styles.labelStyle}>Mobile Number:</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              placeholder="Enter your mobile number"
              style={styles.input}
            />
            {errors.mobile && <span style={styles.error}>{errors.mobile}</span>}

            <label style={styles.labelStyle}>Ambulance Number:</label>
            <input
              type="text"
              name="ambulanceNumber"
              value={formData.ambulanceNumber}
              onChange={handleInputChange}
              placeholder="Enter your ambulance number"
              style={styles.input}
            />
            <label style={styles.labelStyle}>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              style={styles.input}
            />
            {errors.password && (
              <span style={styles.error}>{errors.password}</span>
            )}

            <label style={styles.labelStyle}>
              Aadhar Card (Reference Link or Number):
            </label>
            <input
              type="text"
              name="aadhar"
              value={formData.aadhar}
              onChange={handleInputChange}
              placeholder="Enter Aadhar reference link or number"
              style={styles.input}
            />
            {errors.aadhar && <span style={styles.error}>{errors.aadhar}</span>}

            <label style={styles.labelStyle}>
              Driving License (Reference Link or Number):
            </label>
            <input
              type="text"
              name="license"
              value={formData.license}
              onChange={handleInputChange}
              placeholder="Enter Driving License reference link or number"
              style={styles.input}
            />
            {errors.license && (
              <span style={styles.error}>{errors.license}</span>
            )}

            {/* New Dropdown for Ambulance Type */}
            <label style={styles.labelStyle}>Ambulance Type:</label>
            <select
              name="ambulanceType"
              value={formData.ambulanceType}
              onChange={handleInputChange}
              style={styles.input}
            >
              <option value="Private">Private</option>
              <option value="Government">Government</option>
            </select>

            {/* New Dropdown for Category */}
            <label style={styles.labelStyle}>Category:</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              style={styles.input}
            >
              <option value="Normal">Normal</option>
              <option value="Oxygen">Oxygen</option>
              <option value="ICU">ICU</option>
              <option value="Dead Body">Dead Body</option>
            </select>

            <label style={styles.labelStyle}>
              Employer ID (Reference Link or Number):
            </label>
            <input
              type="text"
              name="employerId"
              value={formData.employerId}
              onChange={handleInputChange}
              placeholder="Enter Employer ID reference link or number"
              style={styles.input}
            />
            {errors.employerId && (
              <span style={styles.error}>{errors.employerId}</span>
            )}
          </>
        );

      case "user":
        return (
          <>
            <label style={styles.labelStyle}>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              style={styles.input}
            />
            {errors.name && <span style={styles.error}>{errors.name}</span>}

            <label style={styles.labelStyle}>Email ID:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              style={styles.input}
            />
            {errors.email && <span style={styles.error}>{errors.email}</span>}

            <label style={styles.labelStyle}>Mobile Number:</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              placeholder="Enter your mobile number"
              style={styles.input}
            />
            {errors.mobile && <span style={styles.error}>{errors.mobile}</span>}

            <label style={styles.labelStyle}>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              style={styles.input}
            />
            {errors.password && (
              <span style={styles.error}>{errors.password}</span>
            )}

            <label style={styles.labelStyle}>Health History:</label>
            <textarea
              name="healthHistory"
              value={formData.healthHistory}
              onChange={handleInputChange}
              placeholder="Enter any health history (e.g., allergies)"
              style={{ ...styles.input, height: "80px" }}
            ></textarea>
          </>
        );
      case "emergency":
        return (
          <>
            <label style={styles.labelStyle}>Mobile Number:</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              placeholder="Enter your mobile number"
              style={styles.input}
            />
            {errors.mobile && <span style={styles.error}>{errors.mobile}</span>}

            {/* OTP Section */}
            {otpSent ? (
              <>
                <label style={styles.labelStyle}>Enter OTP:</label>
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleInputChange}
                  placeholder="Enter 4-digit OTP"
                  style={styles.input}
                />
                <button
                  type="button"
                  style={styles.verifyButton}
                  onClick={verifyOtp}
                >
                  Verify OTP
                </button>
              </>
            ) : (
              <button
                type="button"
                style={styles.sendOtpButton}
                onClick={sendOtp}
              >
                Send OTP
              </button>
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.formWrapper}>
          <h2 style={styles.heading}>Register</h2>
          <div style={styles.toggleGroup}>
            <button
              style={{
                ...styles.toggleButton,
                backgroundColor:
                  selectedOption === "driver" ? "#ff0000" : "#fff",
                color: selectedOption === "driver" ? "#fff" : "#ff0000",
              }}
              onClick={() => handleOptionChange("driver")}
            >
              Driver Registration
            </button>
            <button
              style={{
                ...styles.toggleButton,
                backgroundColor: selectedOption === "user" ? "#ff0000" : "#fff",
                color: selectedOption === "user" ? "#fff" : "#ff0000",
              }}
              onClick={() => handleOptionChange("user")}
            >
              User Registration
            </button>
            <button
              style={{
                ...styles.toggleButton,
                backgroundColor:
                  selectedOption === "emergency" ? "#ff0000" : "#fff",
                color: selectedOption === "emergency" ? "#fff" : "#ff0000",
              }}
              onClick={() => handleOptionChange("emergency")}
            >
              Emergency
            </button>
          </div>
          <form style={styles.formContent} onSubmit={handleSubmit}>
            {renderFormContent()}
            <button type="submit" style={styles.registerButton}>
              Register Now
            </button>
          </form>
          <div style={styles.loginPrompt}>
            <span style={{ color: "#ff0000" }}>Already registered?</span>
            <a href="/login" style={styles.loginLink}>
              Login here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    paddingTop: 20,
    backgroundColor: "#fff",
    color: "#900",
    fontFamily: "Roboto, sans-serif",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  labelStyle: {
    color: "#ff0000",
  },
  error: {
    color: "#ff0000",
    fontSize: "12px",
    marginTop: "-10px",
    marginBottom: "10px",
  },
  formWrapper: {
    backgroundColor: "#ffffff",
    border: "1px solid #ff0000",
    borderRadius: "10px",
    padding: "30px",
    width: "500px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    color: "#ff0000",
    textAlign: "center",
    marginBottom: "20px",
  },
  toggleGroup: {
    display: "flex",
    marginBottom: "20px",
  },
  toggleButton: {
    flex: 1,
    border: "1px solid #ff0000",
    padding: "10px",
    cursor: "pointer",
    fontSize: "14px",
    textAlign: "center",
  },
  formContent: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginBottom: "20px",
  },
  input: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "10px",
    fontSize: "14px",
    width: "100%",
    boxSizing: "border-box",
    color: "#000", // Ensuring text color is black
  },
  registerButton: {
    backgroundColor: "#ff0000",
    color: "#fff",
    border: "none",
    padding: "12px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    textAlign: "center",
    fontSize: "16px",
  },
  loginPrompt: {
    marginTop: "20px",
    textAlign: "right",
    color: "#ff0000",
  },
  loginLink: {
    color: "#ff0000",
    textDecoration: "none",
    marginLeft: "5px",
  },
};

export default Register;
