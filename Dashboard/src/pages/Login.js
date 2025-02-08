import React, { useState } from "react";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";

const Login = () => {
  const [selectedOption, setSelectedOption] = useState("user");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Toggle between User and Driver login
  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  // Handle Login Submission
  const handleLogin = async () => {
    setLoading(true);
    const collectionName = selectedOption === "driver" ? "drivers" : "users";

    try {
      const q = query(
        collection(db, collectionName),
        where("email", "==", email)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert("No account found with this email.");
      } else {
        let isAuthenticated = false;
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          if (userData.password === password) {
            isAuthenticated = true;
            alert(`Login successful as ${selectedOption}`);
            localStorage.setItem("userRole", selectedOption);
            localStorage.setItem("userEmail", email);
            if(collectionName === "drivers") {
              navigate("/driver/requests");
            }
            else {
              navigate("/ambulance");
            }
            // Redirect logic can be added here (e.g., navigate to dashboard)
          }
        });

        if (!isAuthenticated) {
          alert("Incorrect password. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Error logging in. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h2 style={styles.heading}>Login</h2>

        <div style={styles.toggleGroup}>
          <button
            style={{
              ...styles.toggleButton,
              backgroundColor: selectedOption === "user" ? "#ff0000" : "#fff",
              color: selectedOption === "user" ? "#fff" : "#ff0000",
            }}
            onClick={() => handleOptionChange("user")}
          >
            User Login
          </button>
          <button
            style={{
              ...styles.toggleButton,
              backgroundColor: selectedOption === "driver" ? "#ff0000" : "#fff",
              color: selectedOption === "driver" ? "#fff" : "#ff0000",
            }}
            onClick={() => handleOptionChange("driver")}
          >
            Driver Login
          </button>
        </div>

        <form style={styles.formContent} onSubmit={(e) => e.preventDefault()}>
          <label style={styles.labelStyle}>Email ID:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            style={styles.input}
          />

          <label style={styles.labelStyle}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            style={styles.input}
          />
        </form>

        <button
          style={styles.loginButton}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div style={styles.registerPrompt}>
          <span style={{ color: "#ff0000" }}>Don't have an account?</span>
          <a href="/register" style={styles.registerLink}>
            Register here
          </a>
        </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
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
  formWrapper: {
    backgroundColor: "#ffffff",
    border: "1px solid #ff0000",
    borderRadius: "10px",
    padding: "30px",
    width: "400px",
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
    color: "#000",
  },
  loginButton: {
    backgroundColor: "#ff0000",
    color: "#fff",
    border: "none",
    padding: "12px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    textAlign: "center",
    fontSize: "16px",
  },
  registerPrompt: {
    marginTop: "20px",
    textAlign: "right",
    color: "#ff0000",
  },
  registerLink: {
    color: "#ff0000",
    textDecoration: "none",
    marginLeft: "5px",
  },
};

export default Login;
