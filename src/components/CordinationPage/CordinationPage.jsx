import React, { useState } from "react";
import "./CordinationPage.css";

// Assets
import tillLogo from "../../assets/images/logoTill.png";
import brokenEarth from "../../assets/images/brokenEarth.svg";
import lavian from "../../assets/images/lavian.svg";
import cordinationImg from "../../assets/images/cordination.svg";
import nextBtn from "../../assets/images/next.svg";
import asteroidImg from "../../assets/images/asteroid.svg";
import Header from "../Header/Header";

const CordinationPage = () => {
    const [count, setCount] = useState(0);

    const info = [
        {
            title: "איך נפוצץ אסטרואיד?",
            text: "אחרי שהכרתם את שלל סוגי האסטרואידים ותרגלתם, הגיע הזמן ללמוד מה התפקיד שלכם כדי שנוכל להציל את כדור הארץ",
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
            text: "קואורדינטה- הן קבוצת מספרים המציינת את מיקומו של גוף. מדובר בעצם במערכת צירים.",
            img: cordinationImg,
            showLearnText: false,
            type: "regular"
        }
    ];

    const handleNext = (e) => {
        if (e) e.stopPropagation(); // עוצר את הלחיצה מפעפוע לדיבים חוסמים
        if (count < info.length - 1) {
            setCount(prev => prev + 1);
        }
    };

    const currentPage = info[count];

    return (
        <div className="page-container" style={{ pointerEvents: 'auto' }}>
            <header className="page-header">
                <Header chapterName={currentPage.title}/>
                <img src={tillLogo} alt="Logo" className="till-logo" />
                <div className="title-area">
                    <h1 className="curved-title-text">{currentPage.title}</h1>
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
                        {[1, 2, 3, 4].map((i) => (
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
                {currentPage.showLearnText && <h2 className="learn-text">בואו נלמד</h2>}
                {currentPage.type !== "asteroids" && (
                    <img 
                        src={nextBtn} 
                        className="next-arrow-icon" 
                        onClick={handleNext}
                        style={{ cursor: 'pointer', zIndex: 2, position: 'relative' }} 
                    />
                )}
            </footer>
        </div>
    );
};

export default CordinationPage;