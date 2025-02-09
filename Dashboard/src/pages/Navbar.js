import React from "react";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { i18n } = useTranslation();
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };
  return (
    <header style={styles.header}>
      <div style={styles.headerContent}>
        <h1 style={styles.logo}> {i18n.t("title")}</h1>
        <nav>
          <ul style={styles.navList}>
            <li>
              <a href="/" style={styles.navLink}>
                {i18n.t("nh")}
              </a>
            </li>
            <li>
              <a href="/register" style={styles.navLink}>
                {i18n.t("nr")}
              </a>
            </li>
            <li>
              <a href="/about" style={styles.navLink}>
                {i18n.t("na")}
              </a>
            </li>
            {/* <li>
            <a href="/contact" style={styles.navLink}>Contact</a>
          </li> */}
            <li>
              <a href="/emergencyhelpline" style={styles.navLink}>
                {i18n.t("ne")}
              </a>
            </li>
            <li className="flex gap-4">
              <button
                className={`flex items-center gap-2 px-4 py-2 border-2 border-red-600 text-red-600 bg-white rounded-lg transition-all ${
                  i18n.language === "en" ? "bg-red-600 text-white" : ""
                }`}
                onClick={() => changeLanguage("en")}
              >
                🇬🇧 English
              </button>

              <button
                className={`flex items-center gap-2 px-4 py-2 border-2 border-red-600 text-red-600 bg-white rounded-lg transition-all ${
                  i18n.language === "hi" ? "bg-red-600 text-white" : ""
                }`}
                onClick={() => changeLanguage("hi")}
              >
                🇮🇳 हिन्दी
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

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
    // fontWeight: "bold",
    // fontFamily: "'Montserrat', sans-serif",
    fontWeight: "800",
    // fontSize: "1.1rem",
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
};

export default Navbar;
