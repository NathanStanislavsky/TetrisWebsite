import { useRef, useEffect, useState } from "react";
import TetrisGame from "../game/TetrisGame";

export const Play = () => {
  const canvasRef = useRef(null);
  const storedPieceCanvasRef = useRef(null);
  const nextPieceCanvasRef = useRef(null);

  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [gamePaused, setGamePaused] = useState(false);

  const [isHighScore, setIsHighScore] = useState(false);
  const [playerName, setPlayerName] = useState("");

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
      if (gameOver) {
        cancelAnimationFrame(animationFrameId);
        return; // Stop the game loop when the game is over
      }
    
      if (!gamePaused) {
        tetrisGame.updateGameState(time);
        tetrisGame.renderGridAndPieces();
    
        setScore(tetrisGame.score);
        setLevel(tetrisGame.level);
        setGameOver(tetrisGame.gameOver);
      }
    
      animationFrameId = requestAnimationFrame(gameLoop);
    };

    const keyActions = {
      ArrowLeft: () => tetrisGame.moveLeft(),
      ArrowRight: () => tetrisGame.moveRight(),
      ArrowDown: () => tetrisGame.softDrop(),
      ArrowUp: () => tetrisGame.rotatePiece(),
      Shift: () => tetrisGame.storePiece(),
      " ": () => tetrisGame.hardDrop(),
      p: () => togglePause(),
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

  useEffect(() => {
    if (gameOver) {
      const checkHighScore = async () => {
        try {
          const response = await fetch("http://localhost:3000/api/scores");
  
          if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
          }
  
          const data = await response.json(); // The response is an object with a `scores` property
          const scores = data.scores; // Access the scores array
  
          if (Array.isArray(scores)) {
            if (scores.length < 10 || score > Math.min(...scores.map((s) => s.score))) {
              setIsHighScore(true); // Trigger the high-score overlay
            } else {
              submitScore("PlayerName");
            }
          } else {
            console.error("Scores is not an array:", scores);
          }
        } catch (error) {
          console.error("Error checking high scores:", error.message);
        }
      };
  
      checkHighScore();
    }
  }, [gameOver, score]);

  const submitScore = async (name) => {
    try {
      await fetch("http://localhost:3000/api/newScore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ player: name, score, date: new Date() }),
      });

      console.log("Score submitted successfully");
      setPlayerName(""); // Reset player name
    } catch (error) {
      console.error("Error submitting score:", error.message);
    }
  };

  const handleNameSubmit = () => {
    submitScore(playerName);
    setIsHighScore(false); // Close high-score overlay
    restartGame();
  };

  const restartGame = () => {
    if (tetrisGameRef.current) {
      tetrisGameRef.current.resetGameState();
      setGameOver(false);
      setScore(0);
      setLevel(1);
      setGamePaused(false);
    }
  };

  const togglePause = () => {
    if (tetrisGameRef.current) {
      tetrisGameRef.current.togglePause();
      setGamePaused(tetrisGameRef.current.gamePaused);
    } else {
      console.log("Game instance not initialized yet.");
    }
  };

  return (
    <div className="relative flex justify-center mt-6">
      {/* Game Canvas */}
      <canvas
        ref={canvasRef}
        width="300"
        height="600"
        className="border"
      ></canvas>

      {/* Info Panel */}
      <div className="text-left text-white bg-slate-800 p-4 w-60 text-2xl font-custom">
        <div className="flex flex-row space-x-8 items-start">
          <button
            onClick={togglePause}
            className="bg-blue-500 text-white px-4 py-2 rounded w-60"
          >
            Pause
          </button>
        </div>
        <h2 className="p-5 border">Score: {score}</h2>
        <h3 className="p-5 border">Level: {level}</h3>
        <div className="p-5 border">
          <h4 className="mb-1">Stored Piece</h4>
          <div className="flex flex-col items-center">
            <canvas
              ref={storedPieceCanvasRef}
              width="80"
              height="80"
              className="mt-2"
            ></canvas>
          </div>
        </div>
        <div className="p-5 border">
          <h4>Next Piece</h4>
          <div className="flex flex-col items-center">
            <canvas
              ref={nextPieceCanvasRef}
              width="80"
              height="80"
              className="mt-2"
            ></canvas>
          </div>
        </div>
      </div>

      {/* Game Over Overlay */}
      {gameOver && !isHighScore && (
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

      {/* High Score Overlay */}
      {isHighScore && (
        <div className="fixed top-32 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-75 text-white z-50">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-8">New High Score!</h2>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Enter your name"
              className="text-black px-4 py-2 rounded mb-4 w-60 text-center"
            />
            <button
              onClick={handleNameSubmit}
              className="bg-green-500 text-white px-6 py-3 rounded text-2xl hover:bg-green-700"
            >
              Submit Score
            </button>
          </div>
        </div>
      )}

      {/* Full-Screen Pause Overlay */}
      {gamePaused && (
        <div className="fixed top-32 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-75 text-white z-50">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-8">Paused</h2>
            <button
              onClick={togglePause}
              className="bg-blue-500 text-white px-6 py-3 rounded text-2xl hover:bg-blue-700"
            >
              Resume Game
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Play;
