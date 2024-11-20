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
      if (!tetrisGame.gamePaused) {
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
      const submitScore = async () => {
        try {
          // Submit the new score
          const response = await fetch("http://localhost:3000/api/newScore", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              player: "PlayerName",
              score: score,
              date: new Date(),
            }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to submit score");
          }

          console.log("Score submitted successfully");

          // Fetch all scores to check if cleanup is needed
          const scoresResponse = await fetch(
            "http://localhost:3000/api/scores"
          );
          if (!scoresResponse.ok) {
            throw new Error("Failed to fetch scores");
          }

          const scores = await scoresResponse.json();
          console.log("Fetched scores:", scores);

          // Delete the smallest score if there are more than 10
          if (scores.length > 10) {
            const deleteResponse = await fetch(
              "http://localhost:3000/api/deleteScore",
              {
                method: "DELETE",
              }
            );

            if (!deleteResponse.ok) {
              throw new Error("Failed to delete the smallest score");
            }

            console.log("Smallest score deleted successfully");
          }
        } catch (error) {
          console.error("Error handling leaderboard:", error.message);
        }
      };

      submitScore();
    }
  }, [gameOver, score]);

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
      <div className="flex flex-row space-x-8 items-start">
        <button
          onClick={togglePause}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {gamePaused ? "Resume" : "Pause"}
        </button>

        {/* Full-Screen Pause Overlay */}
        {gamePaused && (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-75 text-white z-50">
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

        {/* Game Canvas */}
        <canvas
          ref={canvasRef}
          width="300"
          height="600"
          className="border"
        ></canvas>

        {/* Info Panel */}
        <div className="text-left text-white bg-slate-800 p-4 w-60 text-3xl font-custom">
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
