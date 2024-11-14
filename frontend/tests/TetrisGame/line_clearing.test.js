import TetrisGame from "../../src/game/TetrisGame";
import { TETRIS_PIECES } from "../../src/game/tetrisPieces";

describe('TetrisGame Line Clearing and Scoring', () => {
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
});
