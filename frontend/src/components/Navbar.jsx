import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className="bg-white">
      <div className="container mx-auto max-w-[1400px] p-4 flex items-center justify-between">
        <Link to="/" className="text-gray-800 no-underline">
          <h1 className="font-bold text-4xl">Tetris</h1>
        </Link>
      </div>
    </header>
  )
}

export default Navbar