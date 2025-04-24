import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

import finalSound from "../assets/final.mp3"; // 🎵 Import your sound
import "../styles/Result.css";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userScore, machineScore, winner } = location.state || {};
  const { width, height } = useWindowSize();

  const isUserWinner = winner?.toLowerCase() === "user";
  const displayWinner = winner === "Machine" ? "Opponent" : winner;

  useEffect(() => {
    if (isUserWinner) {
      const audio = new Audio(finalSound);
      audio.play();
    }
  }, [isUserWinner]);

  const handleReplay = () => {
    navigate("/");
  };

  return (
    <div className="result-container">
      {isUserWinner && <Confetti width={width} height={height} />}

      <h1 className="game-over-title">Game Over!</h1>
      <h2 className="result-heading">Results</h2>

      <div className="score-section">
        <h3>User Score: {userScore}</h3>
        <h3>Opponent Score: {machineScore}</h3>
      </div>

      <h2 className="winner-text">{displayWinner} Wins!</h2>

      {isUserWinner && (
        <div className="congrats-message">🎉 Congratulations, You Won! 🎉</div>
      )}

      <button onClick={handleReplay} className="replay-button">
        Replay
      </button>
    </div>
  );
};

export default Result;
