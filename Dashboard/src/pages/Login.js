import React, { useState } from 'react';

const Login = () => {
  const [selectedOption, setSelectedOption] = useState('user');

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  const renderLoginForm = () => {
    return (
      <>
        <label style={styles.labelStyle}>Email ID:</label>
        <input type="email" placeholder="Enter your email" style={styles.input} />
        <label style={styles.labelStyle}>Password:</label>
        <input type="password" placeholder="Enter your password" style={styles.input} />
      </>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h2 style={styles.heading}>Login</h2>
        <div style={styles.toggleGroup}>
          <button
            style={{ ...styles.toggleButton, borderTopRightRadius: 0, borderBottomRightRadius: 0, backgroundColor: selectedOption === 'user' ? '#ff0000' : '#fff', color: selectedOption === 'user' ? '#fff' : '#ff0000' }}
            onClick={() => handleOptionChange('user')}
          >
            User Login
          </button>
          <button
            style={{ ...styles.toggleButton, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, backgroundColor: selectedOption === 'driver' ? '#ff0000' : '#fff', color: selectedOption === 'driver' ? '#fff' : '#ff0000' }}
            onClick={() => handleOptionChange('driver')}
          >
            Driver Login
          </button>
        </div>
        <form style={styles.formContent}>{renderLoginForm()}</form>
        <button style={styles.loginButton}>Login</button>
        <div style={styles.registerPrompt}>
          <span style={{ color: '#ff0000' }}>Don't have an account?</span>
          <a href="/register" style={styles.registerLink}>Register here</a>
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
  labelStyle: {
    color: '#ff0000',
  },
  formWrapper: {
    backgroundColor: '#ffffff',
    border: '1px solid #ff0000',
    borderRadius: '10px',
    padding: '30px',
    width: '400px',
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
    color: '#000',
  },
  loginButton: {
    backgroundColor: '#ff0000',
    color: '#fff',
    border: 'none',
    padding: '12px 18px',
    borderRadius: '8px',
    cursor: 'pointer',
    textAlign: 'center',
    fontSize: '16px',
  },
  registerPrompt: {
    marginTop: '20px',
    textAlign: 'right',
    color: '#ff0000',
  },
  registerLink: {
    color: '#ff0000',
    textDecoration: 'none',
    marginLeft: '5px',
  },
};

export default Login;
