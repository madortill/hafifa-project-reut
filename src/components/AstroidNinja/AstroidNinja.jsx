// // import React, { useEffect, useRef, useState, useCallback } from 'react';
// // import './AstroidNinja.css';

// // const ASTEROID_COLORS = ['#c0392b', '#8b6914', '#5d4e75', '#1a5276'];
// // const ASTEROID_SIZES = [32, 42, 52];

// // let idCounter = 0;

// // const AstroidNinja = ({ onFinish }) => {
// //   const [asteroids, setAsteroids] = useState([]);
// //   const [explosions, setExplosions] = useState([]);
// //   const [score, setScore] = useState(0);
// //   const [lives, setLives] = useState(3);
// //   const [gameOver, setGameOver] = useState(false);
// //   const [started, setStarted] = useState(false);
// //   const containerRef = useRef(null);
// //   const spawnInterval = useRef(null);
// //   const tickInterval = useRef(null);

// //   const TARGET_SCORE = 10;

// //   const spawnAsteroid = useCallback(() => {
// //     const containerWidth = containerRef.current?.offsetWidth || 300;
// //     const size = ASTEROID_SIZES[Math.floor(Math.random() * ASTEROID_SIZES.length)];
// //     const x = Math.random() * (containerWidth - size);
// //     const speedY = 1.2 + Math.random() * 1.5;
// //     const drift = (Math.random() - 0.5) * 0.8;
// //     const color = ASTEROID_COLORS[Math.floor(Math.random() * ASTEROID_COLORS.length)];
// //     const rotate = Math.random() * 360;
// //     const rotateSpeed = (Math.random() - 0.5) * 3;

// //     setAsteroids(prev => [...prev, {
// //       id: ++idCounter,
// //       x,
// //       y: -size,
// //       size,
// //       speedY,
// //       drift,
// //       color,
// //       rotate,
// //       rotateSpeed,
// //     }]);
// //   }, []);

// //   const tick = useCallback(() => {
// //     const containerHeight = containerRef.current?.offsetHeight || 600;

// //     setAsteroids(prev => {
// //       const surviving = [];
// //       let missed = 0;

// //       prev.forEach(a => {
// //         const newY = a.y + a.speedY * 4;
// //         const newX = a.x + a.drift;
// //         if (newY > containerHeight + 10) {
// //           missed++;
// //         } else {
// //           surviving.push({ ...a, y: newY, x: newX, rotate: a.rotate + a.rotateSpeed });
// //         }
// //       });

// //       if (missed > 0) {
// //         setLives(l => {
// //           const newLives = l - missed;
// //           if (newLives <= 0) setGameOver(true);
// //           return Math.max(0, newLives);
// //         });
// //       }

// //       return surviving;
// //     });
// //   }, []);

// //   const startGame = () => {
// //     setStarted(true);
// //     setScore(0);
// //     setLives(3);
// //     setGameOver(false);
// //     setAsteroids([]);
// //     setExplosions([]);

// //     spawnInterval.current = setInterval(spawnAsteroid, 900);
// //     tickInterval.current = setInterval(tick, 16);
// //   };

// //   useEffect(() => {
// //     return () => {
// //       clearInterval(spawnInterval.current);
// //       clearInterval(tickInterval.current);
// //     };
// //   }, []);

// //   useEffect(() => {
// //     if (gameOver || score >= TARGET_SCORE) {
// //       clearInterval(spawnInterval.current);
// //       clearInterval(tickInterval.current);
// //     }
// //   }, [gameOver, score]);

// //   // Keep tick updated
// //   useEffect(() => {
// //     if (!started || gameOver || score >= TARGET_SCORE) return;
// //     clearInterval(tickInterval.current);
// //     tickInterval.current = setInterval(tick, 16);
// //     return () => clearInterval(tickInterval.current);
// //   }, [tick, started, gameOver, score]);

// //   const hitAsteroid = (id, e) => {
// //     e.stopPropagation();
// //     const asteroid = asteroids.find(a => a.id === id);
// //     if (!asteroid) return;

// //     // Add explosion
// //     setExplosions(prev => [...prev, {
// //       id: Date.now(),
// //       x: asteroid.x + asteroid.size / 2,
// //       y: asteroid.y + asteroid.size / 2,
// //     }]);
// //     setTimeout(() => {
// //       setExplosions(prev => prev.filter(ex => ex.id !== Date.now()));
// //     }, 600);

// //     setAsteroids(prev => prev.filter(a => a.id !== id));
// //     setScore(s => s + 1);
// //   };

