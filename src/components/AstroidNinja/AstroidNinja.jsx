import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./AstroidNinja.css";
import asteroidSvg from "../../assets/images/asteroid.svg";
import play from "../../assets/images/ph_play-bold.svg";
import alienSvg from "../../assets/images/alien.svg";
import bombSvg  from "../../assets/images/bomb.svg";
import heart  from "../../assets/images/heart.svg";
import Header from "../Header/Header.jsx";
import logoTill from "../../assets/images/logoTill.png";

const TARGET_SCORE  = 15;
const ASTEROID_SIZE = 70;
const MAX_LIVES     = 3;

// ~5% bombs, ~10% aliens, rest asteroids
const BOMB_CHANCE  = 0.05;
const ALIEN_CHANCE = 0.10;

const AstroidNinja = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const [asteroids, setAsteroids]             = useState([]);
  const [explosions, setExplosions]           = useState([]);
  const [slashPoints, setSlashPoints]         = useState([]);
  const [score, setScore]                     = useState(0);
  const [lives, setLives]                     = useState(3);
  const [gameState, setGameState]             = useState("start");
  const [isSlicing, setIsSlicing]             = useState(false);
  const [showQuestion, setShowQuestion]       = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer]   = useState(null);

  const idRef        = useRef(0);
  const missedIdsRef = useRef(new Set());

  const QUESTIONS = [
    {
      question: "מי האחראי לחישוב קורדינאטות?",
      answers: [
        "האסטרואידים",
        "תחנת השיגור",
        "אנחנו האסטרונאוטים",
        "אף אחד לא מחשב את הקורדינאטות מנחשים",
      ],
      correct: 1,
    },
    {
      question: "מה ההבדל בין סוגי האסטרואידים?",
      answers: [
        "הגודל שלהם",
        "כל התשובות נכונות",
        "מה שהאסטרואידים מסוגלים להרוס",
        "השם שלהם",
      ],
      correct: 1,
    },
    {
      question: "איזה אסטרואיד יכול להרוס רק שכונות מקומיות?",
      answers: [
        "אסטרואיד נער מתבגר",
        "אסטרואיד בייבי",
        "אסטרואיד בוגר",
        "אף תשובה אינה נכונה",
      ],
      correct: 1,
    },
    {
      question: "מה זה קורדינאטה וובחרו בנק ראשית",
      answers: [
        "מערכת צירים 6,6",
        "מערכת צירים 0,0",
        "וקטור 0,0",
        "מערכת אסטרואידים 8,0",
      ],
      correct: 1,
    },
  ];

  /* ---------- Spawn ---------- */
  const spawnAsteroid = useCallback(() => {
    if (!containerRef.current) return;
    const width = containerRef.current.offsetWidth;
    const x     = Math.random() * (width - ASTEROID_SIZE - 40) + 20;

    const rand = Math.random();
    let type   = "asteroid";
    if      (rand < BOMB_CHANCE)                type = "bomb";
    else if (rand < BOMB_CHANCE + ALIEN_CHANCE) type = "alien";

    setAsteroids((prev) => [
      ...prev,
      {
        id:     idRef.current++,
        type,
        x,
        y:      -ASTEROID_SIZE,
        speedY: 1.5 + Math.random() * 1.0,
        speedX: (Math.random() - 0.5) * 1.5,
        rotate: Math.random() * 360,
      },
    ]);
  }, []);

  /* ---------- Tick ---------- */
  const tick = useCallback(() => {
    if (!containerRef.current) return;
    const height = containerRef.current.offsetHeight;

    setAsteroids((prev) => {
      let asteroidsMissed = 0;

      const updated = prev
        .map((a) => {
          const newX = a.x + a.speedX;
          const newY = a.y + a.speedY;

          if (newY > height) {
            // Only asteroids cost a life when missed — bombs & aliens pass freely
            if (a.type === "asteroid" && !missedIdsRef.current.has(a.id)) {
              missedIdsRef.current.add(a.id);
              asteroidsMissed++;
            }
            return null;
          }
          return { ...a, x: newX, y: newY };
        })
        .filter(Boolean);

      if (asteroidsMissed > 0) {
        setLives((l) => {
          const newLives = l - asteroidsMissed;
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
      missedIdsRef.current = new Set();
      spawnInt = setInterval(spawnAsteroid, 1000);
      tickInt  = setInterval(tick, 16);
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
        const centerX  = a.x + ASTEROID_SIZE / 2;
        const centerY  = a.y + ASTEROID_SIZE / 2;
        const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);

        if (distance < ASTEROID_SIZE / 2) {
          setExplosions((ex) => [...ex, { id: idRef.current++, x: centerX, y: centerY }]);

          if (a.type === "asteroid") {
            setScore((s) => {
              const newScore = s + 1;
              if (newScore >= TARGET_SCORE) setGameState("won");
              return newScore;
            });

          } else if (a.type === "bomb") {
            // Slicing a bomb → lose 1 life
            setLives((l) => {
              const newLives = l - 1;
              if (newLives <= 0) setGameState("gameOver");
              return Math.max(0, newLives);
            });

          } else if (a.type === "alien") {
            // Pause and show question
            const q = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
            setCurrentQuestion(q);
            setGameState("paused");
            setShowQuestion(true);
          }

          return false;
        }
        return true;
      })
    );
  };

  /* ---------- Answer handler ---------- */
  const handleAnswer = (index) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);

    const isCorrect = index === currentQuestion.correct;

    if (isCorrect) {
      // Correct → +1 life (max 3) AND +1 score point
      setLives((l) => Math.min(l + 1, MAX_LIVES));
      setScore((s) => {
        const newScore = s + 1;
        if (newScore >= TARGET_SCORE) setGameState("won");
        return newScore;
      });
    }
    // Wrong → no extra penalty, just resume

    setTimeout(() => {
      setSelectedAnswer(null);
      setShowQuestion(false);
      setGameState("playing");
    }, 1000);
  };

  /* ---------- Pointer / touch ---------- */
  const handlePointerMove = (e) => {
    if (!isSlicing || gameState !== "playing") return;
    const rect    = containerRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    setSlashPoints((prev) => [...prev.slice(-12), { x, y }]);
    checkCollision(x, y);
  };

  useEffect(() => {
    if (!explosions.length) return;
    const t = setTimeout(() => setExplosions([]), 250);
    return () => clearTimeout(t);
  }, [explosions]);

  const startGame = () => {
    setScore(0);
    setLives(3);
    setAsteroids([]);
    setExplosions([]);
    missedIdsRef.current = new Set();
    setGameState("playing");
  };

  const progressPercent = Math.min((score / TARGET_SCORE) * 100, 100);

  return (
    <>
      <img src={logoTill} className="till-logo" alt="logo" />
      <Header chapterName="משחק פיצוץ אסטרואיד" />

      <div
        className="ninja-container"
        ref={containerRef}
        onPointerDown={() => { setIsSlicing(true);  setSlashPoints([]); }}
        onPointerUp={()   => { setIsSlicing(false); setSlashPoints([]); }}
        onPointerLeave={() => { setIsSlicing(false); setSlashPoints([]); }}
        onPointerMove={handlePointerMove}
        onTouchMove={(e)  => { e.preventDefault(); handlePointerMove(e); }}
      >
        {/* HUD */}
        <div className="ninja-header">
          <div className="hearts-row">
            {[...Array(lives)].map((_, i) => (
              <span key={i} className="heart filled">
                <img src={heart} alt="heart" />
              </span>
            ))}
          </div>
          <div className="score-display">ניקוד: {score}</div>
        </div>

        {/* Progress bar — fills upward toward TARGET_SCORE */}
        <div className="progress-sidebar">
          <div className="progress-bar-bg">
            <div className="progress-fill" style={{ height: `${progressPercent}%` }} />
          </div>
          <span className="progress-text">{Math.round(progressPercent)}%</span>
        </div>

        {/* Slash trail */}
        <svg className="slash-svg">
          <polyline points={slashPoints.map((p) => `${p.x},${p.y}`).join(" ")} />
        </svg>

        {/* Falling objects */}
        {asteroids.map((a) => (
          <div
            key={a.id}
            className="ninja-asteroid-obj"
            style={{
              left:      a.x,
              top:       a.y,
              width:     ASTEROID_SIZE,
              height:    ASTEROID_SIZE,
              transform: `rotate(${a.rotate}deg)`,
            }}
          >
            <img
              src={
                a.type === "bomb"  ? bombSvg  :
                a.type === "alien" ? alienSvg :
                asteroidSvg
              }
              alt={a.type}
              className="ninja-asteroid-img"
            />
          </div>
        ))}

        {/* Explosions */}
        {explosions.map((ex) => (
          <div key={ex.id} className="explosion-effect" style={{ left: ex.x, top: ex.y }}>
            💥
          </div>
        ))}

        {/* ── START ── */}
        {gameState === "start" && (
          <div className="ninja-modal-overlay">
            <div className="ninja-modal">
              <h2>
                תתכוננו לפיצוץ אסטרואידים!<br />
                החליקו כדי לפוצץ אסטרואידים 🪨<br />
                היזהרו מפצצות 💣 — הן יורידו לכם חיים<br />
                חייזר 👽 יופיע עם שאלה — ענו נכון להרוויח חיים ונקודות!
              </h2>
              <div className="modal-icons-row">
                <img className="modal-icon" src={asteroidSvg} alt="asteroid" />
                <img className="modal-icon" src={alienSvg}    alt="alien" />
                <img className="modal-icon" src={bombSvg}     alt="bomb" />
              </div>
              <img className="play-btn-img" onClick={startGame} src={play} alt="play" />
            </div>
          </div>
        )}

        {/* ── GAME OVER ── */}
        {gameState === "gameOver" && (
          <div className="ninja-modal-overlay">
            <div className="ninja-modal">
              <img src={asteroidSvg} alt="asteroid" className="side-astroid" id="astroide1" />
              <img src={asteroidSvg} alt="asteroid" className="side-astroid" id="astroide2" />
              <h2>נראה שנגמרו לך החיים...<br />לא נורא, תרגול מוביל לשלמות!</h2>
              <button className="play-btn" onClick={startGame}>נסי שוב</button>
            </div>
          </div>
        )}

        {/* ── WON ── */}
        {gameState === "won" && (
          <div className="ninja-modal-overlay">
            <div className="ninja-modal">
              <img src={asteroidSvg} alt="asteroid" className="side-astroid" id="astroide3" />
              <img src={asteroidSvg} alt="asteroid" className="side-astroid" id="astroide4" />
              <h2>כל הכבוד!<br />פוצצת את כל האסטרואידים ונהפכת לאסטרונאוט לתפארת!</h2>
              <button className="play-btn" onClick={() => navigate("/end")}>המשך</button>
            </div>
          </div>
        )}

        {/* ── QUESTION ── */}
        {showQuestion && currentQuestion && (
          <div className="ninja-modal-overlay">
            <div className="ninja-modal">
              <h2>{currentQuestion.question}</h2>
              {currentQuestion.answers.map((ans, index) => {
                const isCorrect  = index === currentQuestion.correct;
                const isSelected = selectedAnswer === index;
                return (
                  <button
                    key={index}
                    className={[
                      "answer-btn",
                      selectedAnswer !== null && isCorrect ? "correct" : "",
                      isSelected && !isCorrect             ? "wrong"   : "",
                    ].join(" ").trim()}
                    onClick={() => handleAnswer(index)}
                  >
                    {ans}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AstroidNinja;