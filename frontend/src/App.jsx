import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import Play from './pages/Play';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div className="App"
    style={{
      backgroundImage: `url('../tetrisBackground.webp')`,  // Path to your image
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
    }}
    >
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/play" element={<Play />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;