// //   const won = score >= TARGET_SCORE;

// //   return (
// //     <div className="ninja-wrap" ref={containerRef}>
// //       {!started && !gameOver && (
// //         <div className="ninja-overlay">
// //           <div className="ninja-emoji">☄️</div>
// //           <h3 className="ninja-title">אסטרואיד נינג'ה</h3>
// //           <p className="ninja-desc">לחץ על האסטרואידים לפני שהם מגיעים לתחתית!<br/>פוצץ {TARGET_SCORE} אסטרואידים לניצחון</p>
// //           <button className="continue-btn" onClick={startGame}>התחל משחק</button>
// //         </div>
// //       )}

// //       {started && !gameOver && !won && (
// //         <>
// //           <div className="ninja-hud">
// //             <div className="hud-score">⭐ {score}/{TARGET_SCORE}</div>
// //             <div className="hud-lives">
// //               {Array.from({ length: 3 }).map((_, i) => (
// //                 <span key={i} className={`life ${i < lives ? 'alive' : 'dead'}`}>♥</span>
// //               ))}
// //             </div>
// //           </div>

// //           <div className="ninja-field">
// //             {asteroids.map(a => (
// //               <button
// //                 key={a.id}
// //                 className="ninja-asteroid"
// //                 style={{
// //                   left: a.x,
// //                   top: a.y,
// //                   width: a.size,
// //                   height: a.size,
// //                   background: a.color,
// //                   transform: `rotate(${a.rotate}deg)`,
// //                   boxShadow: `0 0 16px ${a.color}88`,
// //                 }}
// //                 onPointerDown={(e) => hitAsteroid(a.id, e)}
// //               />
// //             ))}

// //             {explosions.map(ex => (
// //               <div
// //                 key={ex.id}
// //                 className="explosion"
// //                 style={{ left: ex.x, top: ex.y }}
// //               >
// //                 💥
// //               </div>
// //             ))}
// //           </div>
// //         </>
// //       )}

// //       {(gameOver || won) && (
// //         <div className="ninja-overlay">
// //           <div className="ninja-emoji">{won ? '🏆' : '💀'}</div>
// //           <h3 className="ninja-title">{won ? 'מדהים!' : 'נסה שוב!'}</h3>
// //           <p className="ninja-desc">פוצצת {score} אסטרואידים</p>
// //           <div className="ninja-btns">
// //             <button className="retry-btn" onClick={startGame}>שחק שוב</button>
// //             {won && (
// //               <button className="continue-btn" onClick={onFinish}>המשך →</button>
// //             )}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };


import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./AstroidNinja.css";
import asteroidSvg from "../../assets/images/asteroid.svg";
import play from "../../assets/images/ph_play-bold.svg";
import alien from "../../assets/images/alien.svg";
import play from "../../assets/images/bomb.svg";

const TARGET_SCORE = 15;
const ASTEROID_SIZE = 70;

