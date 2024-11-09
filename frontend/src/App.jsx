import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import Play from './pages/Play';
import Navbar from './components/Navbar';

import tetrisBackground from './assets/tetrisBackground.webp';

const App = () => {
  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${tetrisBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
      }}
    >
      <BrowserRouter basename="/TetrisWebsite">
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