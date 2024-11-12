import TetrisGame from "../../src/game/TetrisGame";

describe("TetrisGame collision tests", () => {
  let game;

  beforeEach(() => {
    // Mock canvas elements
    const mockCanvas = document.createElement("canvas");
    const storedPieceCanvas = document.createElement("canvas");
    const nextPieceCanvas = document.createElement("canvas");

    game = new TetrisGame(mockCanvas, storedPieceCanvas, nextPieceCanvas);
  });

  test('checkCollision should check boundary collision', () => {
    const piece = game.activePiece.shape;

    // Left boundary
    expect(game.checkCollision(piece, { x: -1, y: 5 })).toBe(true);

    // Right boundary
    const rightPosition = game.grid[0].length - piece[0].length + 1;
    expect(game.checkCollision(piece, { x: rightPosition, y: 5 })).toBe(true);

    // Right boundary
    const bottomPosition = game.grid.length - piece.length + 1;
    expect(game.checkCollision(piece, { x: 5, y: bottomPosition })).toBe(true);
  });

  test('checkCollision should detect collisions with locked pieces', () => {
    const piece = game.activePiece.shape;

    game.grid[5][5] = { value: 1, color: 'red' };

    expect(game.checkCollision(piece, { x: 5, y: 5 })).toBe(true);
  });

  test('checkCollision should return false for valid positions', () => {
    const piece = game.activePiece.shape;

    expect(game.checkCollision(piece, { x: 3, y: 1})).toBe(false);
  });
});
