import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="bg-white">
      <div className="container mx-auto w-full max-w-none p-4 h-32 flex items-center justify-start space-x-8 bg-red-300">
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-green-500 to-red-500">
          Tetris
        </h1>
        <Link to="/play" className="text-white no-underline">
          <h1 className="text-3xl">Play</h1>
        </Link>
        <Link to="/leaderboard" className="text-white no-underline">
          <h1 className="text-3xl">Leaderboard</h1>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;