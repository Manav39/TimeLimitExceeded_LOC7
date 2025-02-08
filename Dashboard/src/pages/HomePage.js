import { Ambulance, MapPin, CreditCard, Hospital, Phone, Bell, Languages } from "lucide-react";
import hero_img from "../images/hero_img.png";
import Navbar from "./Navbar";

const HomePage = () => {
  return (
    <div style={styles.container}>
      
      <Navbar/>
      <main>
        <section style={styles.hero}>
          <div style={styles.heroContent}>
            <div style={styles.heroText}>
              <h2 style={styles.heroTitle}>"Because Every Second      Counts"</h2>
              <p style={styles.heroSubtitle}>
                Fast, reliable ambulance service at your fingertips
              </p>
              <div style={styles.bookingForm}>
                <button style={styles.button}>Book Now</button>
              </div>
            </div>
            <div style={styles.heroImage}></div>
          </div>
        </section>

        <section style={styles.features}>
          <h3 style={styles.sectionTitle}>Key Features</h3>
          <div style={styles.featureGrid}>
            <FeatureCard
              icon={<Ambulance size={40} color="#ff0000" />}
              title="Real-time Tracking"
              description="Track your ambulance in real-time with GPS integration"
            />
            <FeatureCard
              icon={<MapPin size={40} color="#ff0000" />}
              title="Nearest Hospital Finder"
              description="Quickly locate the nearest hospitals based on your location"
            />
            <FeatureCard
              icon={<CreditCard size={40} color="#ff0000"  />}
              title="Easy Payments"
              description="Secure and hassle-free payment options including UPI and cards"
            />
            <FeatureCard
              icon={<Hospital size={40} color="#ff0000" />}
              title="Hospital Information"
              description="Get details about nearby hospitals and available services"
            />
            <FeatureCard
              icon={<Bell size={40} color="#ff0000" />}
              title="Push Notifications"
              description="Receive real-time alerts about your ambulance status"
            />
            <FeatureCard
              icon={<Languages size={40} color="#ff0000" />}
              title="Multilingual Support"
              description="Use the app in your preferred regional language"
            />
          </div>
        </section>

        <section style={styles.helpline}>
          <h3 style={styles.sectionTitle}>Emergency Helpline</h3>
          <p style={styles.helplineText}>In case of extreme emergencies, call our 24/7 helpline</p>
          <div style={styles.helplineNumber}>
            <Phone size={24} color="#ff0000" />
            <span>108</span>
          </div>
        </section>
      </main>

      <footer style={styles.footer}>
        <p>&copy; 2025 Smart Ambulance Booking System. All rights reserved.</p>
        <div>
          <a href="/privacy" style={styles.footerLink}>Privacy Policy</a>
          <a href="/terms" style={styles.footerLink}>Terms of Service</a>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div style={styles.featureCard}>
      <div style={styles.featureIcon}>{icon}</div>
      <h4 style={styles.featureTitle}>{title}</h4>
      <p style={styles.featureDescription}>{description}</p>
    </div>
  );
};

const styles = {
  container: {
    width: "100vw",
    fontFamily: "'Roboto', sans-serif",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    margin: 0,
    padding: 0,
  },
  
  hero: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "6rem 1rem",
    backgroundColor: "#f9f9f9",
  },
  heroContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: "1200px",
    width: "100%",
  },
  heroText: {
    flex: 1,
    marginRight: "2rem",
    color: "#333",
  },
  heroTitle: {
    fontSize: "3rem",
    fontWeight: "700",
    marginBottom: "1rem",
    fontFamily: "'Montserrat', sans-serif",
    fontStyle:"italic",
  },
  heroSubtitle: {
    fontSize: "1.5rem",
    fontWeight: "400",
    marginBottom: "2rem",
    color: "#555",
  },
  bookingForm: {
    display: "flex",
    gap: "1rem",
  },
  heroImage: {
    flex: 1,
    height: "300px",
    backgroundImage: `url(${hero_img})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "8px",
  },
  button: {
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    backgroundColor: "#ff0000",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    fontFamily: "'Roboto', sans-serif",
  },
  features: {
    padding: "4rem 1rem",
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: "2.5rem",
    textAlign: "center",
    marginBottom: "2.5rem",
    color: "#ff0000",
    fontWeight: "700",
    fontFamily: "'Montserrat', sans-serif",
  },
  featureGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "2rem",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  featureCard: {
    backgroundColor: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
  },
  featureIcon: {
    display: "flex", // Added to center the icon
    alignItems: "center", // Vertically align the icon
    justifyContent: "center", // Horizontally align the icon
    marginBottom: "1rem",
  },
  featureTitle: {
    fontSize: "1.5rem",
    marginBottom: "0.5rem",
    color: "#ff0000",
    fontWeight: "600",
    fontFamily: "'Roboto', sans-serif",
  },
  featureDescription: {
    fontSize: "1rem",
    color: "#333",
    fontWeight: "400",
  },

  helpline: {
    backgroundColor: "#ff0000",
    color: "white",
    padding: "4rem 1rem",
    textAlign: "center",
  },
  helplineText: {
    fontSize: "1.25rem",
    marginBottom: "1rem",
  },
  helplineNumber: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginTop: "1rem",
  },
  footer: {
    backgroundColor: "#ff0000",
    color: "white",
    padding: "2rem 1rem",
    textAlign: "center",
    marginTop: "auto",
  },
  footerLink: {
    color: "white",
    textDecoration: "none",
    margin: "0 0.5rem",
  },
}

export default HomePage

