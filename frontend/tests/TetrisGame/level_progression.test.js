import TetrisGame from "../../src/game/TetrisGame";

describe('TetrisGame Level Progression', () => {
  let game;

  beforeEach(() => {
    // Mock canvas elements
    const mockCanvas = document.createElement('canvas');
    const storedPieceCanvas = document.createElement('canvas');
    const nextPieceCanvas = document.createElement('canvas');

    game = new TetrisGame(mockCanvas, storedPieceCanvas, nextPieceCanvas);
  });

  test('should increase level after clearing required lines', () => {
    game.numLinesCleared = game.linesForNextLevel;

    game.updateLevel();

    expect(game.level).toBe(2);
    expect(game.linesForNextLevel).toBe(20);
  });

  test('calculateGravityInterval should adjust dropInterval correctly', () => {
    const intervalLevel1 = game.calculateGravityInterval(1);
    const intervalLevel5 = game.calculateGravityInterval(2);

    expect(intervalLevel5).toBeLessThan(intervalLevel1);
  });

  test('should not exceed MAX_LEVEL', () => {
    game.level = game.MAX_LEVEL;
    game.numLinesCleared = game.linesForNextLevel;

    game.updateLevel();

    expect(game.level).toBe(game.MAX_LEVEL);
  });
});