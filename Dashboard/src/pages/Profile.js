import React, { useState } from 'react';

const Profile = () => {
  // Dummy data for now (to simulate the profile information)
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    healthHistory: 'No known allergies. Had a mild fever last month.'
  });

  const [isModalOpen, setIsModalOpen] = useState(false);  // To manage popup visibility
  const [formData, setFormData] = useState({ ...profile }); // For holding edited data

  const handleEditClick = () => {
    setFormData({ ...profile });  // Populate form with current profile data
    setIsModalOpen(true); // Open the popup modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the popup modal
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, // Update form data on change
    });
  };

  const handleUpdate = () => {
    setProfile(formData); // Update profile with new data
    setIsModalOpen(false); // Close the modal after updating
  };

  return (
    <div style={styles.container}>
      <div style={styles.profileCard}>
        <h3 style={styles.profileTitle}>Profile Information</h3>

        <table style={styles.table}>
          <tbody>
            <tr>
              <td style={styles.tableCell}><strong>Name:</strong></td>
              <td style={styles.tableCell}>{profile.name}</td>
            </tr>
            <tr>
              <td style={styles.tableCell}><strong>Email:</strong></td>
              <td style={styles.tableCell}>{profile.email}</td>
            </tr>
            <tr>
              <td style={styles.tableCell}><strong>Health History:</strong></td>
              <td style={styles.tableCell}>{profile.healthHistory}</td>
            </tr>
          </tbody>
        </table>

        <button onClick={handleEditClick} style={styles.updateButton}>Update</button>
      </div>

      {/* Modal for updating profile */}
      {isModalOpen && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3 style={styles.modalTitle}>Update Profile</h3>
            <label style={styles.label}>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={styles.input}
              />
            </label>
            <label style={styles.label}>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
              />
            </label>
            <label style={styles.label}>
              Health History:
              <textarea
                name="healthHistory"
                value={formData.healthHistory}
                onChange={handleChange}
                style={styles.textarea}
              />
            </label>
            <div style={styles.modalButtons}>
              <button onClick={handleUpdate} style={styles.saveButton}>Save Changes</button>
              <button onClick={handleCloseModal} style={styles.cancelButton}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    width: '90%',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
    display: 'block',
    minHeight: '100vh',
  },
  title: {
    textAlign: 'center',
    color: '#c0392b', // Red color
    width: '100%',
    marginBottom: '20px',
  },
  profileCard: {
    width: '600px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)',
    padding: '35px',
    marginTop: '20px',
  },
  profileTitle: {
    textAlign: 'center',
    color: '#c0392b', // Red color for heading
    fontSize: '24px',
    marginBottom: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableCell: {
    padding: '15px',
    borderBottom: '1px solid #ddd',
    textAlign: 'left',
  },
  updateButton: {
    backgroundColor: '#c0392b', // Red color
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
    width: '100%',
  },
  modal: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '1000', // Ensure modal appears on top
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '15px',
    width: '450px',
    textAlign: 'center',
    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.15)',
    transition: 'transform 0.3s ease, opacity 0.3s ease',
    transform: 'scale(1)',
  },
  modalTitle: {
    color: '#333',
    fontSize: '26px',
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '10px',
    textAlign: 'left',
    fontSize: '14px',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '14px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '14px',
    height: '100px',
  },
  modalButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '15px',
  },
  saveButton: {
    backgroundColor: '#28a745', // Green color for save
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    width: '48%',
  },
  cancelButton: {
    backgroundColor: '#dc3545', // Red color for cancel
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    width: '48%',
  },
};

export default Profile;
