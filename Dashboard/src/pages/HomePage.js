import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Ambulance,
  MapPin,
  CreditCard,
  Hospital,
  Phone,
  Bell,
  Languages,
} from "lucide-react";
import hero_img from "../images/hero_img.png";
import Navbar from "./Navbar";

const HomePage = () => {
  const { t } = useTranslation();

  useEffect(() => {
    const getLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            localStorage.setItem("userLatitude", latitude);
            localStorage.setItem("userLongitude", longitude);
          },
          (error) => {
            if (error.code === error.PERMISSION_DENIED) {
              alert(t("location_permission_alert"));
              getLocation();
            }
          }
        );
      } else {
        alert(t("location_not_supported"));
      }
    };

    getLocation();
  }, [t]);

  return (
    <div style={styles.container}>
      <Navbar />
      <main>
        <section style={styles.hero}>
          <div style={styles.heroContent}>
            <div style={styles.heroText}>
              <h2 style={styles.heroTitle}>{t("home_tagline")}</h2>
              <p style={styles.heroSubtitle}>{t("home_description")}</p>
              <div style={styles.bookingForm}>
                <button style={styles.button}>{t("book_now")}</button>
              </div>
            </div>
            <div style={styles.heroImage}></div>
          </div>
        </section>

        <section style={styles.features}>
          <h3 style={styles.sectionTitle}>{t("key_features")}</h3>
          <div style={styles.featureGrid}>
            <FeatureCard
              icon={<Ambulance size={40} color="#ff0000" />}
              title={t("feature_realtime_tracking")}
              description={t("feature_realtime_tracking_desc")}
            />
            <FeatureCard
              icon={<MapPin size={40} color="#ff0000" />}
              title={t("feature_hospital_finder")}
              description={t("feature_hospital_finder_desc")}
            />
            <FeatureCard
              icon={<CreditCard size={40} color="#ff0000" />}
              title={t("feature_easy_payments")}
              description={t("feature_easy_payments_desc")}
            />
            <FeatureCard
              icon={<Hospital size={40} color="#ff0000" />}
              title={t("feature_hospital_info")}
              description={t("feature_hospital_info_desc")}
            />
            <FeatureCard
              icon={<Bell size={40} color="#ff0000" />}
              title={t("feature_notifications")}
              description={t("feature_notifications_desc")}
            />
            <FeatureCard
              icon={<Languages size={40} color="#ff0000" />}
              title={t("feature_multilingual")}
              description={t("feature_multilingual_desc")}
            />
          </div>
        </section>

        <section style={styles.helpline}>
          <h3 style={styles.sectionTitle}>{t("emergency_helpline")}</h3>
          <p style={styles.helplineText}>{t("emergency_helpline_desc")}</p>
          <div style={styles.helplineNumber}>
            <Phone size={24} color="#ff0000" />
            <span>108</span>
          </div>
        </section>
      </main>

      <footer style={styles.footer}>
        <p>{t("footer_rights")}</p>
        <div>
          <a href="/privacy" style={styles.footerLink}>
            {t("footer_privacy")}
          </a>
          <a href="/terms" style={styles.footerLink}>
            {t("footer_terms")}
          </a>
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
    fontStyle: "italic",
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
};

export default HomePage;
