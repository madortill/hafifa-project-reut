import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./AstroidNinja.css";
import asteroidSvg from "../../assets/images/asteroid.svg";
import play from "../../assets/images/ph_play-bold.svg";
import alienSvg from "../../assets/images/alien.svg";
import bombSvg  from "../../assets/images/bomb.svg";

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
  const [showQuestion, setShowQuestion] = useState(false);
const [currentQuestion, setCurrentQuestion] = useState(null);
const [selectedAnswer, setSelectedAnswer] = useState(null);

    const idRef = useRef(0);

    const QUESTIONS = [
  {
    question: "מי האחראי לחישוב קורדינאטות?",
    answers: [
      "האסטרואידים",
      "תחנת השיגור",
      "אנחנו האסטרונאוטים",
      "אף אחד לא מחשב את הקורדינאטות מנחשים"
    ],
    correct: 1,
  },
  {
    question: "מה ההבדל בין סוגי האס טרואידים?",
    answers: [
      "הגודל שלהם",
      "כל התשובות נכונות",
      "מה שהאסטרואידים מסוגלים להרוס",
      "השם שלהם"
    ],
    correct: 1,
  },
  {
    question: "איזה אסטרואיד יכול להרוס רק שכונות מקומיות?",
    answers: [
      "אסטרואיד נער מתבגר",
      "אסטרואיד בייבי",
      "אסטרואיד בוגר",
      "אף תשובה אינה נכונה "
    ],
    correct: 1,
  },
  {
    question: "מה זה קורדינאטה וובחרו בנק ראשית ",
    answers: [
      " מערכת צירים 6,6 ",
      "מערכת צירים 0,0",
      "וקטור 0,0",
      "מערכת אסטרואידים 8,0"
    ],
    correct: 1,
  },
];
  /* ---------- Spawn ---------- */
const spawnAsteroid = useCallback(() => {
  if (!containerRef.current) return;

  const width = containerRef.current.offsetWidth;
  const x = Math.random() * (width - ASTEROID_SIZE - 40) + 20;

  // קביעת סוג אובייקט
  const random = Math.random();
  let type = "asteroid";

  if (random < 0.15) type = "bomb";
  else if (random < 0.25) type = "alien";

  setAsteroids((prev) => [
    ...prev,
    {
      id: idRef.current++,
      type,
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

        // 💥 פיצוץ
        setExplosions((ex) => [
          ...ex,
          {
            id: idRef.current++,
            x: centerX,
            y: centerY,
          },
        ]);

        // 🪨 אסטרואיד רגיל
        if (a.type === "asteroid") {
          setScore((s) => {
            const newScore = s + 1;
            if (newScore >= TARGET_SCORE) setGameState("won");
            return newScore;
          });
        }

        // 💣 פצצה
        else if (a.type === "bomb") {
          setLives((l) => {
            const newLives = l - 1;
            if (newLives <= 0) setGameState("gameOver");
            return Math.max(0, newLives);
          });
        }

        // 👽 חייזר
      else if (a.type === "alien") {
    const randomQuestion =
    QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];

   setCurrentQuestion(randomQuestion);
   setGameState("paused");
    setShowQuestion(true);
    }

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
          {[...Array(lives)].map((_, i) => (
            <span key={i} className="heart filled">
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
            src={
    a.type === "bomb"
      ? bombSvg
      : a.type === "alien"
      ? alienSvg
      : asteroidSvg}
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
      
     {showQuestion && currentQuestion && (
  <div className="ninja-modal-overlay">
    <div className="ninja-modal">
      <h2>{currentQuestion.question}</h2>

      {currentQuestion?.answers?.map((ans, index) => {
        const isCorrect = index === currentQuestion.correct;
        const isSelected = selectedAnswer === index;

        return (
          <button
            key={index}
            className={`play-btn 
              ${selectedAnswer !== null && isCorrect ? "correct" : ""}
              ${isSelected && !isCorrect ? "wrong" : ""}
            `}
            onClick={() => {
              if (selectedAnswer !== null) return;

              setSelectedAnswer(index);

              if (!isCorrect) {
                setLives((l) => {
                  const newLives = l - 1;
                  if (newLives <= 0) setGameState("gameOver");
                  return Math.max(0, newLives);
                });
              }

              setTimeout(() => {
                setSelectedAnswer(null);
                setShowQuestion(false);
                setGameState("playing");
              }, 1000);
            }}
          >
            {ans}
          </button>
        );
      })}
    </div>
  </div>
)}
    </div>
  );
};

export default AstroidNinja;
