import { Router } from 'express';
import { getHomePage, getGamePage, getLeaderboardPage, submitNewScore, getLeaderboardData } from '../controllers/scoreControllers.js';

const router = Router();

// Serve the home page
router.get('/', getHomePage);

// Serve the game page
router.get('/play', getGamePage);

// Serve the leaderboard page
router.get('/leaderboard', getLeaderboardPage);

// Handle score submissions (API)
router.post('/newScore', submitNewScore);

// Retrieve leaderboard data (API)
router.get('/api/scores', getLeaderboardData);

export default router;