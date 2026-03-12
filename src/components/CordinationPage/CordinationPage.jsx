import React, { useState } from "react";
import "./CordinationPage.css";

// Assets
import tillLogo from "../../assets/images/logoTill.png";
import brokenEarth from "../../assets/images/brokenEarth.svg";
import lavian from "../../assets/images/lavian.svg";
import cordinationImg from "../../assets/images/cordination.svg";
import coorImg from "../../assets/images/coorImg.svg";
import asteroidImg from "../../assets/images/asteroid.svg";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";

const CordinationPage = () => {
    const [count, setCount] = useState(0);
    const secondryTitle=["איפה זה פוגש אותנו?","איך זה קורה?","הגדרה"];
    const info = [
        {
            title: "איך נפוצץ אסטרואיד?",
            text: "אחרי שהכרתם את שלל סוגי האסטרואידים ותרגלתם, הגיע הזמן ללמוד מה התפקיד שלכם כדי שנוכל להציל את כדור הארץ!",
            img: brokenEarth,
            showLearnText: true,
            type: "regular"
        },
        {
            title: "איך נפוצץ אסטרואיד?",
            text: "תחנת השיגור היא האחראית לחישוב קואורדינטות שבהן האסטרואיד נמצא בכל רגע נתון.",
            img: lavian,
            showLearnText: false,
            type: "asteroids"
        },
        {
            title: "מה זה קואורדינטה?",
            text: "קואורדינטה- הן קבוצת מספרים המציינת את מיקומו של גוף. מדובר בעצם במערכת צירים.לדוגמא (2,2)",
            img: coorImg,
            showLearnText: false,
            type: "regular"
        }
    ];
    const navigate=useNavigate();
    const handleNext = (e) => {
        if (e) e.stopPropagation(); 
        if (count < info.length - 1) {
            setCount(prev => prev + 1);
        }
        else {
            navigate("/AstroidNinja");
        }
    };

    const currentPage = info[count];

    return (
        <div className="page-container" style={{ pointerEvents: 'auto' }}>
            <img src={asteroidImg} className="decor-asteroid ast-left" alt="asteroid" />
            <img src={asteroidImg} className="decor-asteroid ast-right" alt="asteroid" />
            <header className="page-header">
                <Header chapterName={currentPage.title} imgId={3} />
                <img src={tillLogo} alt="Logo" className="till-logo" />
                    <h3 className="curved-title-text">{secondryTitle[count]}</h3>
                <div className="title-area">
                </div>
            </header>

            <main className="content-section">
                <div className="text-bubble">
                    <p>{currentPage.text}</p>
                </div>
        <div className="image-container">
            {currentPage.type === "asteroids" ? (
                <div className="space-scene">
                    <div className="satellite-wrapper">
                        <img src={lavian} alt="Satellite" className="satellite-img" />
                        <div className="coord-bubble">x,y</div>
                    </div>

                    <div className="asteroids-scatter">
                        {[1, 2, 3].map((i) => (
                            <img 
                                key={i}
                                src={asteroidImg} 
                                className={`clickable-asteroid ast-${i}`} 
                                onClick={handleNext} 
                                alt="Asteroid"
                            />
                        ))}
                        <div className="main-asteroid-wrapper" onClick={handleNext}>
                            <img src={asteroidImg} className="clickable-asteroid main-ast" alt="Target" />
                            <span className="question-mark">?</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="simple-image-wrapper">
                    <img src={currentPage.img} className="main-img" alt="Content" />
                    {currentPage.img === cordinationImg && <div className="coord-bubble large"></div>}
                </div>
            )}
        </div>
            </main>

            <footer className="footer-nav">
                
                {currentPage.type !== "asteroids" && (
                  <>
                    <div className="bounce-arrow">
        <svg onClick={handleNext} className="arrow-svg next-arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        style={{ cursor: 'pointer', zIndex: 2, position: 'absolute' }} >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
        </svg>
      </div> 
      </>
                )}
            </footer>
        </div>
    );
};

export default CordinationPage;