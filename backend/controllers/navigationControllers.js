// Serve the home page
export const getHomePage = (req, res) => {
  res.json({ message: 'Welcome to Tetris! Click "Play" to start.' });
};

// Serve the game page
export const getGamePage = (req, res) => {
  res.json({ message: "This is where the Tetris game will load." });
};

// Serve the leaderboard page
export const getLeaderboardPage = (req, res) => {
  res.json({ message: "Leaderboard will be displayed here." });
};
