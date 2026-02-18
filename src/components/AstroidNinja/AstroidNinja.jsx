import React, { useEffect, useRef, useState, useCallback } from 'react';
import './AsteroidNinja.css';

const ASTEROID_COLORS = ['#c0392b', '#8b6914', '#5d4e75', '#1a5276'];
const ASTEROID_SIZES = [32, 42, 52];

let idCounter = 0;

const AsteroidNinja = ({ onFinish }) => {
  const [asteroids, setAsteroids] = useState([]);
  const [explosions, setExplosions] = useState([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const containerRef = useRef(null);
  const spawnInterval = useRef(null);
  const tickInterval = useRef(null);

  const TARGET_SCORE = 10;

  const spawnAsteroid = useCallback(() => {
    const containerWidth = containerRef.current?.offsetWidth || 300;
    const size = ASTEROID_SIZES[Math.floor(Math.random() * ASTEROID_SIZES.length)];
    const x = Math.random() * (containerWidth - size);
    const speedY = 1.2 + Math.random() * 1.5;
    const drift = (Math.random() - 0.5) * 0.8;
    const color = ASTEROID_COLORS[Math.floor(Math.random() * ASTEROID_COLORS.length)];
    const rotate = Math.random() * 360;
    const rotateSpeed = (Math.random() - 0.5) * 3;

    setAsteroids(prev => [...prev, {
      id: ++idCounter,
      x,
      y: -size,
      size,
      speedY,
      drift,
      color,
      rotate,
      rotateSpeed,
    }]);
  }, []);

  const tick = useCallback(() => {
    const containerHeight = containerRef.current?.offsetHeight || 600;

    setAsteroids(prev => {
      const surviving = [];
      let missed = 0;

      prev.forEach(a => {
        const newY = a.y + a.speedY * 4;
        const newX = a.x + a.drift;
        if (newY > containerHeight + 10) {
          missed++;
        } else {
          surviving.push({ ...a, y: newY, x: newX, rotate: a.rotate + a.rotateSpeed });
        }
      });

      if (missed > 0) {
        setLives(l => {
          const newLives = l - missed;
          if (newLives <= 0) setGameOver(true);
          return Math.max(0, newLives);
        });
      }

      return surviving;
    });
  }, []);

  const startGame = () => {
    setStarted(true);
    setScore(0);
    setLives(3);
    setGameOver(false);
    setAsteroids([]);
    setExplosions([]);

    spawnInterval.current = setInterval(spawnAsteroid, 900);
    tickInterval.current = setInterval(tick, 16);
  };

  useEffect(() => {
    return () => {
      clearInterval(spawnInterval.current);
      clearInterval(tickInterval.current);
    };
  }, []);

  useEffect(() => {
    if (gameOver || score >= TARGET_SCORE) {
      clearInterval(spawnInterval.current);
      clearInterval(tickInterval.current);
    }
  }, [gameOver, score]);

  // Keep tick updated
  useEffect(() => {
    if (!started || gameOver || score >= TARGET_SCORE) return;
    clearInterval(tickInterval.current);
    tickInterval.current = setInterval(tick, 16);
    return () => clearInterval(tickInterval.current);
  }, [tick, started, gameOver, score]);

  const hitAsteroid = (id, e) => {
    e.stopPropagation();
    const asteroid = asteroids.find(a => a.id === id);
    if (!asteroid) return;

    // Add explosion
    setExplosions(prev => [...prev, {
      id: Date.now(),
      x: asteroid.x + asteroid.size / 2,
      y: asteroid.y + asteroid.size / 2,
    }]);
    setTimeout(() => {
      setExplosions(prev => prev.filter(ex => ex.id !== Date.now()));
    }, 600);

    setAsteroids(prev => prev.filter(a => a.id !== id));
    setScore(s => s + 1);
  };

  const won = score >= TARGET_SCORE;

  return (
    <div className="ninja-wrap" ref={containerRef}>
      {!started && !gameOver && (
        <div className="ninja-overlay">
          <div className="ninja-emoji">☄️</div>
          <h3 className="ninja-title">אסטרואיד נינג'ה</h3>
          <p className="ninja-desc">לחץ על האסטרואידים לפני שהם מגיעים לתחתית!<br/>פוצץ {TARGET_SCORE} אסטרואידים לניצחון</p>
          <button className="continue-btn" onClick={startGame}>התחל משחק</button>
        </div>
      )}

      {started && !gameOver && !won && (
        <>
          <div className="ninja-hud">
            <div className="hud-score">⭐ {score}/{TARGET_SCORE}</div>
            <div className="hud-lives">
              {Array.from({ length: 3 }).map((_, i) => (
                <span key={i} className={`life ${i < lives ? 'alive' : 'dead'}`}>♥</span>
              ))}
            </div>
          </div>

          <div className="ninja-field">
            {asteroids.map(a => (
              <button
                key={a.id}
                className="ninja-asteroid"
                style={{
                  left: a.x,
                  top: a.y,
                  width: a.size,
                  height: a.size,
                  background: a.color,
                  transform: `rotate(${a.rotate}deg)`,
                  boxShadow: `0 0 16px ${a.color}88`,
                }}
                onPointerDown={(e) => hitAsteroid(a.id, e)}
              />
            ))}

            {explosions.map(ex => (
              <div
                key={ex.id}
                className="explosion"
                style={{ left: ex.x, top: ex.y }}
              >
                💥
              </div>
            ))}
          </div>
        </>
      )}

      {(gameOver || won) && (
        <div className="ninja-overlay">
          <div className="ninja-emoji">{won ? '🏆' : '💀'}</div>
          <h3 className="ninja-title">{won ? 'מדהים!' : 'נסה שוב!'}</h3>
          <p className="ninja-desc">פוצצת {score} אסטרואידים</p>
          <div className="ninja-btns">
            <button className="retry-btn" onClick={startGame}>שחק שוב</button>
            {won && (
              <button className="continue-btn" onClick={onFinish}>המשך →</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AsteroidNinja;