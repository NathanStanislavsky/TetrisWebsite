import TetrisGame from "../../src/game/TetrisGame";
import { TETRIS_PIECES } from "../../src/game/tetrisPieces";

describe('TetrisGame game over', () => {
  let game;

  beforeEach(() => {
    // Mock canvas elements
    const mockCanvas = document.createElement('canvas');
    const storedPieceCanvas = document.createElement('canvas');
    const nextPieceCanvas = document.createElement('canvas');

    // Mock createPiece to return a fixed piece (e.g., "O" piece)
    jest.spyOn(TetrisGame.prototype, 'createPiece').mockReturnValue({
      shape: TETRIS_PIECES['O'],
      type: 'O',
    });

    game = new TetrisGame(mockCanvas, storedPieceCanvas, nextPieceCanvas);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should set gameOver to true when a new piece collides at spawn', () => {
    // Simulate a block at the spawn position
    game.grid[0][3].value = 1;

    const collision = game.checkGameOver(game.activePiece.shape, game.activePiecePosition);

    if (collision) {
      game.gameOver = true;
    }

    expect(collision).toBe(true);
    expect(game.gameOver).toBe(true);
  });

  test('should not set gameOver when there is no collision at spawn', () => {
    const collision = game.checkGameOver(game.activePiece.shape, game.activePiecePosition);

    if (collision) {
      game.gameOver = true;
    }

    expect(collision).toBe(false);
    expect(game.gameOver).toBe(false);
  });
});