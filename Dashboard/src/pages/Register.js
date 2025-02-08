import React, { useState } from 'react';
import Navbar from './Navbar';

const Register = () => {
  const [selectedOption, setSelectedOption] = useState('driver');

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  const renderFormContent = () => {
    switch (selectedOption) {
      case 'driver':
        return (
          <>
            <label style={styles.labelStyle}>Name:</label>
            <input type="text" placeholder="Enter your name" style={styles.input} />
            <label style={styles.labelStyle}>Email ID:</label>
            <input type="email" placeholder="Enter your email" style={styles.input} />
            <label style={styles.labelStyle}>Mobile Number:</label>
            <input type="tel" placeholder="Enter your mobile number" style={styles.input} />
            <label style={styles.labelStyle}>Aadhar Card Photo:</label>
            <input type="file" style={styles.input} />
            <label style={styles.labelStyle}>Driving License:</label>
            <input type="file" style={styles.input} />
          </>
        );
      case 'user':
        return (
          <>
            <label style={styles.labelStyle}>Name:</label>
            <input type="text" placeholder="Enter your name" style={styles.input} />
            <label style={styles.labelStyle}>Email ID:</label>
            <input type="email" placeholder="Enter your email" style={styles.input} />
            <label style={styles.labelStyle}>Mobile Number:</label>
            <input type="tel" placeholder="Enter your mobile number" style={styles.input} />
            <label style={styles.labelStyle}>Health History:</label>
            <textarea placeholder="Enter any health history (e.g., allergies)" style={{ ...styles.input, height: '80px' }}></textarea>
          </>
        );
      case 'emergency':
        return (
          <>
            <label style={styles.labelStyle}>Mobile Number:</label>
            <input type="tel" placeholder="Enter your mobile number" style={styles.input} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div><Navbar />
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h2 style={styles.heading}>Register</h2>
        <div style={styles.toggleGroup}>
          <button
            style={{ ...styles.toggleButton, borderTopRightRadius: 0, borderBottomRightRadius: 0, backgroundColor: selectedOption === 'driver' ? '#ff0000' : '#fff', color: selectedOption === 'driver' ? '#fff' : '#ff0000' }}
            onClick={() => handleOptionChange('driver')}
          >
            Driver Registration
          </button>
          <button
            style={{ ...styles.toggleButton, borderRadius: 0, backgroundColor: selectedOption === 'user' ? '#ff0000' : '#fff', color: selectedOption === 'user' ? '#fff' : '#ff0000' }}
            onClick={() => handleOptionChange('user')}
          >
            User Registration
          </button>
          <button
            style={{ ...styles.toggleButton, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, backgroundColor: selectedOption === 'emergency' ? '#ff0000' : '#fff', color: selectedOption === 'emergency' ? '#fff' : '#ff0000' }}
            onClick={() => handleOptionChange('emergency')}
          >
            Emergency
          </button>
        </div>
        <form style={styles.formContent}>{renderFormContent()}</form>
        <button style={styles.registerButton}>Register Now</button>
        <div style={styles.loginPrompt}>
          <span style={{color:'#ff0000'}}>Already registered?</span>
          <a href="/login" style={styles.loginLink}>Login here</a>
        </div>
      </div>
    </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#fff',
    color: '#900',
    fontFamily: 'Roboto, sans-serif',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelStyle:{
    color:'#ff0000'
  },
  formWrapper: {
    backgroundColor: '#ffffff',
    border: '1px solid #ff0000',
    borderRadius: '10px',
    padding: '30px',
    width: '500px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    color: '#ff0000',
    textAlign: 'center',
    marginBottom: '20px',
  },
  toggleGroup: {
    display: 'flex',
    marginBottom: '20px',
  },
  toggleButton: {
    flex: 1,
    border: '1px solid #ff0000',
    padding: '10px',
    cursor: 'pointer',
    fontSize: '14px',
    textAlign: 'center',
  },
  formContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginBottom: '20px',
  },
  input: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    fontSize: '14px',
    width: '100%',
    boxSizing: 'border-box',
    color:'#ff0000'
  },
  registerButton: {
    backgroundColor: '#ff0000',
    color: '#fff',
    border: 'none',
    padding: '12px 18px',
    borderRadius: '8px',
    cursor: 'pointer',
    textAlign: 'center',
    fontSize: '16px',
  },
  loginPrompt: {
    marginTop: '20px',
    textAlign: 'right',
    color:'#ff0000'
  },
  loginLink: {
    color: '#ff0000',
    textDecoration: 'none',
    marginLeft: '5px',
  },
};

export default Register;
