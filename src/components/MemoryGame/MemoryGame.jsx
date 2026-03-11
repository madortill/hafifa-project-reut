import { useState, useEffect } from "react";
import "./MemoryGame.css";
import asteroidImg from "../../assets/images/asteroid.svg";
import earthImg from "../../assets/images/earth.svg";
import heartImg from "../../assets/images/broken-heart.svg";
import neighborhoodImg from "../../assets/images/neighborhood.svg";
import astronautImg from "../../assets/images/astronaut.svg";

import { useNavigate } from "react-router-dom";

const cardsData = [
  {
    id: 1,
    pairId: "baby",
    front: asteroidImg,
    backType: "text",
    backContent: "אסטרואיד בייבי"
  },
  {
    id: 2,
    pairId: "baby",
    front: asteroidImg,
    backType: "image",
    backContent: neighborhoodImg
  },
  {
    id: 3,
    pairId: "teen",
    front: asteroidImg,
    backType: "text",
    backContent: "אסטרואיד נער מתבגר"
  },
  {
    id: 4,
    pairId: "teen",
    front: asteroidImg,
    backType: "image",
    backContent: heartImg
  },
  {
    id: 5,
    pairId: "adult",
    front: asteroidImg,
    backType: "text",
    backContent: "אסטרואיד בוגר"
  },
  {
    id: 6,
    pairId: "adult",
    front: asteroidImg,
    backType: "image",
    backContent: earthImg
  }
];

const MemoryGame = ({ setArrowVisible }) => {
  setArrowVisible(false);

  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [flippedIds, setFlippedIds] = useState([]);
  const [matchedIds, setMatchedIds] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    shuffleCards();
  }, []);

  const shuffleCards = () => {
    const shuffled = [...cardsData].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedIds([]);
    setMatchedIds([]);
    setGameOver(false);
  };

  const handleFlip = (id) => {
    if (
      flippedIds.length === 2 ||
      flippedIds.includes(id) ||
      matchedIds.includes(id)
    ) {
      return;
    }
    setFlippedIds(prev => [...prev, id]);
  };

  useEffect(() => {
    if (flippedIds.length === 2) {
      const [firstId, secondId] = flippedIds;
      const firstCard  = cards.find(c => c.id === firstId);
      const secondCard = cards.find(c => c.id === secondId);

      if (firstCard.pairId === secondCard.pairId) {
        setTimeout(() => {
          setMatchedIds(prev => [...prev, firstId, secondId]);
          setFlippedIds([]);
        }, 500);
      } else {
        setTimeout(() => setFlippedIds([]), 1000);
      }
    }
  }, [flippedIds, cards]);

  useEffect(() => {
    if (matchedIds.length === cardsData.length) {
      setTimeout(() => setGameOver(true), 600);
    }
  }, [matchedIds]);

  return (
    <div className="memory-screen">
      <p className="instructions">
        התאימו בין סוג האסטרואיד לבין מה שהוא הורס
      </p>

      <div className="board">
        {cards.map(card => {
          const isFlipped  = flippedIds.includes(card.id) || matchedIds.includes(card.id);
          const isMatched  = matchedIds.includes(card.id);

          return (
            <div
              key={card.id}
              className={`card ${isFlipped ? "flipped" : ""} ${isMatched ? "matched" : ""}`}
              onClick={() => handleFlip(card.id)}
            >
              <div className="card-inner">
                <div className="card-front">
                  <img className="card-img" src={card.front} alt="asteroid" />
                </div>
                <div className="card-back">
                  {card.backType === "text"
                    ? <span>{card.backContent}</span>
                    : <img className="card-img" src={card.backContent} alt="match" />
                  }
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── WIN POPUP — styled exactly like AstroidNinja win/lose modals ── */}
      {gameOver && (
        <div className="ninja-modal-overlay">
          <div className="ninja-modal">
            {/* corner asteroids, same as win/lose screens */}
            <img src={asteroidImg} alt="asteroid" className="side-astroid" id="astroide3" />
            <img src={asteroidImg} alt="asteroid" className="side-astroid" id="astroide4" />

            <h2>כל הכבוד! <br />עכשיו אתם זוכרים את ההבדל בין סוגי האסטרואידים</h2>

            <div className="modal-two-btns">
              <button className="play-btn" onClick={shuffleCards}>
                שחק שוב
              </button>
              <button className="play-btn play-btn-secondary" onClick={() => navigate("/cordination")}>
                המשך בלומדה
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;