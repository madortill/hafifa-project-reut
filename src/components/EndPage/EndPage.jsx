import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header.jsx";
import alien from "../../assets/images/alien.svg";
import astroide from "../../assets/images/asteroid.svg";
import tillLogo from "../../assets/images/logoTill.png";
import NavBar from "../../assets/images/navBar.svg"; 
import "./EndPage.css";

const EndPage = () => {
  const navigate = useNavigate();

  return (
    <div className="end-page-wrapper">
      <img src={tillLogo} className="till-logo-end" alt="logo" />
      <img src={astroide} className="decor-asteroid ast-left" alt="asteroid" />
      <img src={astroide} className="decor-asteroid ast-right" alt="asteroid" />

      <Header chapterName="סוף לומדה" />

      <div className="end-main-container">
        <h1 className="end-title">איזה כיף סיימת <br /> את הלומדה!</h1>

        <div className="end-summary-box">
          <p className="summary-label">אלה כל הנושאים שעברנו עליהם:</p>
          <div className="white-line"></div>
          <img src={NavBar} className="summary-navbar-img" alt="progress map" />
        </div>

        <button className="reset-button" onClick={() => navigate("/start")}>
          לחזור לתחילת הלומדה
        </button>

        <div className="alien-footer-section">
          <div className="speech-bubble-tail">
             עכשיו אתם מוכשרים <br /> להיות אסטרונאוטים!
          </div>
          <img src={alien} className="alien-graphic" alt="alien" />
        </div>
      </div>
    </div>
  );
};

export default EndPage;