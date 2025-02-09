import React from 'react';

const GovernmentPrograms = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#B22222' }}>Government Schemes</h1>

      {/* PMASBY Section */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Pradhan Mantri Atma Nirbhar Swasth Bharat Yojana (PMASBY)</h2>
        <div style={styles.badgeContainer}>
          <span style={styles.badge}>Ministry of Health and Family Welfare</span>
          <span style={styles.badge}>Central Scheme</span>
        </div>
        <p style={styles.paragraph}>
          Launched with the objective to fill critical gaps in public health infrastructure, especially in primary care and critical care facilities in both rural and urban areas.
        </p>
        <div style={styles.subsection}>
          <h3>Objectives:</h3>
          <ul style={styles.list}>
            <li>Developing capacities of health systems at all levels.</li>
            <li>Preparing health systems to respond to current and future pandemics/disasters.</li>
          </ul>
        </div>
        <div style={styles.subsection}>
          <h3>Key Features:</h3>
          <ul style={styles.list}>
            <li>Support for 17,788 rural Health and Wellness Centres.</li>
            <li>Setting up integrated Public Health Labs in districts.</li>
            <li>Strengthening National Centre for Disease Control (NCDC).</li>
            <li>Establishment of Critical Care Hospitals in districts.</li>
          </ul>
        </div>
        <div style={styles.buttonContainer}>
          <button style={styles.button} onClick={() => window.open('https://pmaymis.gov.in/', '_blank')}>Apply Now</button>
          <button style={styles.button} onClick={() => window.open('https://www.youtube.com/watch?v=3VtAjSo4zAo&t=2s', '_blank')}>How to Apply</button>
        </div>
      </div>

      {/* PMSSN Section */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Pradhan Mantri Swasthya Suraksha Nidhi (PMSSN)</h2>
        <div style={styles.badgeContainer}>
          <span style={styles.badge}>Ministry of Health and Family Welfare</span>
        </div>
        <p style={styles.paragraph}>
          A single non-lapsable reserve fund for Health to support flagship health schemes.
        </p>
        <div style={styles.subsection}>
          <h3>Key Features:</h3>
          <ul style={styles.list}>
            <li>Supports Ayushman Bharat schemes and National Health Mission.</li>
            <li>Helps in emergency preparedness during health crises.</li>
          </ul>
        </div>
        <div style={styles.buttonContainer}>
          <button style={styles.button} onClick={() => window.open('https://pmssy.mohfw.gov.in/', '_blank')}>Apply Now</button>
          <button style={styles.button} onClick={() => window.open('https://www.youtube.com/watch?v=2IWAFzufF0s', '_blank')}>How to Apply</button>
        </div>
      </div>

      {/* PMSSY Section */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Pradhan Mantri Swasthya Suraksha Yojana (PMSSY)</h2>
        <div style={styles.badgeContainer}>
          <span style={styles.badge}>Ministry of Health and Family Welfare</span>
        </div>
        <p style={styles.paragraph}>
          Aimed at correcting regional imbalances in healthcare and boosting medical education in underserved states.
        </p>
        <div style={styles.subsection}>
          <h3>Key Features:</h3>
          <ul style={styles.list}>
            <li>Setting up AIIMS-like institutions in various states.</li>
            <li>Upgradation of existing medical colleges.</li>
          </ul>
        </div>
        <div style={styles.buttonContainer}>
          <button style={styles.button} onClick={() => window.open('https://www.pmssy.gov.in/', '_blank')}>Apply Now</button>
          <button style={styles.button} onClick={() => window.open('https://www.youtube.com/watch?v=2IWAFzufF0s', '_blank')}>How to Apply</button>
        </div>
      </div>

      {/* National Health Mission Section */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>National Health Mission (NHM)</h2>
        <div style={styles.badgeContainer}>
          <span style={styles.badge}>Ministry of Health and Family Welfare</span>
        </div>
        <p style={styles.paragraph}>
          Launched to address malnutrition, reduce maternal and child mortality, and provide equitable healthcare services.
        </p>
        <div style={styles.subsection}>
          <h3>Objectives:</h3>
          <ul style={styles.list}>
            <li>Reduce maternal mortality rate (MMR) to 1/1000 live births.</li>
            <li>Reduce infant mortality rate (IMR) to 25/1000 live births.</li>
            <li>Prevent and reduce anemia in women aged 15-49 years.</li>
          </ul>
        </div>
        <div style={styles.buttonContainer}>
          <button style={styles.button} onClick={() => window.open('https://nhm.gov.in/', '_blank')}>Apply Now</button>
          <button style={styles.button} onClick={() => window.open('https://www.youtube.com/watch?v=5Z3xjRZxVJw', '_blank')}>How to Apply</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    marginBottom: '20px',
    borderLeft: '5px solid #B22222',
    transition: 'all 0.3s ease-in-out',
  },
  cardTitle: {
    color: '#B22222',
    fontSize: '24px',
    marginBottom: '10px',
  },
  badgeContainer: {
    marginBottom: '10px',
  },
  badge: {
    display: 'inline-block',
    backgroundColor: '#B22222',
    color: '#fff',
    padding: '5px 10px',
    borderRadius: '5px',
    marginRight: '10px',
  },
  paragraph: {
    fontSize: '16px',
    color: '#333',
    marginBottom: '10px',
  },
  subsection: {
    marginBottom: '15px',
  },
  list: {
    listStyleType: 'disc',
    paddingLeft: '20px',
    color: '#555',
  },
  buttonContainer: {
    marginTop: '15px',
  },
  button: {
    backgroundColor: '#B22222',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '10px',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#8B0000',
  }
};

export default GovernmentPrograms;
