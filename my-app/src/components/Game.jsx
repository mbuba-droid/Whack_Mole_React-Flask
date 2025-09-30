import { useEffect, useState } from "react";
import "../Game.css"; 

import Hole from "../assets/Hole.jpeg";
import mole from "../assets/mole.png";

function Game() {
  // states
  const [moles, setMoles] = useState(new Array(9).fill(false));
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem("highScore");
    return saved ? parseInt(saved, 10) : 0;
  });

  // mole appearance 
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * moles.length);
      const newMoles = new Array(9).fill(false);
      newMoles[randomIndex] = true;
      setMoles(newMoles);
    }, 1000); // new mole every second

    return () => clearInterval(interval);
  }, [moles.length]);

  // handle click
  const handleMoleClick = (index) => {
    if (moles[index]) {
      const newScore = score + 1;
      setScore(newScore);

      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem("highScore", newScore);
      }

      const newMoles = [...moles];
      newMoles[index] = false;
      setMoles(newMoles);
    }
  };

  // game grid + scoreboard
  return (
    <div className="game-container">
      {/* scoreboard */}
      <div className="scoreboard" style={{ marginBottom: "20px" }}>
        <span style={{ marginRight: "20px" }}>🏆 Score: {score}</span>
        <span>🥇 High Score: {highScore}</span>
      </div>

      {/* grid */}
      <div className="grid">
        {moles.map((isMole, index) => (
          <img
            key={index}
            src={isMole ? mole : Hole}
            alt={isMole ? "Mole" : "Hole"}
            className="grid-cell"
            onClick={() => handleMoleClick(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Game;
