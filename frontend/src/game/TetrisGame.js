import { TETRIS_PIECES } from "./tetrisPieces.js";
export default class TetrisGame {
  constructor(canvas, storedPieceCanvas, nextPieceCanvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.storedPieceCanvas = storedPieceCanvas;
    this.storedPieceContext = storedPieceCanvas.getContext("2d");

    this.nextPieceCanvas = nextPieceCanvas;
    this.nextPieceContext = nextPieceCanvas.getContext("2d");

    this.grid = this.createGrid(20, 10);
    this.activePiece = this.createPiece();
    this.activePiecePosition = { x: 3, y: 0 };
    this.score = 0;
    this.dropCounter = 0;
    this.dropInterval = 1000;
    this.lastTime = 0;
    this.level = 1;
    this.numLinesCleared = 0;
    this.linesForNextLevel = 10;
    this.MAX_LEVEL = 30;
    this.storedPiece = null;
    this.storedAPiece = false;

    this.nextPiece = this.createPiece();
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

        let linesClearedTempCount = 0;
        for (let row = this.grid.length - 1; row >= 0; row--) {
          if (this.getFilledRow(row)) {
            this.clearLine(row);
            row++;
            this.numLinesCleared += 1;
            linesClearedTempCount += 1;
          }
        }

        if (linesClearedTempCount === 1) {
          this.score += 40 * (this.level + 1);
        } else if (linesClearedTempCount === 2) {
          this.score += 100 * (this.level + 1);
        } else if (linesClearedTempCount === 3) {
          this.score += 300 * (this.level + 1);
        } else if (linesClearedTempCount === 4) {
          this.score += 1200 * (this.level + 1);
        }

        this.activePiece = this.nextPiece;
        this.newNextPiece();
        this.activePiecePosition = { x: 3, y: 0 };
      }

      if (
        this.numLinesCleared >= this.linesForNextLevel &&
        this.level < this.MAX_LEVEL
      ) {
        this.updateLevel();
      }

