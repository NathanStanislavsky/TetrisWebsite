// scoreRoutes.js
import { Router } from 'express';
import { submitNewScore, getLeaderboardData, deleteHighScore } from '../controllers/scoreControllers.js';

const router = Router();

// Handle score submissions (API)
router.post('/newScore', submitNewScore);

// Retrieve leaderboard data (API)
router.get('/scores', getLeaderboardData);

// delete a score
router.delete('/deleteScore', deleteHighScore);

export default router;