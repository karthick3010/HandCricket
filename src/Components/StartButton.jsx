import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import clickSound from "../assets/buttonsound.wav";

import "../styles/StartButton.css"; // Import the CSS file

const StartButton = () => {
  const navigate = useNavigate();
  const [showInstructions, setShowInstructions] = useState(false);

  const playClickSound = () => {
    new Audio(clickSound).play();
  };

  const handleStart = () => {
    playClickSound();
    navigate("/toss");
  };
  const toggleInstructions = () => {
    playClickSound();
    setShowInstructions(!showInstructions);
  };

  return (
    <div className="start-container">
      <div className="title-section">
        <h1 className="game-title">Hand Cricket :)</h1>
        <button className="how-to-play-button" onClick={toggleInstructions}>
          How to Play
        </button>
      </div>

      {showInstructions && (
        <div className="instructions-box">
          <ul>
            <li>Choose heads or tails for the toss.</li>
            <li>The winner of the toss chooses to bat or bowl first.</li>
            <li>During each turn, enter a number between 1 and 3.</li>
            <li>The opponent also picks a number randomly between 1 and 3.</li>
            <li>If both numbers match, the current player is declared out.</li>
            <li>
              If the numbers don't match, the entered number is added to the
              player's score.
            </li>
            <li>Once out, the opponent gets their turn to play.</li>
            <li>The player with the higher score at the end wins the game!</li>
            <li>In case of a tie, it's a draw!</li>
          </ul>
        </div>
      )}
      <button className="start-button" onClick={handleStart}>
        Start Game
      </button>
    </div>
  );
};

export default StartButton;
