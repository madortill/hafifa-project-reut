import React, { useState } from "react";
import "./CordinationPage.css";

// Assets
import tillLogo from "../../assets/images/logoTill.png";
import brokenEarth from "../../assets/images/brokenEarth.svg";
import lavian from "../../assets/images/lavian.svg";
import cordinationImg from "../../assets/images/cordination.svg";
import nextBtn from "../../assets/images/next.svg";
import asteroidImg from "../../assets/images/asteroid.svg"; // ודאי שיש לך קובץ כזה

const CordinationPage = () => {
    const [count, setCount] = useState(0);

    const info = [
        {
            title: "איך נפוצץ אסטרואיד",
            text: "אחרי שהכרתם את שלל סוגי האסטרואידים ותרגלתם, הגיע הזמן ללמוד מה התפקיד שלכם כדי שנוכל להציל את כדור הארץ",
            img: brokenEarth,
            showLearnText: true,
            type: "regular"
        },
        {
            title: "איך נפוצץ אסטרואיד",
            text: "תחנת השיגור היא האחראית לחישוב קואורדינטות שבהן האסטרואיד נמצא בכל רגע נתון.",
            img: lavian,
            showLearnText: false,
            type: "asteroids" // סוג מיוחד לעמוד השני
        },
        {
            title: "מה זה קואורדינטה",
            text: "קואורדינטה- הן קבוצת מספרים המציינת את מיקומו של גוף. מדובר בעצם במערכת צירים.",
            img: cordinationImg,
            showLearnText: false,
            type: "regular"
        }
    ];

    const handleNext = () => {
        if (count < info.length - 1) {
            setCount(prev => prev + 1);
        }
    };

    const currentPage = info[count];

    return (
        <div className="page-container">
            {/* Header */}
            <header className="page-header">
                <img src={tillLogo} alt="Logo" className="till-logo" />
                <div className="title-area">
                    {/* כותרת מעוגלת ב-SVG כדי להתאים לעיצוב בתמונה */}
                    <svg viewBox="0 0 500 150" className="curve-svg">
                        <path id="headerCurve" d="M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97" fill="transparent" />
                        <text className="curved-text-style">
                            <textPath xlinkHref="#headerCurve" startOffset="50%" textAnchor="middle">
                                {currentPage.title}
                            </textPath>
                        </text>
                    </svg>
                </div>
            </header>

            {/* Main Content */}
            <main className="content-section">
                <div className="text-bubble">
                    <p>{currentPage.text}</p>
                </div>
                
                <div className="image-container">
                    {/* אם אנחנו בעמוד השני - מציגים 3 אסטרואידים לחיצים */}
                    {currentPage.type === "asteroids" ? (
                        <div className="asteroids-grid">
                            {[1, 2, 3].map((item) => (
                                <img 
                                    key={item}
                                    src={asteroidImg} 
                                    alt="Asteroid" 
                                    className="clickable-asteroid" 
                                    onClick={handleNext} 
                                />
                            ))}
                        </div>
                    ) : (
                        /* עמוד רגיל - תמונה אחת גדולה */
                        <img src={currentPage.img} alt="Illustration" className="main-img" />
                    )}
                </div>
            </main>

            {/* Footer Navigation */}
            <footer className="footer-nav">
                {currentPage.showLearnText && <h2 className="learn-text">בואו נלמד</h2>}
                
                {/* החץ מופיע רק אם זה לא העמוד של האסטרואידים (שם לוחצים על האסטרואיד) */}
                {currentPage.type !== "asteroids" && (
                    <img 
                        src={nextBtn} 
                        alt="Next" 
                        className="next-arrow-icon" 
                        onClick={handleNext}
                        style={{ cursor: 'pointer', zIndex: 10 }} 
                    />
                )}
            </footer>
        </div>
    );
};

export default CordinationPage;