      this.dropCounter = 0;
    }
  }

  render() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawGrid();
    this.drawGhostPiece();
    this.drawPiece();
    this.drawStoredPiece();
    this.drawNextPiece();
  }

  createGrid(rows, cols) {
    const grid = [];
    for (let row = 0; row < rows; row++) {
      grid.push(new Array(cols).fill({ value: 0, color: "black" }));
    }
    return grid;
  }

  createPiece() {
    const pieceNames = Object.keys(TETRIS_PIECES);
    const randomPiece =
      pieceNames[Math.floor(Math.random() * pieceNames.length)];
    return {
      shape: TETRIS_PIECES[randomPiece],
      type: randomPiece,
    };
  }

  getPseudoPosition() {
    let pseudoPosition = { x: this.activePiecePosition.x, y: this.activePiecePosition.y };

    while (!this.checkCollision(this.activePiece.shape, { x: pseudoPosition.x, y: pseudoPosition.y + 1 })) {
      pseudoPosition.y += 1;
    }
  
    return pseudoPosition;
  }

  newNextPiece() {
    this.nextPiece = this.createPiece();
    this.drawNextPiece();
  }

  storePiece() {
    if (this.storedAPiece) {
      return;
    } else {
      this.storedAPiece = true;
      
      if (this.storedPiece == null) {
        this.storedPiece = this.activePiece;
        this.activePiece = this.nextPiece;
        this.newNextPiece();
      } else {
        const temp = this.activePiece;
        this.activePiece = this.storedPiece;
        this.storedPiece = temp;

        this.activePiecePosition = { x: 3, y: 0 };

        if (!this.checkCollision(this.activePiece.shape, this.activePiecePosition)) {
          this.drawStoredPiece();
        }
      }
    }
  }

  getPieceColor(type) {
    const colors = {
      I: "cyan",
      T: "purple",
      O: "yellow",
      S: "red",
      Z: "green",
      L: "orange",
      J: "pink",
    };
    return colors[type];
  }

  calculateGravityInterval(level) {
    return Math.pow(0.8 - (level - 1) * 0.007, level - 1) * 1000;
  }

  updateLevel() {
    this.level += 1;
    this.linesForNextLevel += 10;
    this.dropInterval = this.calculateGravityInterval(this.level);
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
    for (let col = 0; col < this.grid[row].length; col++) {
      this.grid[row][col] = { value: 0, color: "black" };
    }

    for (let r = row; r > 0; r--) {
      for (let col = 0; col < this.grid[r].length; col++) {
        this.grid[r][col] = { ...this.grid[r - 1][col] };
      }
    }

    for (let col = 0; col < this.grid[0].length; col++) {
      this.grid[0][col] = { value: 0, color: "black" };
    }
  }

  checkCollision(piece, position) {
    for (let row = 0; row < piece.length; row++) {
      for (let col = 0; col < piece[row].length; col++) {
        if (piece[row][col] !== 0) {
          const newY = position.y + row;
          const newX = position.x + col;
          if (
            newY >= this.grid.length ||
            newX < 0 || 
            newX >= this.grid[0].length || 
            this.grid[newY][newX].value !== 0 
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }

  moveLeft() {
    const newPos = {
      x: this.activePiecePosition.x - 1,
      y: this.activePiecePosition.y,
    };
    if (!this.checkCollision(this.activePiece.shape, newPos)) {
      this.activePiecePosition.x -= 1; 
    }
  }

  moveRight() {
    const newPos = {
      x: this.activePiecePosition.x + 1,
      y: this.activePiecePosition.y,
    };
    if (!this.checkCollision(this.activePiece.shape, newPos)) {
      this.activePiecePosition.x += 1; 
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

  softDrop() {
    const newPos = {
      x: this.activePiecePosition.x,
      y: this.activePiecePosition.y + 1,
    };
    if (!this.checkCollision(this.activePiece.shape, newPos)) {
      this.activePiecePosition.y += 1; 
      this.score += 1;
    }
  }

  hardDrop() {
    const ghostPosition = this.getPseudoPosition();
    
    this.activePiecePosition = ghostPosition;
    
    this.score += (ghostPosition.y - this.activePiecePosition.y) * 2; // hard drop bonus points

    this.lockPiece();
}

  lockPiece() {
    const pieceColor = this.getPieceColor(this.activePiece.type); 

    for (let row = 0; row < this.activePiece.shape.length; row++) {
      for (let col = 0; col < this.activePiece.shape[row].length; col++) {
        if (this.activePiece.shape[row][col] !== 0) {
          this.grid[this.activePiecePosition.y + row][
            this.activePiecePosition.x + col
          ] = {
            value: 1,
            color: pieceColor, 
          };
        }
      }
    }

    this.storedAPiece = false;
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

  drawStoredPiece() {
    if (this.storedPiece) {
      const blockSize = 20;
      const storedShape = this.storedPiece.shape;
      const pieceColor = this.getPieceColor(this.storedPiece.type);

      this.storedPieceContext.clearRect(
        0,
        0,
        this.storedPieceCanvas.width,
        this.storedPieceCanvas.height
      );
      this.storedPieceContext.fillStyle = pieceColor;

      for (let row = 0; row < storedShape.length; row++) {
        for (let col = 0; col < storedShape[row].length; col++) {
          if (storedShape[row][col] !== 0) {
            this.storedPieceContext.fillRect(
              col * blockSize,
              row * blockSize,
              blockSize,
              blockSize
            );
          }
        }
      }
    }
  }

  drawNextPiece() {
    if (this.nextPiece) {
      const blockSize = 20;
      const nextPieceShape = this.nextPiece.shape;
      const pieceColor = this.getPieceColor(this.nextPiece.type);
  
      this.nextPieceContext.clearRect(
        0,
        0,
        this.nextPieceCanvas.width,
        this.nextPieceCanvas.height
      );
      this.nextPieceContext.fillStyle = pieceColor;
  
      for (let row = 0; row < nextPieceShape.length; row++) {
        for (let col = 0; col < nextPieceShape[row].length; col++) {
          if (nextPieceShape[row][col] !== 0) {
            this.nextPieceContext.fillRect(
              col * blockSize,
              row * blockSize,
              blockSize,
              blockSize
            );
          }
        }
      }
    }
  }

  drawGrid() {
    const blockSize = 30;
    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < this.grid[row].length; col++) {
        const cell = this.grid[row][col];
        if (cell.value === 1) {
          this.context.fillStyle = cell.color;
        } else {
          this.context.fillStyle = "black";
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

  drawGhostPiece() {
    const ghostPosition = this.getPseudoPosition();
    const blockSize = 30;
  
    this.context.globalAlpha = 0.6;
  
    for (let row = 0; row < this.activePiece.shape.length; row++) {
      for (let col = 0; col < this.activePiece.shape[row].length; col++) {
        if (this.activePiece.shape[row][col] !== 0) {
          this.context.fillStyle = this.getPieceColor(this.activePiece.type);
          this.context.fillRect(
            (ghostPosition.x + col) * blockSize,
            (ghostPosition.y + row) * blockSize,
            blockSize,
            blockSize
          );
        }
      }
    }
  
    this.context.globalAlpha = 1.0;
  }
}
