import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;