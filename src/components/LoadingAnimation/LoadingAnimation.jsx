// import React from "react";
// import { useState } from "react";
// import "./LoadingAnimation.css";
// import { DotLottieReact } from '@lottiefiles/dotlottie-react';
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const LoadingAnimation=()=>{
//     const navigate = useNavigate();

//      useEffect(() => {
//     const timer = setTimeout(() => {
//       navigate("/start");
//     }, 12000); 

//     return () => clearTimeout(timer);
//   }, [navigate]);

//   return (
//     <>
   
//     <div id="container-animation">
//     <DotLottieReact
//       src="https://lottie.host/e26a54ec-ff2e-4c99-999d-f4b1f6220aa3/fQWJMrONHQ.lottie"
//     loop
//     autoplay
//     backgroundColor="#081131ff" 
//     id="animation"
//     />
// </div>
//     </>
//   )
// }
// export default LoadingAnimation; 
import React, { useEffect, useState } from "react";
import "./LoadingAnimation.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useNavigate } from "react-router-dom";
import asteroidImg from "../../assets/images/asteroid.svg";

const LoadingAnimation = () => {
  const navigate = useNavigate();

  const [showAsteroid, setShowAsteroid] = useState(false);
  const [explode, setExplode] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const asteroidTimer = setTimeout(() => {
      setShowAsteroid(true);
    }, 6000);

    const explosionTimer = setTimeout(() => {
      setExplode(true);
    }, 8500);

    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 10500);

    return () => {
      clearTimeout(asteroidTimer);
      clearTimeout(explosionTimer);
      clearTimeout(textTimer);
    };
  }, []);

  return (
    <div id="container-animation">
      
      {!showText && (
        <DotLottieReact
          src="https://lottie.host/e26a54ec-ff2e-4c99-999d-f4b1f6220aa3/fQWJMrONHQ.lottie"
          autoplay
          loop={false}
          id="animation"
        />
      )}

      {showAsteroid && !explode && (
        <img src={asteroidImg} className="asteroid-img" alt="asteroid" />
      )}

      {explode && <div className="explosion"></div>}

      {showText && (
        <>
        <div className="story-screen">
          <h2>אוי לא....</h2>
          <p>
            נראה שהחללית שלנו שבקה חיים בגלל משהו עגול ומוזר בשם אסטרואיד?!
          </p>
          <p>
            בואו נלמד איך לפוצץ את האסטרואידים לפני שיהיה מאוחר מידי גם לכדור הארץ!!
          </p>

          <button onClick={() => navigate("/start") }>
            התחלת הלומדה
          </button>
        {/* <div className="stars">
        <div className="star"></div>
        </div>     */}
        </div>
        </>
      )}
    </div>
  );
};

export default LoadingAnimation;

