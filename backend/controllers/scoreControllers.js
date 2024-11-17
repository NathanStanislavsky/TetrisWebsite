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
    // Find the player score with the smallest score
    const smallestHighScore = await PlayerScore.findOne().sort({ score: 1 });

    // If no scores exist, return a 404 error
    if (!smallestHighScore) {
      return res.status(404).json({ message: "No scores to delete" });
    }

    // Delete the smallest score
    const deletedHighScore = await PlayerScore.findByIdAndDelete(smallestHighScore._id);

    // Return success response
    res.status(200).json({ 
      message: "Smallest score deleted successfully", 
      deletedHighScore 
    });
  } catch (error) {
    console.error("Error deleting smallest score:", error);
    res.status(500).json({ 
      message: "An error occurred while deleting the smallest score", 
      error: error.message || error 
    });
  }
};

export const getSmallestScore = async (req, res) => {
  try {
    // Find the score with the smallest value
    const smallestHighScore = await PlayerScore.findOne().sort({ score: 1 });

    // Check if any score exists in the database
    if (!smallestHighScore) {
      return res.status(404).json({ message: "No scores found" });
    }

    // Return the smallest score
    res.status(200).json({
      message: "Smallest score retrieved successfully",
      smallestHighScore,
    });
  } catch (error) {
    console.error("Error retrieving smallest score:", error);
    res.status(500).json({
      message: "An error occurred while retrieving the smallest score",
      error: error.message || error,
    });
  }
};