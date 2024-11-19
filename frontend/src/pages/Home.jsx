const Home = () => {
  return (
    <div className="bg-slate-800 w-9/12 h-[75vh] mx-auto my-auto flex mt-8 p-8 text-white">
      <div>
        Objective: Create horizontal lines of blocks without gaps. When a line is completely filled, it clears, and you earn points.
      </div>
      <div>
      Controls: 
      Move Left: Use the left arrow key or swipe left.
      Move Right: Use the right arrow key or swipe right.
      Rotate: Use the up arrow key to rotate the piece.
      Soft Drop: Use the down arrow key to move the piece down faster.
      Hard Drop: Press the spacebar to drop the piece instantly.
      </div>
      <div>
      Gameplay: 
      Pieces (called Tetrominoes) will fall from the top of the screen.
      Position the Tetrominoes to fill horizontal lines.
      Clearing multiple lines at once earns more points (e.g., a “Tetris” clears four lines).
      </div>
      <div>
      End of the Game:
      The game ends when the pieces stack up and reach the top of the screen.
      Try to score as many points as possible before the game ends!
      </div>
    </div>
  );
};

export default Home;