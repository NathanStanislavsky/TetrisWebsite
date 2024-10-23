import { useRef, useEffect } from 'react';
import TetrisGame from '../game/TetrisGame';

export const Play = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const tetrisGame = new TetrisGame(canvas);

    const gameLoop = () => {
      tetrisGame.update();
      tetrisGame.render();
      requestAnimationFrame(gameLoop);
    };

    gameLoop();

  }, []);

  return (
    <div className="flex items-center justify-center my-6">
      <canvas ref={canvasRef} width="300" height="600" className="border"></canvas>  {}
    </div>
  );
};

export default Play;