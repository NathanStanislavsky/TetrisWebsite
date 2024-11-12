import TetrisGame from '../../src/game/TetrisGame';

describe('TetrisGame Movement and Rotation', () => {
  let game;

  beforeEach(() => {
    // Mock canvas elements
    const mockCanvas = document.createElement('canvas');
    const storedPieceCanvas = document.createElement('canvas');
    const nextPieceCanvas = document.createElement('canvas');

    game = new TetrisGame(mockCanvas, storedPieceCanvas, nextPieceCanvas);
  });

  test('moveLeft should update position correctly', () => {
    game.activePiecePosition.x = 5;
    game.moveLeft();
    expect(game.activePiecePosition.x).toBe(4);
  });

  test('moveLeft should not move beyond left boundary', () => {
    game.activePiecePosition.x = 0;
    game.moveLeft();
    expect(game.activePiecePosition.x).toBe(0);
  });

  test('moveRight should update position correctly', () => {
    game.activePiecePosition.x = 3;
    game.moveRight();
    expect(game.activePiecePosition.x).toBe(4);
  });

  test('moveRight should not move beyond right boundary', () => {
    const maxRight = game.grid[0].length - game.activePiece.shape[0].length;
    game.activePiecePosition.x = maxRight;
    game.moveRight();
    expect(game.activePiecePosition.x).toBe(maxRight);
  });

  test('softDrop should move piece down and increment score', () => {
    const initialY = game.activePiecePosition.y;
    const initialScore = game.score;

    game.softDrop();

    expect(game.activePiecePosition.y).toBe(initialY + 1);
    expect(game.score).toBe(initialScore + 1);
  });

  test('hardDrop should move piece to lowest valid position and lock it', () => {
    const initialY = game.activePiecePosition.y;

    game.hardDrop();

    const finalY = game.activePiecePosition.y;
    expect(finalY).toBeGreaterThan(initialY);

    // Check if the piece is locked in the grid
    let pieceLocked = false;
    game.grid.forEach(row => {
      row.forEach(cell => {
        if (cell.value === 1) {
          pieceLocked = true;
        }
      });
    });
    expect(pieceLocked).toBe(true);
  });

  test('rotatePiece should rotate the piece correctly', () => {
    const originalShape = game.activePiece.shape.map(row => [...row]);

    game.rotatePiece();

    expect(game.activePiece.shape).not.toEqual(originalShape);
  });
});