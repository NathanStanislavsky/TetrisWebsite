import TetrisGame from '../../src/game/TetrisGame';
import { TETRIS_PIECES } from '../../src/game/tetrisPieces';

describe('TetrisGame Initialization', () => {
  let game;

  beforeEach(() => {
    // Mock canvas elements
    const mockCanvas = document.createElement('canvas');
    const storedPieceCanvas = document.createElement('canvas');
    const nextPieceCanvas = document.createElement('canvas');

    game = new TetrisGame(mockCanvas, storedPieceCanvas, nextPieceCanvas);
  });

  test('should initialize the grid with correct dimensions and values', () => {
    const grid = game.grid;
  
    expect(grid.length).toBe(TetrisGame.GRID_ROWS);
    grid.forEach(row => {
      expect(row.length).toBe(TetrisGame.GRID_COLS);
      row.forEach(cell => {
        expect(cell).toBe(0);
      });
    });
  });

  test('should create a piece with a valid shape and type', () => {
    const piece = game.createPiece();
    const pieceTypes = Object.keys(TETRIS_PIECES);

    expect(piece).toHaveProperty('shape');
    expect(piece).toHaveProperty('type');
    expect(pieceTypes).toContain(piece.type);
    expect(piece.shape).toEqual(TETRIS_PIECES[piece.type]);
  });

  test('should set initial game state correctly', () => {
    expect(game.score).toBe(0);
    expect(game.level).toBe(1);
    expect(game.numLinesCleared).toBe(0);
    expect(game.gameOver).toBe(false);
  });
});