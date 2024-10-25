import { useRef, useEffect } from 'react';
import TetrisGame from '../game/TetrisGame';

export const Play = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const tetrisGame = new TetrisGame(canvas);

    const gameLoop = (time) => {
      tetrisGame.update(time);
      tetrisGame.render();
      requestAnimationFrame(gameLoop);
    };

    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          tetrisGame.moveLeft();
          break;
        case 'ArrowRight':
          tetrisGame.moveRight();
          break;
        case 'ArrowDown':
          tetrisGame.softDrop();
          break;
        case 'ArrowUp':
          tetrisGame.rotatePiece();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="flex items-center justify-center my-6">
      <canvas ref={canvasRef} width="300" height="600" className="border"></canvas>
    </div>
  );
};

export default Play;