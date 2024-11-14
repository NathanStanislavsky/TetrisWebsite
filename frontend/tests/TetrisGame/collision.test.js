import TetrisGame from "../../src/game/TetrisGame";
import { TETRIS_PIECES } from '../../src/game/tetrisPieces';

describe("TetrisGame collision tests", () => {
  let game;

  beforeEach(() => {
    jest.spyOn(TetrisGame.prototype, 'createPiece').mockReturnValue({
        shape: TETRIS_PIECES['I'],
        type: 'I',
      });

    // Mock canvas elements
    const mockCanvas = document.createElement("canvas");
    const storedPieceCanvas = document.createElement("canvas");
    const nextPieceCanvas = document.createElement("canvas");

    game = new TetrisGame(mockCanvas, storedPieceCanvas, nextPieceCanvas);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('checkCollision should check boundary collision', () => {
    const piece = game.activePiece.shape;

    // Left boundary outside of grid
    expect(game.checkCollision(piece, { x: -1, y: 5 })).toBe(true);

    // Right boundary outside of grid
    const rightPosition = game.grid[0].length - piece[0].length + 1;
    expect(game.checkCollision(piece, { x: rightPosition, y: 5 })).toBe(true);

    // bottom boundary outside of grid
    const bottomPosition = game.grid.length - piece.length + 3;
    expect(game.checkCollision(piece, { x: 5, y: bottomPosition })).toBe(true);
  });

  test('checkCollision should detect collisions with locked pieces', () => {
    const piece = game.activePiece.shape;

    game.grid[5][5] = { value: 1, color: 'red' };

    expect(game.checkCollision(piece, { x: 5, y: 4 })).toBe(true);
  });

  test('checkCollision should return false for valid positions', () => {
    const piece = game.activePiece.shape;

    expect(game.checkCollision(piece, { x: 3, y: 1})).toBe(false);
  });
});
