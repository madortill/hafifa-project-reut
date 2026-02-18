import React from "react";
import { useState } from "react";
import "./App.css";
import tillLogo from "./assets/images/logoTill.png";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import OpenPage from "./components/openPage/OpenPage.jsx"
import LoadingAnimation from "./components/LoadingAnimation/LoadingAnimation.jsx"
import { Routes, Route } from "react-router-dom";
import LearningPage from "./components/LearningPage/LearningPage.jsx";

const App=()=> {

  return (
    <>
      <div className="app">
      <Routes>
        <Route path="/" element={<LoadingAnimation />} />
        <Route path="/start" element={<OpenPage />} />
        <Route path="/learning" element={<LearningPage />} />
        <Route path="/end" element={<endPage />} />
      </Routes>
    </div>
    </>
  );
}

export default App;
