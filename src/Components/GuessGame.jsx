import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import clickSound from "../assets/buttonsound.wav";
import "../styles/GuessGame.css";

const GuessGame = () => {
  const playClickSound = () => {
    new Audio(clickSound).play();
  };

  const location = useLocation();
  const navigate = useNavigate();
  const userGuessesFirst = location.state?.userGuessesFirst;

  const [userScore, setUserScore] = useState(0);
  const [machineScore, setMachineScore] = useState(0);
  const [userGuess, setUserGuess] = useState("");
  const [machineCode, setMachineCode] = useState(null);
  const [inning, setInning] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [showMachineGuess, setShowMachineGuess] = useState(false);

  const handleUserInput = () => {
    playClickSound();

    const guess = parseInt(userGuess);
    if (isNaN(guess) || guess < 1 || guess > 6) {
      setStatusMessage("Please enter a number between 1 and 6.");
      return;
    }

    const machine = Math.floor(Math.random() * 6) + 1;

    if (inning === 1) {
      setMachineCode(machine);

      if (userGuessesFirst) {
        if (guess === machine) {
          setStatusMessage(
            `You're out! First innings over. Your score: ${userScore}`
          );
          setTimeout(() => {
            setInning(2);
            setStatusMessage("Now it's your turn to bowl!");
            setMachineCode(null); // clear last machine guess
          }, 2000);
        } else {
          setUserScore((prev) => prev + guess);
        }
      } else {
        if (guess === machine) {
          setStatusMessage(
            `Opponent is out! First innings over. Opponent score: ${machineScore}`
          );
          setTimeout(() => {
            setInning(2);
            setStatusMessage("Now it's your turn to bat!");
            setMachineCode(null); // clear last machine guess
          }, 2000);
        } else {
          setMachineScore((prev) => prev + machine);
        }
      }
    } else {
      if (!showMachineGuess) setShowMachineGuess(true); // Show only after first guess in second innings

      setMachineCode(machine);

      if (userGuessesFirst) {
        if (guess === machine) {
          setStatusMessage("Opponent is out!");
          endGame(userScore > machineScore ? "User" : "Opponent");
        } else {
          const newScore = machineScore + machine;
          setMachineScore(newScore);
          if (newScore > userScore) {
            setStatusMessage("Opponent has surpassed your score!");
            endGame("Opponent");
          }
        }
      } else {
        if (guess === machine) {
          setStatusMessage("You're out!");
          endGame(userScore > machineScore ? "User" : "Opponent");
        } else {
          const newScore = userScore + guess;
          setUserScore(newScore);
          if (newScore > machineScore) {
            setStatusMessage("You have surpassed the Opponent's score!");
            endGame("User");
          }
        }
      }
    }

    setUserGuess(""); // Clear input
  };

  const endGame = (winner) => {
    setIsGameOver(true);
    setTimeout(() => {
      navigate("/result", {
        state: {
          userScore,
          machineScore,
          winner,
        },
      });
    }, 2000);
  };

  return (
    <div className="game-container">
      {/* First Innings Panel */}
      <div className={`inning-panel ${inning === 1 ? "active" : ""}`}>
        <h2>First Inning</h2>
        <p>{userGuessesFirst ? "You are batting" : "Opponent is batting"}</p>
        <h3>User Score: {userScore}</h3>
        <h3>Opponent Score: {machineScore}</h3>

        {inning === 1 && !isGameOver && (
          <>
            <p className="status-message">{statusMessage}</p>
            <h3>Choose a number between 1 and 6</h3>
            <input
              type="number"
              value={userGuess}
              onChange={(e) => setUserGuess(e.target.value)}
              min="1"
              max="6"
              placeholder="Enter your guess"
            />
            <button onClick={handleUserInput}>Guess</button>
            {/* Opponent guess only during active innings */}
            {machineCode !== null && <p>Opponent chose: {machineCode}</p>}
          </>
        )}
      </div>

      {/* Second Innings Panel */}
      <div className={`inning-panel ${inning === 2 ? "active" : ""}`}>
        <h2>Second Inning</h2>
        <p>{userGuessesFirst ? "Opponent is batting" : "You are batting"}</p>
        <h3>User Score: {userScore}</h3>
        <h3>Opponent Score: {machineScore}</h3>

        {inning === 2 && !isGameOver && (
          <>
            <p className="status-message">{statusMessage}</p>
            <h3>Choose a number between 1 and 6</h3>
            <input
              type="number"
              value={userGuess}
              onChange={(e) => setUserGuess(e.target.value)}
              min="1"
              max="6"
              placeholder="Enter your guess"
            />
            <button onClick={handleUserInput}>Guess</button>
            {showMachineGuess && machineCode !== null && (
              <p>Opponent chose: {machineCode}</p>
            )}
          </>
        )}

        {isGameOver && <h3 className="status-message">Game Over!</h3>}
      </div>
    </div>
  );
};

export default GuessGame;
