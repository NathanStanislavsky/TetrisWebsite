import { Router } from 'express';
import { getHomePage, getGamePage, getLeaderboardPage} from '../controllers/navigationControllers.js';

const router = Router();

// Serve the home page
router.get('/', getHomePage);

// Serve the game page
router.get('/play', getGamePage);

// Serve the leaderboard page
router.get('/leaderboard', getLeaderboardPage);

export default router;