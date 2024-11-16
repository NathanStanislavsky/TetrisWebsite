import TetrisGame from "../../src/game/TetrisGame";

describe('TetrisGame Utility Methods', () => {
  let game;

  beforeEach(() => {
    const mockCanvas = document.createElement('canvas');
    const storedPieceCanvas = document.createElement('canvas');
    const nextPieceCanvas = document.createElement('canvas');

    game = new TetrisGame(mockCanvas, storedPieceCanvas, nextPieceCanvas);
  });

  test('getPieceColor should return correct color for each piece type', () => {
    const colors = {
      I: 'cyan',
      T: 'purple',
      O: 'yellow',
      S: 'red',
      Z: 'green',
      L: 'orange',
      J: 'pink',
    };

    Object.keys(colors).forEach(type => {
      expect(game.getPieceColor(type)).toBe(colors[type]);
    });
  });

  test('getGhostPosition should return the lowest valid y position for the active piece', () => {
    const position = game.getGhostPosition();

    expect(position.y).toBeGreaterThanOrEqual(game.activePiecePosition.y);
    expect(game.checkCollision(game.activePiece.shape, { x: position.x, y: position.y + 1 })).toBe(true);
  });
});