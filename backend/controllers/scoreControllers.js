import PlayerScore from "../models/scores.js";

// Handle score submissions
export const submitNewScore = async (req, res) => {
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
};

// Retrieve leaderboard data
export const getLeaderboardData = async (req, res) => {
  try {
    const scores = await PlayerScore.find().sort({ score: -1 }).limit(10); // Fetch top 10 scores
    res.status(200).json({ message: "Leaderboard data fetched successfully!", scores });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteHighScore = async (req, res) => {
  try {
    const smallestHighScore = await HighScore.findOne().sort({ score: 1 });

    if (!smallestHighScore) {
      return res.status(404).json({ message: "No high scores to delete" });
    }

    // Delete the smallest high score
    const deletedHighScore = await HighScore.findByIdAndDelete(smallestHighScore._id);

    // Return success response
    res.status(200).json({ 
      message: "Smallest high score deleted successfully", 
      deletedHighScore 
    });
  } catch (error) {
    // Handle errors and send a server error response
    console.error("Error deleting smallest high score:", error);
    res.status(500).json({ 
      message: "An error occurred while deleting the smallest high score", 
      error 
    });
  }
};