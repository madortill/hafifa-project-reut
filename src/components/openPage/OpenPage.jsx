import React from "react";
import { useState } from "react";
import "./OpenPage.css";
import tillLogo from "../../assets/images/logoTill.png";
import Header from "../Header/Header.jsx"
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useNavigate } from "react-router-dom";
import nextBtn from "../../assets/images/next.svg"
import navBar from "../../assets/images/navBar.svg"

const OpenPage=()=> {
    const navigate = useNavigate();



  return (
    <>
      <div className="openPage">
      <div class="star"></div>
      <img src={tillLogo} className="till-logo" alt="logo" width="30px"/>
      <div className="intro-text">
      <h1>ברוכים הבאים ללומדת 
אסטרואידים!</h1>
      <h5>זו מפת הכוכבים ההתקדמות שלנו בלומדה, היא תלווה אותנו לאורך הלומדה, רק תביטו לשמיים ושם היא נמצאת:)</h5>
      <img className="navBar" src={navBar} onClick={()=>navigate("/learning")}></img>
      <h5>ברגע שתסיימו נושא מסוים, הוא יתווסף למפה שלנו ותוכלו לחזור אליו.</h5>
      </div>
      <img src={nextBtn} onClick={()=>navigate("/learning")}></img>
      </div>
    </>
  );
}

export default  OpenPage;
