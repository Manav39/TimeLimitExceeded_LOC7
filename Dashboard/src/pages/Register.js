import React, { useState } from 'react';
import Navbar from './Navbar';

const Register = () => {
  const [selectedOption, setSelectedOption] = useState('driver');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    aadhar: null,
    license: null,
    employerId: null,
    healthHistory: '',
  });
  const [errors, setErrors] = useState({});

  const handleOptionChange = (value) => {
    setSelectedOption(value);
    setErrors({});
    setFormData({
      name: '',
      email: '',
      mobile: '',
      password: '',
      aadhar: null,
      license: null,
      employerId: null,
      healthHistory: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
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
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }

    if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile number must be 10 digits';
      isValid = false;
    }

    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (selectedOption === 'driver' && !formData.aadhar) {
      newErrors.aadhar = 'Aadhar Card Photo is required';
      isValid = false;
    }

    if (selectedOption === 'driver' && !formData.license) {
      newErrors.license = 'Driving License is required';
      isValid = false;
    }

    if (selectedOption === 'driver' && !formData.employerId) {
      newErrors.employerId = 'Employer ID Photo is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted successfully', formData);
      // Add form submission logic here
    }
  };

  const renderFormContent = () => {
    switch (selectedOption) {
      case 'driver':
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
            {errors.password && <span style={styles.error}>{errors.password}</span>}

            <label style={styles.labelStyle}>Aadhar Card Photo:</label>
            <input
              type="file"
              name="aadhar"
              onChange={handleFileChange}
              style={styles.input}
            />
            {errors.aadhar && <span style={styles.error}>{errors.aadhar}</span>}

            <label style={styles.labelStyle}>Driving License:</label>
            <input
              type="file"
              name="license"
              onChange={handleFileChange}
              style={styles.input}
            />
            {errors.license && <span style={styles.error}>{errors.license}</span>}

            <label style={styles.labelStyle}>Employer ID Photo:</label>
            <input
              type="file"
              name="employerId"
              onChange={handleFileChange}
              style={styles.input}
            />
            {errors.employerId && <span style={styles.error}>{errors.employerId}</span>}
          </>
        );
      case 'user':
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
            {errors.password && <span style={styles.error}>{errors.password}</span>}

            <label style={styles.labelStyle}>Health History:</label>
            <textarea
              name="healthHistory"
              value={formData.healthHistory}
              onChange={handleInputChange}
              placeholder="Enter any health history (e.g., allergies)"
              style={{ ...styles.input, height: '80px' }}
            ></textarea>
          </>
        );
      case 'emergency':
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
                backgroundColor: selectedOption === 'driver' ? '#ff0000' : '#fff',
                color: selectedOption === 'driver' ? '#fff' : '#ff0000',
              }}
              onClick={() => handleOptionChange('driver')}
            >
              Driver Registration
            </button>
            <button
              style={{
                ...styles.toggleButton,
                backgroundColor: selectedOption === 'user' ? '#ff0000' : '#fff',
                color: selectedOption === 'user' ? '#fff' : '#ff0000',
              }}
              onClick={() => handleOptionChange('user')}
            >
              User Registration
            </button>
            <button
              style={{
                ...styles.toggleButton,
                backgroundColor: selectedOption === 'emergency' ? '#ff0000' : '#fff',
                color: selectedOption === 'emergency' ? '#fff' : '#ff0000',
              }}
              onClick={() => handleOptionChange('emergency')}
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
            <span style={{ color: '#ff0000' }}>Already registered?</span>
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
  error: {
    color: '#ff0000',
    fontSize: '12px',
    marginTop: '-10px',
    marginBottom: '10px',
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
    color: '#000', // Ensuring text color is black
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
    color: '#ff0000',
  },
  loginLink: {
    color: '#ff0000',
    textDecoration: 'none',
    marginLeft: '5px',
  },
};

export default Register;
