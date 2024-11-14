import TetrisGame from "../../src/game/TetrisGame";

describe('TetrisGame Reset Functionality', () => {
  let game;

  beforeEach(() => {
    const mockCanvas = document.createElement('canvas');
    const storedPieceCanvas = document.createElement('canvas');
    const nextPieceCanvas = document.createElement('canvas');

    game = new TetrisGame(mockCanvas, storedPieceCanvas, nextPieceCanvas);
  });

  test('resetGame should reset all game properties to initial values', () => {
    // Modify game state
    game.score = 100;
    game.level = 5;
    game.gameOver = true;

    game.resetGame();

    expect(game.score).toBe(0);
    expect(game.level).toBe(1);
    expect(game.gameOver).toBe(false);
    expect(game.grid.flat().every(cell => cell.value === 0)).toBe(true);
  });
});