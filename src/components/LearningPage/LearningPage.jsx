
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header.jsx";
import tillLogo from "../../assets/images/logoTill.png";
import nextBtn from "../../assets/images/next.svg";
import astroide from "../../assets/images/asteroid.svg";
import "../../stars.sass";
import learningDataJson from "../../data.json";

import Carousel from "../Carusel/Carusel.jsx";
import MemoryGame from "../MemoryGame/MemoryGame.jsx";

import "./LearningPage.css";

const LearningPage = () => {
  const navigate = useNavigate();
 const learningData = learningDataJson?.pages || [];
const [currentPage, setCurrentPage] = useState(0);

const pageData = learningData[currentPage];

if (!pageData) return null;


  const handleNext = () => {
    if (currentPage < learningData.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      navigate("/end"); 
    }
  };

const handleBack = () => {

  if (currentPage > 0) {
    setCurrentPage(prev => prev - 1);
  } else {
    navigate("/");
  }
};

  return (
    <div className="LearningPage">
        <div className="star"></div>

      <Header chapterName={pageData.chapterName} />

  <img src={tillLogo} className="till-logo" alt="logo" />
  <img src={astroide} onClick={handleBack} id="astroide1" className="astroide" alt="astroide" />
  <img src={astroide} onClick={handleNext} id="astroide2" className="astroide" alt="astroide" />

<div className="page-container">
  <div className="page-content">
    {pageData.pageType === "carusel" && <Carousel />}
    {pageData.pageType === "game" && <MemoryGame />}
    {pageData.pageType !== "carusel" && pageData.pageType !== "game" && (
      <>
        {pageData.subTitle && <h2>{pageData.subTitle}</h2>}
        <p>{pageData.content}</p>
      </>
    )}
  </div>
</div>

  {/* כפתורי ניווט */}
  <div className="navigation-buttons">
    <button onClick={handleBack}>חזור</button>
    <img src={nextBtn} alt="Next" onClick={handleNext} />
  </div>
</div>
  );
};

export default LearningPage;
