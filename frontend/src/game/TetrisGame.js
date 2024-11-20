import { TETRIS_PIECES } from "./tetrisPieces.js";

const PIECE_TYPES = {
  0: "black",  
  1: "cyan",
  2: "purple", 
  3: "yellow",
  4: "red", 
  5: "green",
  6: "orange", 
  7: "pink"
};
export default class TetrisGame {
  static BLOCK_SIZE_MAIN = 30;
  static BLOCK_SIZE_PREVIEW = 20;
  static GRID_ROWS = 20;
  static GRID_COLS = 10;
  static MAX_LEVEL = 30;

  constructor(canvas, storedPieceCanvas, nextPieceCanvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");

    this.storedPieceCanvas = storedPieceCanvas;
    this.storedPieceContext = storedPieceCanvas.getContext("2d");

    this.nextPieceCanvas = nextPieceCanvas;
    this.nextPieceContext = nextPieceCanvas.getContext("2d");

    this.initializeGameState();
  }

  initializeGameState() {
    this.grid = this.createGrid(TetrisGame.GRID_ROWS, TetrisGame.GRID_COLS);
    this.activePiece = this.createPiece();
    this.activePiecePosition = { x: 3, y: 0 };
    this.score = 0;
    this.dropCounter = 0;
    this.dropInterval = 1000;
    this.lastTime = 0;
    this.level = 1;
    this.numLinesCleared = 0;
    this.linesForNextLevel = 10;
    this.storedPiece = null;
    this.storedAPiece = false;
    this.nextPiece = this.createPiece();
    this.gameOver = false;
    this.gamePaused = false;
  }

  resetGameState() {
    this.initializeGameState();
  }

  updateGameState(time = 0) {
    if (this.gameOver || this.gamePaused) return;

    const deltaTime = time - this.lastTime;
    this.lastTime = time;
    this.dropCounter += deltaTime;

    if (this.dropCounter > this.dropInterval) {
      this.handlePieceDrop();
      this.dropCounter = 0;
    }

  }

  togglePause() {
    this.gamePaused = !this.gamePaused;
  }

  handlePieceDrop() {
    const newPos = {
      x: this.activePiecePosition.x,
      y: this.activePiecePosition.y + 1,
    };

    if (!this.checkCollision(this.activePiece.shape, newPos)) {
      this.activePiecePosition.y += 1;
    } else {
      this.lockPiece();

      this.activePiece = this.nextPiece;
      this.nextPiece = this.createPiece();
      this.drawNextPiece();
      this.activePiecePosition = { x: 3, y: 0 };

      if (
        this.checkGameOver(this.activePiece.shape, this.activePiecePosition)
      ) {
        this.gameOver = true;
        return;
      }

      this.checkAndClearLines();
      this.updateLevel();
    }
  }

  checkAndClearLines() {
    let linesClearedTempCount = 0;

    for (let row = this.grid.length - 1; row >= 0; ) {
      if (this.isRowFilled(row)) {
        this.clearLine(row);
        this.numLinesCleared += 1;
        linesClearedTempCount += 1;
      } else {
        row--;
      }
    }

    this.updateScore(linesClearedTempCount);
  }

  updateScore(linesCleared) {
    const lineScores = [0, 40, 100, 300, 1200];
    this.score += lineScores[linesCleared] * (this.level + 1);
  }

  checkGameOver(piece, position) {
    return this.checkCollision(piece, position);
  }

