import { Router } from 'express';

const router = Router();

// Serve the home page
router.get('/', (req, res) => {
    res.json({ message: 'Welcome to Tetris! Click "Play" to start.' });
});

// Serve the game page
router.get("/play", (req, res) => {
  res.json({ message: "This is where the Tetris game will load." });
});

// Serve the leaderboard page
router.get("/leaderboard", (req, res) => {
  res.json({ message: "Leaderboard will be displayed here." });
});

// Handle score submissions (API)
router.post("/api/scores", (req, res) => {
  const { player, score } = req.body;
  res.status(200).json({ message: "Score submitted successfully!", player, score });
});

// Retrieve leaderboard data (API)
router.get("/api/scores", (req, res) => {
  const scores = [
    { player: "Player1", score: 1000 },
    { player: "Player2", score: 900 },
  ];
  res.json({ message: "Leaderboard data fetched successfully!", scores });
});

// Export the router as default
export default router;