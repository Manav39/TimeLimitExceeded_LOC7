import React from 'react';
import { FaPhone } from 'react-icons/fa';
import Navbar from './Navbar';

const EmergencyHelpline = () => {
  const helplines = [
    { name: 'Police', number: '100' },
    { name: 'Fire Brigade', number: '101' },
    { name: 'Ambulance', number: '102' },
    { name: 'Disaster Management', number: '108' },
    { name: 'Women Helpline', number: '1091' },
    { name: 'Child Helpline', number: '1098' },
    { name: 'Senior Citizen Helpline', number: '1291' },
    { name: 'Cyber Crime Helpline', number: '1930' },
  ];

  const styles = {
    pageWrapper: {
      padding: '20px',
      backgroundColor: '#f9f9f9',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      width: '100%',
      maxWidth: '800px',
    },
    heading: {
      textAlign: 'center',
      color: '#333',
      marginBottom: '20px',
    },
    card: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      marginBottom: '20px',
    },
    name: {
      fontSize: '18px',
      fontWeight: '500',
      color: '#333',
    },
    callButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#28a745',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      padding: '10px 20px',
      fontSize: '16px',
      cursor: 'pointer',
    },
    icon: {
      marginRight: '8px',
    },
  };

  return (
    <div><Navbar/>
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        {/* <h1 style={styles.heading}>Emergency Helpline Numbers</h1> */}
        {helplines.map((helpline, index) => (
          <div key={index} style={styles.card}>
            <span style={styles.name}>{helpline.name}</span>
            <button style={styles.callButton}>
              <FaPhone style={styles.icon} /> {helpline.number}
            </button>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default EmergencyHelpline;
