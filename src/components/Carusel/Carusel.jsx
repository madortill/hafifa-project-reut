import React, { useState } from 'react';
import './Carusel.css';

import arrowRight from '../../assets/images/arrow-rigth.svg';
import arrowLeft from '../../assets/images/arrow-left.svg';
import babyImg from '../../assets/images/babyAs.svg';
import teenImg from '../../assets/images/middleAs.svg';
import adultImg from '../../assets/images/grownUpAs.svg';
import dotIcon from '../../assets/images/babydot.svg';
import doubleArrowDown from '../../assets/images/next.svg';
import Instruction from "../Instruction/Instruction.jsx";
const Carusel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slidesData = [
    {
      id: 1,
      subTitle: "אסטרואיד בייבי",
      content: "אסטרואיד ממש קטן והורס רק שכונות מקומיות.",
      image: babyImg, 
    },
    {
      id: 2,
      subTitle: "אסטרואיד נער מתבגר",
      content: "אסטרואיד שהוא די חרא כי הוא בכוונה מנסה להפציץ מקומות שהוא לא אוהב.",
      image: teenImg,
    },
    {
      id: 3,
      subTitle: "אסטרואיד בוגר",
      content: "אסטרואיד ממש גדול שיכול להשמיד את כל כדור הארץ.",
      image: adultImg,
    }
  ];

  const nextSlide = () => {
    if (currentIndex < slidesData.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handelNext = () => {
    <Instruction/>
  };

  const prevSlide = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const current = slidesData[currentIndex];

  return (
    <div className="carousel-screen">
      <main className="main-content" key={currentIndex}>
        <h2 className="asteroid-title">{current.subTitle}</h2>

        <div className="interaction-area">
          <button 
            className={`nav-btn ${currentIndex === 0 ? 'v-hidden' : ''}`} 
            onClick={prevSlide}
          >
            <img src={arrowRight} alt="prev" />
          </button>

          <div className="asteroid-frame">
            <div className="asteroid-circle">
              <img src={current.image} className="asteroid-img-kind" alt={current.subTitle} />
              {/* <div className="label-overlay">{current.subTitle}</div> */}
            </div>
          </div>

          <button 
            className={`nav-btn ${currentIndex === slidesData.length - 1 ? 'v-hidden' : ''}`} 
            onClick={nextSlide}
          >
            <img src={arrowLeft} alt="next" />
          </button>
        </div>

        <p className="asteroid-description">{current.content}</p>
      <footer className="footer-area">
        <div className="pagination-dots">
          {slidesData.map((_, i) => (
            <div key={i} className="dot-wrapper">
              {i === currentIndex ? 
                <img src={dotIcon} className="active-dot-img" alt="active" /> : 
                <div className="inactive-dot" />
              }
            </div>
          ))}
        </div>

        {/* חץ סיום מופיע רק בסוף */}
        <div className={`bottom-arrow ${currentIndex === slidesData.length - 1 ? 'visible' : ''}`}>
          <img src={doubleArrowDown} alt="continue" onClick={handelNext}/>
        </div>
      </footer>
      </main>

    </div>
  );
};

export default Carusel;