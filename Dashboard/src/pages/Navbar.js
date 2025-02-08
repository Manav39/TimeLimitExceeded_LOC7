import React from 'react'

const Navbar = () => {
  return (
    <header style={styles.header}>
    <div style={styles.headerContent}>
      <h1 style={styles.logo}>Sanjeevani</h1>
      <nav>
        <ul style={styles.navList}>
          <li>
            <a href="/" style={styles.navLink}>Home</a>
          </li>
          <li>
            <a href="/register" style={styles.navLink}>Register</a>
          </li>
          <li>
            <a href="/about" style={styles.navLink}>About</a>
          </li>
          <li>
            <a href="/contact" style={styles.navLink}>Contact</a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
  )
}

    const styles = {
        header: {
            backgroundColor: "#ff0000",
            color: "white",
            padding: "1rem",
          },
          headerContent: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "1200px",
            margin: "0 auto",
          },
          logo: {
            fontSize: "2rem",
            fontWeight: "bold",
            fontFamily: "'Montserrat', sans-serif",
          },
          navList: {
            display: "flex",
            listStyle: "none",
            gap: "1.5rem",
          },
          navLink: {
            
            color: "white",
            textDecoration: "none",
            fontWeight: "800",
            fontSize: "1.1rem",
        
          },
    }

export default Navbar
