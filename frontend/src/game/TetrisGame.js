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
    const randomPiece = pieceNames[Math.floor(Math.random() * pieceNames.length)];  
    return {
      shape: TETRIS_PIECES[randomPiece],  // The actual piece shape (2D array)
      type: randomPiece                   // (e.g., "I", "T", "L")
    };
  }

  drawPiece() {
    const blockSize = 30;
    const { x, y } = this.activePiecePosition;

    for (let row = 0; row < this.activePiece.shape.length; row++) {
      for (let col = 0; col < this.activePiece.shape[row].length; col++) {
        if (this.activePiece.shape[row][col] !== 0) {
          if (this.activePiece.type === "I") {
            this.context.fillStyle = "cyan";
          } else if (this.activePiece.type === "T") {
            this.context.fillStyle = "purple";
          } else if (this.activePiece.type === "O") {
            this.context.fillStyle = "yellow";
          } else if (this.activePiece.type === "S") {
            this.context.fillStyle = "red";
          } else if (this.activePiece.type === "Z") {
            this.context.fillStyle = "green";
          } else if (this.activePiece.type === "L") {
            this.context.fillStyle = "orange";
          } else if (this.activePiece.type === "J") {
            this.context.fillStyle = "pink";
          }

          this.context.fillRect((x + col) * blockSize, (y + row) * blockSize, blockSize, blockSize);
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
