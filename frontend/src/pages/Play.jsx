import { useRef, useEffect, useState } from "react";
import TetrisGame from "../game/TetrisGame";

export const Play = () => {
  const canvasRef = useRef(null);
  const storedPieceCanvasRef = useRef(null);
  const nextPieceCanvasRef = useRef(null);

  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(0);
  const [gameOver, setGameOver] = useState(false); // State to track game over

  useEffect(() => {
    const canvas = canvasRef.current;
    const storedPieceCanvas = storedPieceCanvasRef.current;
    const nextPieceCanvas = nextPieceCanvasRef.current;
    const tetrisGame = new TetrisGame(
      canvas,
      storedPieceCanvas,
      nextPieceCanvas
    );

    const gameLoop = (time) => {
      if (tetrisGame.endGame) {
        setGameOver(true); // Set game over state
        return; // Stop the game loop
      }

      tetrisGame.update(time);
      tetrisGame.render();

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
        case "Shift":
          tetrisGame.storePiece();
          break;
        case " ":
          tetrisGame.hardDrop();
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
  }, [gameOver]); // Add gameOver as a dependency to restart or stop the game

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
        <h3 className="text-xl mb-4">Level: {level}</h3>
        <h4 className="text-lg font-semibold">Stored Piece</h4>
        <canvas ref={storedPieceCanvasRef} width="80" height="80"></canvas>
        <h4 className="text-lg font-semibold">Next Piece</h4>
        <canvas ref={nextPieceCanvasRef} width="80" height="80"></canvas>
        {gameOver && (
          <div className="text-red-500 mt-4 text-center">
            <h2 className="text-2xl font-bold">Game Over</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Play;
