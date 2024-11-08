import { useRef, useEffect, useState } from "react";
import TetrisGame from "../game/TetrisGame";

export const Play = () => {
  const canvasRef = useRef(null);

  // State for score and level
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const tetrisGame = new TetrisGame(canvas);

    const gameLoop = (time) => {
      tetrisGame.update(time);
      tetrisGame.render();

      // Update the score and level from the Tetris game instance
      setScore(tetrisGame.score);
      setLevel(tetrisGame.level);

      requestAnimationFrame(gameLoop);
    };

    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowLeft":
          tetrisGame.moveLeft();
          break;
        case "ArrowRight":
          tetrisGame.moveRight();
          break;
        case "ArrowDown":
          tetrisGame.softDrop();
          break;
        case "ArrowUp":
          tetrisGame.rotatePiece();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex items-start justify-center my-6 space-x-8">
      {/* Game Canvas */}
      <canvas
        ref={canvasRef}
        width="300"
        height="600"
        className="border"
      ></canvas>

      <div className="text-left text-white bg-slate-500 p-10 w-40">
        <h2 className="text-2xl font-bold mb-4">Score: {score}</h2>
        <h3 className="text-xl">Level: {level}</h3>
      </div>
    </div>
  );
};

export default Play;