const AstroidNinja = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const [asteroids, setAsteroids] = useState([]);
  const [explosions, setExplosions] = useState([]);
  const [slashPoints, setSlashPoints] = useState([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameState, setGameState] = useState("start");
  const [isSlicing, setIsSlicing] = useState(false);

    const idRef = useRef(0);

  /* ---------- Spawn ---------- */

  const spawnAsteroid = useCallback(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.offsetWidth;

    const x = Math.random() * (width - ASTEROID_SIZE - 40) + 20;

    setAsteroids((prev) => [
      ...prev,
      {
        id: idRef.current++, 
        x,
        y: -ASTEROID_SIZE,
        speedY: 3 + Math.random() * 2,
        speedX: (Math.random() - 0.5) * 3,
        rotate: Math.random() * 360,
      },
    ]);
  }, []);

  /* ---------- Tick ---------- */

  const tick = useCallback(() => {
    if (!containerRef.current) return;
    const height = containerRef.current.offsetHeight;

    setAsteroids((prev) => {
      let missed = 0;

      const updated = prev
        .map((a) => {
          const newX = a.x + a.speedX;
          const newY = a.y + a.speedY;

          if (newY > height) {
            missed++;
            return null;
          }

          return { ...a, x: newX, y: newY };
        })
        .filter(Boolean);

      if (missed > 0) {
        setLives((l) => {
          const newLives = l - missed;
          if (newLives <= 0) setGameState("gameOver");
          return Math.max(0, newLives);
        });
      }

      return updated;
    });
  }, []);

  useEffect(() => {
    let spawnInt;
    let tickInt;

    if (gameState === "playing") {
      spawnInt = setInterval(spawnAsteroid, 900);
      tickInt = setInterval(tick, 16);
    }

    return () => {
      clearInterval(spawnInt);
      clearInterval(tickInt);
    };
  }, [gameState, spawnAsteroid, tick]);

  /* ---------- Collision ---------- */

  const checkCollision = (x, y) => {
    setAsteroids((prev) =>
      prev.filter((a) => {
        const centerX = a.x + ASTEROID_SIZE / 2;
        const centerY = a.y + ASTEROID_SIZE / 2;

        const distance = Math.sqrt(
          (x - centerX) ** 2 + (y - centerY) ** 2
        );

        if (distance < ASTEROID_SIZE / 2) {
          setExplosions((ex) => [
            ...ex,
            {  id: idRef.current++, 
              x: centerX,
              y: centerY, },
          ]);

          setScore((s) => {
            const newScore = s + 1;
            if (newScore >= TARGET_SCORE) setGameState("won");
            return newScore;
          });

          return false;
        }

        return true;
      })
    );
  };

  /* ---------- Slash ---------- */

  const handlePointerMove = (e) => {
    if (!isSlicing || gameState !== "playing") return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setSlashPoints((prev) => [...prev.slice(-12), { x, y }]);
    checkCollision(x, y);
  };

  useEffect(() => {
    if (!explosions.length) return;
    const timeout = setTimeout(() => setExplosions([]), 250);
    return () => clearTimeout(timeout);
  }, [explosions]);

  const startGame = () => {
    setScore(0);
    setLives(3);
    setAsteroids([]);
    setExplosions([]);
    setGameState("playing");
  };

  const progressPercent = Math.min(
    (score / TARGET_SCORE) * 100,
    100
  );

  return (
    <div
      className="ninja-container"
      ref={containerRef}
      onPointerDown={() => {
        setIsSlicing(true);
        setSlashPoints([]);
      }}
      onPointerUp={() => {
        setIsSlicing(false);
        setSlashPoints([]);
      }}
      onPointerLeave={() => {
        setIsSlicing(false);
        setSlashPoints([]);
      }}
      onPointerMove={handlePointerMove}
    >
      {/* HUD */}
      <div className="ninja-header">
        <div>
          {[...Array(3)].map((_, i) => (
            <span
              key={i}
              className={`heart ${i < lives ? "filled" : "empty"}`}
            >
              ❤️
            </span>
          ))}
        </div>
        <div className="score-display">ניקוד: {score}</div>
      </div>

      {/* Progress */}
      <div className="progress-sidebar">
        <div className="progress-bar-bg">
          <div
            className="progress-fill"
            style={{ height: `${progressPercent}%` }}
          />
        </div>
        <div className="progress-text">
          {Math.round(progressPercent)}%
        </div>
      </div>

      {/* Slash */}
      <svg className="slash-svg">
        <polyline
          points={slashPoints.map((p) => `${p.x},${p.y}`).join(" ")}
        />
      </svg>

      {/* Asteroids */}
      {asteroids.map((a) => (
        <div
          key={a.id}
          className="ninja-asteroid-obj"
          style={{
            left: a.x,
            top: a.y,
            width: ASTEROID_SIZE,
            height: ASTEROID_SIZE,
            transform: `rotate(${a.rotate}deg)`,
          }}
        >
          <img
            src={asteroidSvg}
            alt="asteroid"
            className="ninja-asteroid-img"
          />
        </div>
      ))}

      {/* Explosions */}
      {explosions.map((ex) => (
        <div
          key={ex.id}
          className="explosion-effect"
          style={{ left: ex.x, top: ex.y }}
        >
          💥
        </div>
      ))}

      {/* Overlays */}
      {gameState === "start" && (
        <div className="ninja-modal-overlay">
          <div className="ninja-modal">
            <div className="modal-icon">🪐</div>
            <h2>תתכוננו לפיצוץ אסטרואידים-
עליכם לפוצץ בעזרת החלקה רק את האסטרואידים, להיזהר מפצצות שיורידו לכם חיים, וירח שיוסיף לכם חיים. 
החייזר  יופיע לכם שאלה- ועליכם לענות לעליה נכון כדי להמשיך במשחק. </h2>
            <img className="play-btn" onClick={startGame} src={play}></img>
          </div>
        </div>
      )}

      {gameState === "gameOver" && (
        <div className="ninja-modal-overlay">
          <div className="ninja-modal">
            <div className="modal-icon">💀</div>
            <h2>נראה שנגמרו לך החיים תזכרו שתרגול מוביל לשלמות!</h2>
            <img src={asteroidSvg} alt="astroid" className="side-astroid" id="astroid1"></img>
            <img src={asteroidSvg} alt="astroid" className="side-astroid" id="astroid2"></img>
            <button className="play-btn" onClick={startGame}>
              נסי שוב
            </button>
          </div>
        </div>
      )}

      {gameState === "won" && (
        <div className="ninja-modal-overlay">
          <div className="ninja-modal">
            <div className="modal-icon">🏆</div>
            <img src={asteroidSvg} alt="astroid" className="side-astroid" id="astroid3"></img>
            <img src={asteroidSvg} alt="astroid" className="side-astroid" id="astroid4"></img>
            <h2>כל הכבוד פוצצת את כל האסטרואידים ונהפכת לאסטרונאוט לתפארת! </h2>
            <button
              className="play-btn"
              onClick={() => navigate("/end")}
            >
              המשך
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AstroidNinja;



// const spawnAsteroid = useCallback(() => {
//   if (!containerRef.current) return;

//   const width = containerRef.current.offsetWidth;
//   const x = Math.random() * (width - ASTEROID_SIZE - 40) + 20;

//   // קביעת סוג אובייקט
//   const random = Math.random();
//   let type = "asteroid";

//   if (random < 0.15) type = "bomb";
//   else if (random < 0.25) type = "alien";

//   setAsteroids((prev) => [
//     ...prev,
//     {
//       id: idRef.current++,
//       type,
//       x,
//       y: -ASTEROID_SIZE,
//       speedY: 3 + Math.random() * 2,
//       speedX: (Math.random() - 0.5) * 3,
//       rotate: Math.random() * 360,
//     },
//   ]);
// }, []);
// const [showQuestion, setShowQuestion] = useState(false);
// const [currentQuestion, setCurrentQuestion] = useState(null);
// const QUESTIONS = [
//   {
//     question: "מהו אסטרואיד?",
//     answers: [
//       "כוכב גדול עם אור עצמי",
//       "גוף סלעי קטן המקיף את השמש",
//       "כוכב לכת עם טבעות",
//       "ירח של צדק"
//     ],
//     correct: 1,
//   },
//   {
//     question: "איפה נמצאת חגורת האסטרואידים?",
//     answers: [
//       "בין כדור הארץ למאדים",
//       "בין מאדים לצדק",
//       "מעבר לנפטון",
//       "מסביב לירח"
//     ],
//     correct: 1,
//   },
// ];
// if (distance < ASTEROID_SIZE / 2) {


//  if (distance < ASTEROID_SIZE / 2) {

//   // 💣 פצצה
//   if (a.type === "bomb") {
//     setLives((l) => {
//       const newLives = l - 1;
//       if (newLives <= 0) setGameState("gameOver");
//       return Math.max(0, newLives);
//     });

//     setExplosions((ex) => [
//       ...ex,
//       { id: idRef.current++, x: centerX, y: centerY },
//     ]);

//     return false;
//   }

//   // 👽 חייזר
//   if (a.type === "alien") {
//     const q = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
//     setCurrentQuestion(q);
//     setShowQuestion(true);
//     return false;
//   }

//   // 🪨 אסטרואיד רגיל
//   setExplosions((ex) => [
//     ...ex,
//     { id: idRef.current++, x: centerX, y: centerY },
//   ]);

//   setScore((s) => {
//     const newScore = s + 1;
//     if (newScore >= TARGET_SCORE) setGameState("won");
//     return newScore;
//   });

//   return false;
// }
//    <img
//   src={asteroidSvg}
// <img
//   src={
//     a.type === "bomb"
//       ? bombSvg
//       : a.type === "alien"
//       ? alienSvg
//       : asteroidSvg
//   }
// {showQuestion && currentQuestion && (
//   <div className="ninja-modal-overlay">
//     <div className="ninja-modal">
//       <h2>{currentQuestion.question}</h2>

//       {currentQuestion.answers.map((ans, index) => (
//         <button
//           key={index}
//           className="play-btn"
//           onClick={() => {
//             if (index === currentQuestion.correct) {
//               setShowQuestion(false);
//             } else {
//               setLives((l) => {
//                 const newLives = l - 1;
//                 if (newLives <= 0) setGameState("gameOver");
//                 return Math.max(0, newLives);
//               });
//               setShowQuestion(false);
//             }
//           }}
//         >
//           {ans}
//         </button>
//       ))}
//     </div>
//   </div>
// )}
