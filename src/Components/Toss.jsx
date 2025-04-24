import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import headsImg from "../assets/heads.png";
import tailsImg from "../assets/tails.png";
import clickSound from "../assets/buttonsound.wav";
import "../styles/Toss.css";

const Toss = () => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [coinFace, setCoinFace] = useState(null);
  const [tossResult, setTossResult] = useState(null); // 'win' or 'lose'
  const navigate = useNavigate();

  const playClickSound = () => {
    new Audio(clickSound).play();
  };

  const handleChoice = (choice) => {
    if (isFlipping) return;

    playClickSound();
    const userToss = choice === "Heads" ? 0 : 1;
    const machineToss = Math.floor(Math.random() * 2);
    const resultFace = machineToss === 0 ? "heads" : "tails";

    setIsFlipping(true);
    setCoinFace(null);
    setTossResult(null);

    setTimeout(() => {
      setCoinFace(resultFace);
      setIsFlipping(false);

      if (userToss === machineToss) {
        setTossResult("win");
      } else {
        setTossResult("lose");

        // Navigate after showing result briefly
        setTimeout(() => {
          navigate("/game", { state: { userGuessesFirst: true } }); // user bats first
        }, 3000);
      }
    }, 2000);
  };

  const handleUserDecision = (userGuessesFirst) => {
    navigate("/game", { state: { userGuessesFirst } });
  };

  return (
    <div className="toss-container">
      <h1 className="toss-title">T O S S</h1>

      <div className="coin">
        <img
          src={coinFace === "tails" ? tailsImg : headsImg}
          alt="coin"
          className={`coin-image ${isFlipping ? "flipping" : ""}`}
        />
      </div>

      <div className="buttons">
        <button className="choice-button" onClick={() => handleChoice("Heads")}>
          Heads
        </button>
        <button className="choice-button" onClick={() => handleChoice("Tails")}>
          Tails
        </button>
      </div>

      {coinFace && !isFlipping && (
        <div className="result-text">
          <p>Result: {coinFace.toUpperCase()}</p>
        </div>
      )}

      {tossResult === "win" && (
        <div className="result">
          <h3>You won the toss!</h3>
          <div className="decision-buttons">
            <button
              className="decision-button"
              onClick={() => handleUserDecision(true)}
            >
              I will bat first
            </button>
            <button
              className="decision-button"
              onClick={() => handleUserDecision(false)}
            >
              I will bowl first
            </button>
          </div>
        </div>
      )}

      {tossResult === "lose" && (
        <div className="result">
          <h3>You lost the toss!</h3>
          <p>Machine chose to bowl. You will bat first.</p>
        </div>
      )}
    </div>
  );
};

export default Toss;
