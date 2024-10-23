import { TETRIS_PIECES } from "./tetrisPieces.js";
export default class TetrisGame {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.grid = this.createGrid(20, 10);
    this.activePiece = this.createPiece();
    this.activePiecePosition = { x: 3, y: 0 };
    this.score = 0;
  }

  createGrid(rows, cols) {
    const grid = [];
    for (let row = 0; row < rows; row++) {
      grid.push(new Array(cols).fill(0));
    }
    return grid;
  }

  createPiece() {
    const pieceNames = Object.keys(TETRIS_PIECES);
    const randomPiece =
      pieceNames[Math.floor(Math.random() * pieceNames.length)];
    return TETRIS_PIECES[randomPiece];
  }

  drawPiece() {
    const blockSize = 30;
    const { x, y } = this.activePiecePosition;

    for (let row = 0; row < this.activePiece.length; row++) {
      for (let col = 0; col < this.activePiece[row].length; col++) {
        if (this.activePiece[row][col] === 1) {
          this.context.fillStyle = "red";
          this.context.fillRect(
            (x + col) * blockSize,
            (y + row) * blockSize,
            blockSize,
            blockSize
          );
        }
      }
    }
  }

  update() {
    this.activePiecePosition.y += .1;
  }

  render() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawGrid();
    this.drawPiece();
  }

  drawGrid() {
    const blockSize = 30;
    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < this.grid[row].length; col++) {
        this.context.fillStyle = this.grid[row][col] === 1 ? "blue" : "black";
        this.context.fillRect(
          col * blockSize,
          row * blockSize,
          blockSize,
          blockSize
        );
      }
    }
  }
}
