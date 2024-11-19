const Home = () => {
  return (
    <div className="bg-slate-800 w-9/12 h-[75vh] mx-auto my-auto flex flex-col mt-8 p-8 text-white space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Objective</h2>
        <p>
          Create horizontal lines of blocks without gaps. When a line is completely filled, it clears, and you earn points.
        </p>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Controls</h2>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Move Left:</strong> Use the left arrow key.</li>
          <li><strong>Move Right:</strong> Use the right arrow key.</li>
          <li><strong>Rotate:</strong> Use the up arrow key to rotate the piece.</li>
          <li><strong>Soft Drop:</strong> Use the down arrow key to move the piece down faster.</li>
          <li><strong>Hard Drop:</strong> Press the spacebar to drop the piece instantly.</li>
          <li><strong>Store Piece:</strong> Press the shift to store the current piece instantly.</li>
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Gameplay</h2>
        <p>
          Pieces (called Tetrominoes) will fall from the top of the screen. Position the Tetrominoes to fill horizontal lines. Clearing multiple lines at once earns more points (e.g., a “Tetris” clears four lines).
        </p>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">End of the Game</h2>
        <p>
          The game ends when the pieces stack up and reach the top of the screen. Try to score as many points as possible before the game ends!
        </p>
      </div>
    </div>
  );
};

export default Home;