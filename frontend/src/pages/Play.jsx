export const Play = () => {
  return (
    <div className="play-page container mx-auto mt-10">
      <h1 className="text-4xl font-bold text-center mb-8">Tetris Game</h1>
      
      <div className="game-container bg-gray-200 p-8 rounded-lg shadow-lg text-center">
        {/* Placeholder for the Tetris Game */}
        <p className="text-lg mb-4">This is where the Tetris game will load.</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Start Game
        </button>
      </div>
    </div>
  );
};

export default Play;