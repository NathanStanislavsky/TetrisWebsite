import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="bg-white">
      <div className="container mx-auto w-full max-w-none p-4 h-32 flex items-center justify-start space-x-8 bg-slate-900">
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-green-500 to-red-500">
          Tetris
        </h1>
        <Link
          to="/play"
          className="text-white no-underline text-3xl py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-blue-500"
        >
          Play
        </Link>
        <Link
          to="/leaderboard"
          className="text-white no-underline text-3xl py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-blue-500"
        >
          Leaderboard
        </Link>
      </div>
    </header>
  );
};

export default Navbar;