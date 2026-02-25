import React from "react";
import { useState } from "react";
import "./OpenPage.css";
import tillLogo from "../../assets/images/logoTill.png";
import Header from "../Header/Header.jsx"
import { useNavigate } from "react-router-dom";
import nextBtn from "../../assets/images/next.svg"
import navBar from "../../assets/images/navBar.svg"

const OpenPage=()=> {
    const navigate = useNavigate();



  return (
 <>
  <div className="openPage">
    {/* חלק עליון - לוגו */}
    <div className="top-section">
      <img src={tillLogo} className="till-logo" alt="logo" />
    </div>

    {/* חלק מרכזי - כל הטקסטים והמפה */}
    <div className="middle-section">
      <div className="intro-text">
        <h1>ברוכים הבאים ללומדת אסטרואידים!</h1>
        <h5 className="sub-header">מה נלמד?</h5>
        <p className="main-p">
          זו מפת <del id="star-txt">הכוכבים</del> ההתקדמות שלנו בלומדה, היא תלווה אותנו לאורך הלומדה, רק תביטו לשמיים ושם היא נמצאת:)
        </p>
        
        <img className="navBar-img" src={navBar} alt="map" onClick={() => navigate("/learning")} />
        
        <p className="footer-p">
          ברגע שתסיימו נושא מסוים, הוא יתווסף למפה שלנו ותוכלו לחזור אליו.
        </p>
      </div>
    </div>

    {/* חלק תחתון - כפתור המשך */}
    <div className="bottom-section">
      <img src={nextBtn} onClick={() => navigate("/learning")} className="next-btn" alt="next" />
    </div>
  </div>
</>
  );
}

export default  OpenPage;
