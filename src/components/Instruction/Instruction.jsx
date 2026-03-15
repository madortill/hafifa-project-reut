import React from 'react';
import './Instruction.css';
import astroide from "../../assets/images/asteroid.svg"; 
import earth from "../../assets/images/earth.svg";
import Header from '../Header/Header';
import { Navigate, useNavigate } from "react-router-dom";

const Instruction = () => {
    const navigate = useNavigate();

  return (
    <>
    <div className="game-wrapper">
      <div className="text-content">
        <h2 className="main-heading">איזה כיף הגענו למשחק!</h2>
        <div className="instructions-list">
          <p className="underlined-text">זה הזמן לתרגל את החומר של</p>
          <p className="underlined-text font-bold">סוגי אסטרואידים</p>
          <p className="underlined-text">אז בואו נבדוק שאנחנו זוכרים...</p>
          <p className="underlined-text light-blue">התאימו בין סוג האסטרואיד לבין</p>
          <p className="underlined-text light-blue">מה שהוא הורס</p>
        </div>

        <h3 className="example-heading">לדוגמא:</h3>
      </div>

      <div className="example-cards-container">
        <div className="card text-card">
          אסטרואיד <br /> בוגר
        </div>

        <div className="operator">{"<=>"}</div>

        <div className="card image-card">
          <img src={earth} alt="Earth" className="card-img" />
        </div>
      </div>

      {/* <button className="play-button">
        למשחק
      </button> */}

      {/* <div className="bounce-arrow" onClick={() => navigate("/memory-game")}>
        <svg className="arrow-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
        </svg>
      </div> */}
    </div>
    </>
  );
};

export default Instruction;