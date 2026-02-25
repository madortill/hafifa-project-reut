
import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import tillLogo from "../../assets/images/logoTill.png";
import nextBtn from "../../assets/images/next.svg";
import astroide from "../../assets/images/asteroid.svg";
import astroidevil from "../../assets/images/astroidevil.svg";
import whatIsAstroid from "../../assets/images/whatIsAstroid.svg";

import Header from "../Header/Header.jsx";
import learningDataJson from "../../data.json";
import Carousel from "../Carusel/Carusel.jsx";
import MemoryGame from "../MemoryGame/MemoryGame.jsx";
import "./LearningPage.css";
import Instruction from "../Instruction/Instruction.jsx";

const LearningPage = () => {

const navigate = useNavigate();
const learningData = learningDataJson?.pages || [];
const [currentPage, setCurrentPage] = useState(0);
const imgLoc=[whatIsAstroid,astroidevil,null]
const pageData = learningData[currentPage];


if (!pageData) return null;

const [showNextArrow, setShowNextArrow] = useState(true);
  
  // State 2: ספציפי לקרוסלה/משחקים
  const [isNextArrowVisible, setIsNextArrowVisible] = useState(true);

  // בכל פעם שעוברים עמוד ב-JSON, מאפסים את שני החצים שיופיעו כברירת מחדל
  useEffect(() => {
    setShowNextArrow(true);
    setIsNextArrowVisible(true);
  }, [currentPage]);

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


  useEffect(() => {
    if (pageData.pageType === "AstroidGame") {
      navigate("/AstroidNinja");
    }
  }, [pageData.pageType, navigate]);

  return (
    <div className="LearningPage">

      <Header chapterName={pageData.chapterName} />
      <img src={tillLogo} className="till-logo" alt="logo" />
      <img src={astroide} onClick={handleBack} id="astroide1" className="astroide" alt="astroide" />
      <img src={astroide} onClick={handleNext} id="astroide2" className="astroide" alt="astroide" />
 <div className="page-container">
      <div className="page-content">
        {pageData.pageType === "carusel" && <Carousel onLastSlideChange={setIsNextArrowVisible} />}
        {pageData.pageType === "game" && <MemoryGame setArrowVisible={setIsNextArrowVisible} />}
        {pageData.pageType === "instruction" && <Instruction />}
        {pageData.pageType === "cordination" && <cordination />}
        {pageData.pageType !== "carusel" &&
         pageData.pageType !== "game" &&
         pageData.pageType !== "AstroidGame" && (
          <>
            {pageData.subTitle && <h2>{pageData.subTitle}</h2>}
            <p>{pageData.content}</p>
          </>
        )}
        {imgLoc[currentPage]!==null && <img 
          src={imgLoc[currentPage]} 
          className={`as-img ${currentPage === 0 ? 'bigger' : ''}`} 
          alt="asteroid"
          onClick={handleNext}
        /> }   
        </div>
   
       {(showNextArrow && isNextArrowVisible) && (
          <div className="bounce-arrow">
            <svg onClick={handleNext} className="arrow-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
            </svg>
          </div>
        )}
    </div>
</div>
  );
};

export default LearningPage;
