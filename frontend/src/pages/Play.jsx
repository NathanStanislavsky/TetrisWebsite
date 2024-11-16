import { useRef, useEffect, useState } from "react";
import TetrisGame from "../game/TetrisGame";

export const Play = () => {
  const canvasRef = useRef(null);
  const storedPieceCanvasRef = useRef(null);
  const nextPieceCanvasRef = useRef(null);

  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);

  const tetrisGameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const storedPieceCanvas = storedPieceCanvasRef.current;
    const nextPieceCanvas = nextPieceCanvasRef.current;

    tetrisGameRef.current = new TetrisGame(
      canvas,
      storedPieceCanvas,
      nextPieceCanvas
    );
    const tetrisGame = tetrisGameRef.current;

    let animationFrameId;

    const gameLoop = (time) => {
      tetrisGame.updateGameState(time);

      setScore(tetrisGame.score);
      setLevel(tetrisGame.level);
      setGameOver(tetrisGame.gameOver);

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    const keyActions = {
      ArrowLeft: () => tetrisGame.moveLeft(),
      ArrowRight: () => tetrisGame.moveRight(),
      ArrowDown: () => tetrisGame.softDrop(),
      ArrowUp: () => tetrisGame.rotatePiece(),
      Shift: () => tetrisGame.storePiece(),
      " ": () => tetrisGame.hardDrop(),
    };

    const handleKeyDown = (event) => {
      if (keyActions[event.key]) {
        keyActions[event.key]();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    animationFrameId = requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const restartGame = () => {
    if (tetrisGameRef.current) {
      tetrisGameRef.current.resetGameState();
      setGameOver(false);
      setScore(0);
      setLevel(1);
    }
  };

  return (
    <div className="relative flex justify-center mt-6">
      <div className="flex flex-row space-x-8 items-start">
        {/* Game Canvas */}
        <canvas
          ref={canvasRef}
          width="300"
          height="600"
          className="border"
        ></canvas>

        {/* Info Panel */}
        <div className="text-left text-white bg-slate-500 p-10 w-40">
          <h2 className="text-2xl font-bold mb-4">Score: {score}</h2>
          <h3 className="text-xl mb-4">Level: {level}</h3>
          <h4 className="text-lg font-semibold">Stored Piece</h4>
          <canvas ref={storedPieceCanvasRef} width="80" height="80"></canvas>
          <h4 className="text-lg font-semibold mt-4">Next Piece</h4>
          <canvas ref={nextPieceCanvasRef} width="80" height="80"></canvas>
        </div>
      </div>

      {/* Full-Screen Game Over Overlay */}
      {gameOver && (
        <div className="fixed top-32 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-75 text-white z-50">
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