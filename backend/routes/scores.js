// scoreRoutes.js
import { Router } from 'express';
import { submitNewScore, getLeaderboardData } from '../controllers/scoreControllers.js';

const router = Router();

// Handle score submissions (API)
router.post('/newScore', submitNewScore);

// Retrieve leaderboard data (API)
router.get('/scores', getLeaderboardData);

export default router;