import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StartButton from "./Components/StartButton.jsx";
import Toss from "./Components/Toss.jsx";
import GuessGame from "./Components/GuessGame";
import Result from "./Components/Result";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartButton />} />
        <Route path="/toss" element={<Toss />} />
        <Route path="/game" element={<GuessGame />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
}

export default App;
