import { Router } from 'express';
import PlayerScore from '../models/scores.js'; // Change require to import

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
router.post("/newScore", async (req, res) => {
  const { player, score, date } = req.body;  // Extract player, score, and date from the request body

  try {
    // Create a new score entry in the database
    const newScore = await PlayerScore.create({ player, score, date });
    
    // Send a success response with the new score
    res.status(200).json(newScore);
  } catch (error) {
    // Handle errors
    res.status(400).json({ error: error.message });
  }
});

// Retrieve leaderboard data (API)
router.get("/api/scores", async (req, res) => {
  try {
    const scores = await PlayerScore.find().sort({ score: -1 }).limit(10); // Fetch scores from database
    res.status(200).json({ message: "Leaderboard data fetched successfully!", scores });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Export the router as default
export default router;