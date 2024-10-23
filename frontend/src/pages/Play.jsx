import { useRef, useEffect } from "react";
import TetrisGame from "../game/TetrisGame";

export const Play = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const tetrisGame = new TetrisGame(canvas);

    const gameLoop = (time) => {
      console.log("Game Loop Running"); // Log to check if game loop is running
      tetrisGame.update(time); // Pass the time to update
      tetrisGame.render(); // Render the game
      requestAnimationFrame(gameLoop); // Continue the loop
    };

    requestAnimationFrame(gameLoop); // Start the loop
  }, []);

  return (
    <div className="flex items-center justify-center my-6">
      <canvas
        ref={canvasRef}
        width="300"
        height="600"
        className="border"
      ></canvas>{" "}
      {}
    </div>
  );
};

export default Play;
