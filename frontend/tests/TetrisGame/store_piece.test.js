import TetrisGame from "../../src/game/TetrisGame";
import { TETRIS_PIECES } from "../../src/game/tetrisPieces";

describe('TetrisGame Level Progression', () => {
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

  test('should store active piece when none is stored', () => {
    const initialActivePiece = game.activePiece;

    game.storePiece();

    expect(game.storedPiece).toBe(initialActivePiece);
    expect(game.storedAPiece).toBe(true);
    expect(game.activePiece).toBe(game.nextPiece);
  });

  test('should switch active piece and stored piece', () => {
    const initialActivePiece = game.activePiece;
    game.storePiece();

    game.storedAPiece = false;
    game.activePiece = game.createPiece();
    const pieceToBeStored = game.activePiece;
    game.storePiece();

    expect(game.activePiece).toBe(initialActivePiece);
    expect(game.storedAPiece).toBe(true);
    expect(game.storedPiece).toBe(pieceToBeStored);
  });

  test('should not allow more than one switch to occur', () => {
    game.storePiece();
    const storedPieceAfterFirstStore = game.storedPiece;

    game.storePiece();

    expect(game.storedPiece).toBe(storedPieceAfterFirstStore);
  });
});