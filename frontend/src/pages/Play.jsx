import { useRef, useEffect, useState } from "react";
import TetrisGame from "../game/TetrisGame";

export const Play = () => {
  const canvasRef = useRef(null);
  const storedPieceCanvasRef = useRef(null);
  const nextPieceCanvasRef = useRef(null);

  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const tetrisGameRef = useRef(null);

  const initializeGame = () => {
    const canvas = canvasRef.current;
    const storedPieceCanvas = storedPieceCanvasRef.current;
    const nextPieceCanvas = nextPieceCanvasRef.current;
    const tetrisGame = new TetrisGame(canvas, storedPieceCanvas, nextPieceCanvas);
    tetrisGameRef.current = tetrisGame;

    const gameLoop = (time) => {
      if (tetrisGame.endGame) {
        setGameOver(true);
        return;
      }

      tetrisGame.update(time);
      tetrisGame.render();

      setScore(tetrisGame.score);
      setLevel(tetrisGame.level);

      requestAnimationFrame(gameLoop);
    };

    requestAnimationFrame(gameLoop);
  };

  useEffect(() => {
    initializeGame();

    const handleKeyDown = (event) => {
      if (gameOver) return;

      const tetrisGame = tetrisGameRef.current;
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

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameOver]);

  const restartGame = () => {
    setGameOver(false);
    setScore(0);
    setLevel(0);
    initializeGame();
  };

  return (
    <div className="flex items-start justify-center my-6 space-x-8 relative">
      {/* Game Canvas */}
      <canvas ref={canvasRef} width="300" height="600" className="border"></canvas>

      <div className="text-left text-white bg-slate-500 p-10 w-40">
        <h2 className="text-2xl font-bold mb-4">Score: {score}</h2>
        <h3 className="text-xl mb-4">Level: {level}</h3>
        <h4 className="text-lg font-semibold">Stored Piece</h4>
        <canvas ref={storedPieceCanvasRef} width="80" height="80"></canvas>
        <h4 className="text-lg font-semibold">Next Piece</h4>
        <canvas ref={nextPieceCanvasRef} width="80" height="80"></canvas>
      </div>

      {/* Full-Screen End Game Overlay */}
      {gameOver && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 text-white z-50">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-8">Game Over</h2>
            <button
              onClick={restartGame}
              className="bg-red-500 text-white px-6 py-3 rounded text-2xl hover:bg-red-700"
            >
              Restart Game
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Play;