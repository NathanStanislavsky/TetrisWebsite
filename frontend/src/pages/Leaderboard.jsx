import { useEffect, useState } from 'react';

const Leaderboard = () => {
  // State to store leaderboard data
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch leaderboard data when the component mounts
  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await fetch('http://localhost:3000/scores');
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard data');
        }
        const data = await response.json();
        setLeaderboardData(data.scores);  // Assuming your API response has a `scores` array
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, []); // Empty dependency array ensures this only runs once on component mount

  // Show a loading message while data is being fetched
  if (loading) {
    return <p className="text-center">Loading leaderboard...</p>;
  }

  // Show an error message if fetching fails
  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-4xl font-bold text-center mb-8">Leaderboard</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
            <th className="py-3 px-4 text-left">Rank</th>
            <th className="py-3 px-4 text-left">Player</th>
            <th className="py-3 px-4 text-left">Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((player, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="py-3 px-4">{index + 1}</td> {/* Index as rank */}
              <td className="py-3 px-4">{player.player}</td> {/* Assuming `player` is the player's name */}
              <td className="py-3 px-4">{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;