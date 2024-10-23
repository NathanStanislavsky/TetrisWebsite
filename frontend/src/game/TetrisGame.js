import { TETRIS_PIECES } from "./tetrisPieces.js";
export default class TetrisGame {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.grid = this.createGrid(20, 10);
    this.activePiece = this.createPiece();
    this.activePiecePosition = { x: 3, y: 0 };
    this.score = 0;
    this.dropCounter = 0; // Initialize the drop counter
    this.dropInterval = 1000; // Move piece down every 1000 ms (1 second)
    this.lastTime = 0; // Track the last frame time for delta calculation
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
    return {
      shape: TETRIS_PIECES[randomPiece], // The actual piece shape (2D array)
      type: randomPiece, // (e.g., "I", "T", "L")
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

  checkCollision(piece, position) {
    for (let row = 0; row < piece.length; row++) {
      for (let col = 0; col < piece[row].length; col++) {
        if (piece[row][col] !== 0) {
          const newY = position.y + row;
          const newX = position.x + col;
          if (
            newY >= this.grid.length || // Reached the bottom
            newX < 0 || // Hit the left wall
            newX >= this.grid[0].length || // Hit the right wall
            this.grid[newY][newX] !== 0 // Collided with another piece
          ) {
            return true; // Collision detected
          }
        }
      }
    }
    return false;
  }

  lockPiece() {
    // Lock the piece into the grid
    for (let row = 0; row < this.activePiece.shape.length; row++) {
      for (let col = 0; col < this.activePiece.shape[row].length; col++) {
        if (this.activePiece.shape[row][col] !== 0) {
          this.grid[this.activePiecePosition.y + row][
            this.activePiecePosition.x + col
          ] = this.activePiece.shape[row][col];
        }
      }
    }
  }

  update(time = 0) {
    const deltaTime = time - this.lastTime; // Calculate time difference since last frame
    this.lastTime = time; // Update last time with current time
    this.dropCounter += deltaTime; // Increase drop counter by deltaTime

    console.log(`DeltaTime: ${deltaTime}, DropCounter: ${this.dropCounter}`);

    // Move the piece down every second (1000 ms)
    if (this.dropCounter > this.dropInterval) {
      const newPos = {
        x: this.activePiecePosition.x,
        y: this.activePiecePosition.y + 1,
      };

      if (!this.checkCollision(this.activePiece.shape, newPos)) {
        this.activePiecePosition.y += 1; // Move the piece down
        console.log(`Piece Y Position: ${this.activePiecePosition.y}`);
      } else {
        this.lockPiece(); // Lock the piece if collision is detected
        this.activePiece = this.createPiece(); // Generate a new piece
        this.activePiecePosition = { x: 3, y: 0 }; // Reset position for the new piece
      }

      this.dropCounter = 0; // Reset the drop counter after the piece moves
    }
  }

  rotatePiece() {
    const rotatedPiece = [];

    for (let col = 0; col < this.activePiece.shape[0].length; col++) {
      const newRow = this.activePiece.shape.map((row) => row[col]).reverse();
      rotatedPiece.push(newRow);
    }

    // Only apply rotation if no collision occurs
    if (!this.checkCollision(rotatedPiece, this.activePiecePosition)) {
      this.activePiece.shape = rotatedPiece;
    }
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
