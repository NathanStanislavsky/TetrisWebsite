import TetrisGame from "../../src/game/TetrisGame";
import { TETRIS_PIECES } from "../../src/game/tetrisPieces";

describe("TetrisGame Line Clearing and Scoring", () => {
  let game;

  beforeEach(() => {
    jest.spyOn(TetrisGame.prototype, "createPiece").mockReturnValue({
      shape: TETRIS_PIECES["I"],
      type: "I",
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

  test("getFilledRow should identify filled rows correctly", () => {
    const row = 19;
    game.grid[row] = game.grid[row].map(() => ({ value: 1, color: "blue" }));

    expect(game.getFilledRow(row)).toBe(true);
  });

  test("getFilledRow should return false for incomplete rows", () => {
    const row = 19;
    game.grid[row][0] = { value: 1, color: "blue" };

    expect(game.getFilledRow(row)).toBe(false);
  });

  test("clearLine should clear the specified row and shift others down", () => {
    const rowToClear = 19;

    game.grid[rowToClear] = game.grid[rowToClear].map(() => ({
      value: 1,
      color: "blue",
    }));
    game.grid[rowToClear - 1] = game.grid[rowToClear - 1].map(() => ({
      value: 1,
      color: "red",
    }));
    game.grid[rowToClear - 2] = game.grid[rowToClear - 2].map(() => ({
      value: 1,
      color: "green",
    }));

    game.clearLine(rowToClear);

    game.grid[rowToClear].forEach((cell) => {
      expect(cell).toEqual({ value: 1, color: "red" });
    });

    game.grid[rowToClear - 1].forEach((cell) => {
      expect(cell).toEqual({ value: 1, color: "green" });
    });

    game.grid[rowToClear - 2].forEach((cell) => {
      expect(cell).toEqual({ value: 0, color: "black" });
    });
  });

  test("should update score correctly when lines are cleared", () => {
    game.level = 1;
    game.score = 0;

    // Simulate clearing 1 line
    game.numLinesCleared = 0;
    game.score = 0;
    game.updateScore(1);
    expect(game.score).toBe(40 * (game.level + 1));

    // Simulate clearing 2 lines
    game.score = 0;
    game.updateScore(2);
    expect(game.score).toBe(100 * (game.level + 1));

    // Simulate clearing 3 lines
    game.score = 0;
    game.updateScore(3);
    expect(game.score).toBe(300 * (game.level + 1));

    // Simulate clearing 4 lines
    game.score = 0;
    game.updateScore(4);
    expect(game.score).toBe(1200 * (game.level + 1));
  });
});
