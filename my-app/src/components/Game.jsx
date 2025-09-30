import { useEffect, useState } from "react";
import "../Game.css"; 

import Hole from "../assets/Hole.jpeg";
import mole from "../assets/mole.png";

function Game() {
  // states
  const [moles, setMoles] = useState(new Array(9).fill(false));

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

  // game grid
  return (
    <div className="game-container">
      <div className="grid">
        {moles.map((isMole, index) => (
          <img
            key={index}
            src={isMole ? mole : Hole}
            alt={isMole ? "Mole" : "Hole"}
            className="grid-cell"
          />
        ))}
      </div>
    </div>
  );
}

export default Game;