  renderGridAndPieces() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawGrid();
    this.drawGhostPiece();
    this.drawActivePiece();
    this.drawStoredPiece();
    this.drawNextPiece();
  }

  createGrid(rows, cols) {
    return Array.from({ length: rows }, () =>
      Array(cols).fill(0)
    );
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

  getGhostPosition() {
    let pseudoPosition = { ...this.activePiecePosition };

    while (
      !this.checkCollision(this.activePiece.shape, {
        x: pseudoPosition.x,
        y: pseudoPosition.y + 1,
      })
    ) {
      pseudoPosition.y += 1;
    }

    return pseudoPosition;
  }

  storePiece() {
    if (this.storedAPiece) return;

    this.storedAPiece = true;

    if (this.storedPiece == null) {
      this.storedPiece = this.activePiece;
      this.activePiece = this.nextPiece;
      this.nextPiece = this.createPiece();
      this.drawNextPiece();
    } else {
      [this.activePiece, this.storedPiece] = [
        this.storedPiece,
        this.activePiece,
      ];
    }

    this.activePiecePosition = { x: 3, y: 0 };

    if (
      !this.checkCollision(this.activePiece.shape, this.activePiecePosition)
    ) {
      this.drawStoredPiece();
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
    if (
      this.numLinesCleared >= this.linesForNextLevel &&
      this.level < TetrisGame.MAX_LEVEL
    ) {
      this.level += 1;
      this.linesForNextLevel += 10;
      this.dropInterval = this.calculateGravityInterval(this.level);
    }
  }

  isRowFilled(row) {
    return this.grid[row].every((cellValue) => cellValue !== 0);
  }

  clearLine(row) {
    this.grid.splice(row, 1);
    this.grid.unshift(Array(TetrisGame.GRID_COLS).fill(0));
  }

  checkCollision(piece, position) {
    for (let row = 0; row < piece.length; row++) {
      for (let col = 0; col < piece[row].length; col++) {
        if (piece[row][col] !== 0) {
          const newY = position.y + row;
          const newX = position.x + col;
          if (
            newX < 0 ||
            newX >= TetrisGame.GRID_COLS ||
            newY >= TetrisGame.GRID_ROWS ||
            (newY >= 0 && this.grid[newY][newX] !== 0)
          ) {
            return true;
          }
        }
      }
    }
    return false;
  }

  movePiece(deltaX, deltaY, scoreIncrement = 0) {
    const newPos = {
      x: this.activePiecePosition.x + deltaX,
      y: this.activePiecePosition.y + deltaY,
    };
    if (!this.checkCollision(this.activePiece.shape, newPos)) {
      this.activePiecePosition.x += deltaX;
      this.activePiecePosition.y += deltaY;
      this.score += scoreIncrement;
    }
  }

  moveLeft() {
    this.movePiece(-1, 0);
  }
  
  moveRight() {
    this.movePiece(1, 0);
  }
  
  softDrop() {
    this.movePiece(0, 1, 1); // Increase score by 1 for soft drop
  }

  rotatePiece() {
    const rotatedPiece = this.activePiece.shape[0].map((_, colIndex) =>
      this.activePiece.shape.map((row) => row[colIndex]).reverse()
    );

    const originalX = this.activePiecePosition.x;
    const shifts = [0, -1, 1, -2, 2];

    for (let shift of shifts) {
      const newPos = { x: originalX + shift, y: this.activePiecePosition.y };
      if (!this.checkCollision(rotatedPiece, newPos)) {
        this.activePiecePosition.x += shift;
        this.activePiece.shape = rotatedPiece;
        return;
      }
    }
  }

  hardDrop() {
    const startY = this.activePiecePosition.y;
    const ghostPosition = this.getGhostPosition();
    this.activePiecePosition = ghostPosition;
    this.score += (ghostPosition.y - startY) * 2;
    this.lockPiece();
  }

  getPieceValue(type) {
    const pieceValues = {
      I: 1,
      T: 2,
      O: 3,
      S: 4,
      Z: 5,
      L: 6,
      J: 7,
    };
    return pieceValues[type];
  }

  lockPiece() {
    const pieceValue = this.getPieceValue(this.activePiece.type);
    const { shape } = this.activePiece;
    const { x: posX, y: posY } = this.activePiecePosition;
  
    for (let row = 0; row < shape.length; row++) {
      for (let col = 0; col < shape[row].length; col++) {
        if (shape[row][col] !== 0) {
          const gridY = posY + row;
          const gridX = posX + col;
  
          if (
            gridY >= 0 &&
            gridY < TetrisGame.GRID_ROWS &&
            gridX >= 0 &&
            gridX < TetrisGame.GRID_COLS
          ) {
            this.grid[gridY][gridX] = pieceValue;
          }
        }
      }
    }
  
    this.storedAPiece = false;
  }

  drawPiece(context, piece, position, blockSize) {
    const pieceValue = this.getPieceValue(piece.type);
    context.fillStyle = PIECE_TYPES[pieceValue];
  
    for (let row = 0; row < piece.shape.length; row++) {
      for (let col = 0; col < piece.shape[row].length; col++) {
        if (piece.shape[row][col] !== 0) {
          const drawX = (position.x + col) * blockSize;
          const drawY = (position.y + row) * blockSize;
          context.fillRect(drawX, drawY, blockSize, blockSize);
        }
      }
    }
  }

  drawActivePiece() {
    this.drawPiece(
      this.context,
      this.activePiece,
      this.activePiecePosition,
      TetrisGame.BLOCK_SIZE_MAIN
    );
  }

  drawStoredPiece() {
    if (this.storedPiece) {
      this.storedPieceContext.clearRect(
        0,
        0,
        this.storedPieceCanvas.width,
        this.storedPieceCanvas.height
      );
      this.drawPiece(
        this.storedPieceContext,
        this.storedPiece,
        { x: 0, y: 0 },
        TetrisGame.BLOCK_SIZE_PREVIEW
      );
    }
  }

  drawNextPiece() {
    if (this.nextPiece) {
      this.nextPieceContext.clearRect(
        0,
        0,
        this.nextPieceCanvas.width,
        this.nextPieceCanvas.height
      );
      this.drawPiece(
        this.nextPieceContext,
        this.nextPiece,
        { x: 0, y: 0 },
        TetrisGame.BLOCK_SIZE_PREVIEW
      );
    }
  }

  drawGrid() {
    for (let row = 0; row < TetrisGame.GRID_ROWS; row++) {
      for (let col = 0; col < TetrisGame.GRID_COLS; col++) {
        const cellValue = this.grid[row][col];
        this.context.fillStyle = PIECE_TYPES[cellValue];
        this.context.fillRect(
          col * TetrisGame.BLOCK_SIZE_MAIN,
          row * TetrisGame.BLOCK_SIZE_MAIN,
          TetrisGame.BLOCK_SIZE_MAIN,
          TetrisGame.BLOCK_SIZE_MAIN
        );
      }
    }
  }

  drawGhostPiece() {
    const ghostPosition = this.getGhostPosition();

    this.context.save();
    this.context.globalAlpha = 0.6;
    this.drawPiece(
      this.context,
      this.activePiece,
      ghostPosition,
      TetrisGame.BLOCK_SIZE_MAIN
    );
    this.context.restore();
  }
}
