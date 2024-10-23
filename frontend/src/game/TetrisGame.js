export default class TetrisGame {
    constructor(canvas) {
      this.canvas = canvas;
      this.context = canvas.getContext('2d');
      this.grid = this.createGrid(20, 10); // Tetris grid 20x10
      this.activePiece = this.createPiece();
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
      const pieces = {
        I: [
          [0, 0, 0, 0],
          [1, 1, 1, 1],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ],
        J: [
          [1, 0, 0],
          [1, 1, 1],
          [0, 0, 0]
        ],
        L: [
          [0, 0, 1],
          [1, 1, 1],
          [0, 0, 0]
        ],
        O: [
          [1, 1],
          [1, 1]
        ],
        S: [
          [0, 1, 1],
          [1, 1, 0],
          [0, 0, 0]
        ],
        T: [
          [0, 1, 0],
          [1, 1, 1],
          [0, 0, 0]
        ],
        Z: [
          [1, 1, 0],
          [0, 1, 1],
          [0, 0, 0]
        ]
      };
    
      // Randomly select a piece from the pieces object
      const pieceNames = Object.keys(pieces);
      const randomPiece = pieceNames[Math.floor(Math.random() * pieceNames.length)];
      
      return pieces[randomPiece];
    }
  
    update() {
      // Update the game state
    }
  
    render() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawGrid();
    }
  
    drawGrid() {
      const blockSize = 30;
      for (let row = 0; row < this.grid.length; row++) {
        for (let col = 0; col < this.grid[row].length; col++) {
          this.context.fillStyle = this.grid[row][col] === 1 ? 'blue' : 'black';
          this.context.fillRect(col * blockSize, row * blockSize, blockSize, blockSize);
        }
      }
    }
  }