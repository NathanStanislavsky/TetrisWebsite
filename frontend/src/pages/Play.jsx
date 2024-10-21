import { useRef, useEffect } from 'react';
import TetrisGame from '../game/TetrisGame';  // Import game logic

export const Play = () => {
  const canvasRef = useRef(null);  // Reference for the canvas element

  useEffect(() => {
    const canvas = canvasRef.current;
    const tetrisGame = new TetrisGame(canvas);

    const gameLoop = () => {
      tetrisGame.update();
      tetrisGame.render();
      requestAnimationFrame(gameLoop);  // Call game loop on every frame
    };

    gameLoop();  // Start the game loop

  }, []);

  return (
    <div className="flex items-center justify-center my-6">
      <canvas ref={canvasRef} width="300" height="600" className="border"></canvas> {/* Tetris game canvas */}
    </div>
  );
};

export default Play;