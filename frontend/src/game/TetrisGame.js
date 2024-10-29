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
    this.score = 0;
    this.level = 0;
  }

  createGrid(rows, cols) {
    const grid = [];
    for (let row = 0; row < rows; row++) {
      grid.push(new Array(cols).fill({ value: 0, color: "black" }));  // Empty cells start with black color
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
            newY >= this.grid.length ||          // Bottom boundary
            newX < 0 ||                          // Left boundary
            newX >= this.grid[0].length ||       // Right boundary
            this.grid[newY][newX].value !== 0    // Collision with locked piece
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }

  getPieceColor(type) {
    const colors = {
      I: "cyan",
      T: "purple",
      O: "yellow",
      S: "red",
      Z: "green",
      L: "orange",
      J: "pink"
    };
    return colors[type];
  }

  lockPiece() {
    const pieceColor = this.getPieceColor(this.activePiece.type); // Get the color based on the piece type
  
    for (let row = 0; row < this.activePiece.shape.length; row++) {
      for (let col = 0; col < this.activePiece.shape[row].length; col++) {
        if (this.activePiece.shape[row][col] !== 0) {
          this.grid[this.activePiecePosition.y + row][this.activePiecePosition.x + col] = {
            value: 1,
            color: pieceColor  // Store the color of the piece when it locks
          };
        }
      }
    }
  }

  moveLeft() {
    const newPos = { x: this.activePiecePosition.x - 1, y: this.activePiecePosition.y };
    if (!this.checkCollision(this.activePiece.shape, newPos)) {
      this.activePiecePosition.x -= 1;  // Move the piece left
    }
  }
  
  moveRight() {
    const newPos = { x: this.activePiecePosition.x + 1, y: this.activePiecePosition.y };
    if (!this.checkCollision(this.activePiece.shape, newPos)) {
      this.activePiecePosition.x += 1;  // Move the piece right
    }
  }
  
  softDrop() {
    const newPos = { x: this.activePiecePosition.x, y: this.activePiecePosition.y + 1 };
    if (!this.checkCollision(this.activePiece.shape, newPos)) {
      this.activePiecePosition.y += 1;  // Move the piece down
      this.score += 1;
    }
  }

  update(time = 0) {
    const deltaTime = time - this.lastTime;
    this.lastTime = time;
    this.dropCounter += deltaTime;
  
    if (this.dropCounter > this.dropInterval) {
      const newPos = {
        x: this.activePiecePosition.x,
        y: this.activePiecePosition.y + 1,
      };
      
      if (!this.checkCollision(this.activePiece.shape, newPos)) {
        this.activePiecePosition.y += 1;
      } else {
        this.lockPiece();

        for (let row = this.grid.length - 1; row >= 0; row--) {
          if (this.getFilledRow(row)) {
            this.clearLine(row);
            row++;
          }
        }
  
        this.activePiece = this.createPiece();
        this.activePiecePosition = { x: 3, y: 0 };
      }

      console.log(this.score);
  
      this.dropCounter = 0;
    }
  }

  rotatePiece() {
    const rotatedPiece = [];

    for (let col = 0; col < this.activePiece.shape[0].length; col++) {
      const newRow = this.activePiece.shape.map((row) => row[col]).reverse();
      rotatedPiece.push(newRow);
    }

    if (!this.checkCollision(rotatedPiece, this.activePiecePosition)) {
      this.activePiece.shape = rotatedPiece;
    }
  }

  render() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawGrid();
    this.drawPiece();
  }

  getFilledRow(row) {
    for (let col = 0; col < this.grid[row].length; col++) {
      if (this.grid[row][col].value === 0) {
        return false; 
      }
    }
    return true;
  }

  clearLine(row) {
    // Clear the filled row by setting all cells to empty
    for (let col = 0; col < this.grid[row].length; col++) {
      this.grid[row][col] = { value: 0, color: "black" };
    }
  
    // Move all rows above down by one
    for (let r = row; r > 0; r--) {
      for (let col = 0; col < this.grid[r].length; col++) {
        this.grid[r][col] = { ...this.grid[r - 1][col] };  // Copy the cell from the row above
      }
    }
  
    // Clear the top row
    for (let col = 0; col < this.grid[0].length; col++) {
      this.grid[0][col] = { value: 0, color: "black" };
    }
  }

  drawGrid() {
    const blockSize = 30;
    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < this.grid[row].length; col++) {
        const cell = this.grid[row][col];
        if (cell.value === 1) {
          this.context.fillStyle = cell.color;  // Use the color stored in the grid
        } else {
          this.context.fillStyle = "black";     // Empty cells are black
        }
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
