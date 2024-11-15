import TetrisGame from "../../src/game/TetrisGame";
import { TETRIS_PIECES } from "../../src/game/tetrisPieces";

describe('TetrisGame Rendering Specific Piece', () => {
  let game;
  let mockCanvas;
  let mockStoredPieceCanvas;
  let mockNextPieceCanvas;
  let mockContext;
  let mockStoredPieceContext;
  let mockNextPieceContext;

  beforeEach(() => {
    // Mock main game canvas and context
    mockCanvas = document.createElement('canvas');
    mockContext = {
      clearRect: jest.fn(),
      fillRect: jest.fn(),
      fillStyle: '',
      globalAlpha: 1.0,
    };
    mockCanvas.getContext = jest.fn().mockReturnValue(mockContext);

    // Mock stored piece canvas and context
    mockStoredPieceCanvas = document.createElement('canvas');
    mockStoredPieceContext = {
      clearRect: jest.fn(),
      fillRect: jest.fn(),
      fillStyle: '',
    };
    mockStoredPieceCanvas.getContext = jest.fn().mockReturnValue(mockStoredPieceContext);

    // Mock next piece canvas and context
    mockNextPieceCanvas = document.createElement('canvas');
    mockNextPieceContext = {
      clearRect: jest.fn(),
      fillRect: jest.fn(),
      fillStyle: '',
    };
    mockNextPieceCanvas.getContext = jest.fn().mockReturnValue(mockNextPieceContext);

    // Initialize TetrisGame with mocked canvases
    game = new TetrisGame(mockCanvas, mockStoredPieceCanvas, mockNextPieceCanvas);

    // Mock createPiece to return a predictable "O" piece
    jest.spyOn(TetrisGame.prototype, 'createPiece').mockReturnValue({
      shape: TETRIS_PIECES['O'],
      type: 'O',
    });

    // Set known pieces for active, stored, and next
    game.activePiece = game.createPiece();
    game.activePiecePosition = { x: 3, y: 5 }; // Set starting position for active piece
    game.storedPiece = game.createPiece(); // Set stored piece
    game.nextPiece = game.createPiece(); // Set next piece
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('drawActivePiece should render the "O" piece correctly at the specified position on the main canvas', () => {
    const blockSize = 30; // Block size in the main game area
    const { x, y } = game.activePiecePosition;

    // Expected coordinates for each cell in the "O" piece on the main canvas
    const expectedCoordinates = [
      { x: (x + 0) * blockSize, y: (y + 0) * blockSize },
      { x: (x + 1) * blockSize, y: (y + 0) * blockSize },
      { x: (x + 0) * blockSize, y: (y + 1) * blockSize },
      { x: (x + 1) * blockSize, y: (y + 1) * blockSize },
    ];

    game.drawActivePiece();

    expect(mockContext.fillStyle).toBe(game.getPieceColor(game.activePiece.type));

    expectedCoordinates.forEach(({ x: expectedX, y: expectedY }) => {
      expect(mockContext.fillRect).toHaveBeenCalledWith(expectedX, expectedY, blockSize, blockSize);
    });
  });

  test('drawNextPiece should render the "O" piece correctly in the next piece preview area', () => {
    const blockSize = 20; // Block size for the next piece preview
    const xOffset = 0; // Starting x position in the next piece preview area
    const yOffset = 0; // Starting y position in the next piece preview area

    // Expected coordinates for each cell in the "O" piece in the next piece preview area
    const expectedCoordinates = [
      { x: xOffset + 0 * blockSize, y: yOffset + 0 * blockSize },
      { x: xOffset + 1 * blockSize, y: yOffset + 0 * blockSize },
      { x: xOffset + 0 * blockSize, y: yOffset + 1 * blockSize },
      { x: xOffset + 1 * blockSize, y: yOffset + 1 * blockSize },
    ];

    game.drawNextPiece();

    expect(mockNextPieceContext.clearRect).toHaveBeenCalledWith(0, 0, mockNextPieceCanvas.width, mockNextPieceCanvas.height);
    expect(mockNextPieceContext.fillStyle).toBe(game.getPieceColor(game.nextPiece.type));

    expectedCoordinates.forEach(({ x: expectedX, y: expectedY }) => {
      expect(mockNextPieceContext.fillRect).toHaveBeenCalledWith(expectedX, expectedY, blockSize, blockSize);
    });
  });

  test('drawStoredPiece should render the "O" piece correctly in the stored piece area', () => {
    const blockSize = 20; // Block size for the stored piece preview
    const xOffset = 0; // Starting x position in the stored piece preview area
    const yOffset = 0; // Starting y position in the stored piece preview area

    // Expected coordinates for each cell in the "O" piece in the stored piece preview area
    const expectedCoordinates = [
      { x: xOffset + 0 * blockSize, y: yOffset + 0 * blockSize },
      { x: xOffset + 1 * blockSize, y: yOffset + 0 * blockSize },
      { x: xOffset + 0 * blockSize, y: yOffset + 1 * blockSize },
      { x: xOffset + 1 * blockSize, y: yOffset + 1 * blockSize },
    ];

    game.drawStoredPiece();

    expect(mockStoredPieceContext.clearRect).toHaveBeenCalledWith(0, 0, mockStoredPieceCanvas.width, mockStoredPieceCanvas.height);
    expect(mockStoredPieceContext.fillStyle).toBe(game.getPieceColor(game.storedPiece.type));

    expectedCoordinates.forEach(({ x: expectedX, y: expectedY }) => {
      expect(mockStoredPieceContext.fillRect).toHaveBeenCalledWith(expectedX, expectedY, blockSize, blockSize);
    });
  });
});