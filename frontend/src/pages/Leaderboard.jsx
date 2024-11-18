import { useEffect, useState } from "react";

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: null });

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/scores");
        if (!response.ok) {
          throw new Error("Failed to fetch leaderboard data");
        }
        const data = await response.json();
        setLeaderboardData(data.scores);
        setStatus({ loading: false, error: null });
      } catch (err) {
        setStatus({ loading: false, error: err.message });
      }
    };

    fetchLeaderboardData();
  }, []);

  if (status.loading) {
    return (
      <p className="text-center text-gray-400 mt-10">Loading leaderboard...</p>
    );
  }

  if (status.error) {
    return (
      <p className="text-center text-red-400 mt-10">Error: {status.error}</p>
    );
  }

  return (
    <div className="container mx-auto p-4 bg-gray-800 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-white bg-gray-700 py-5 rounded-lg">
        Leaderboard
      </h1>
      <table className="w-full mt-6 bg-gray-700 border border-gray-600 rounded-lg overflow-hidden shadow-md">
        <thead>
          <tr className="bg-gray-600 text-gray-300 uppercase text-sm">
            <th className="py-4 px-6 text-left">Rank</th>
            <th className="py-4 px-6 text-left">Player</th>
            <th className="py-4 px-6 text-left">Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.length > 0 ? (
            leaderboardData.map((player, index) => (
              <tr
                key={index}
                className="border-b border-gray-600 hover:bg-gray-600"
              >
                <td className="py-4 px-6 text-gray-300">{index + 1}</td>
                <td className="py-4 px-6 text-gray-300">{player.player}</td>
                <td className="py-4 px-6 text-gray-300">{player.score}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="3"
                className="py-4 px-6 text-center text-gray-400"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;