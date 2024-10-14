const Leaderboard = () => {
  // Sample leaderboard data (can be replaced with actual data from an API)
  const leaderboardData = [
    { rank: 1, name: 'Player1', score: 1500 },
    { rank: 2, name: 'Player2', score: 1400 },
    { rank: 3, name: 'Player3', score: 1300 },
    { rank: 4, name: 'Player4', score: 1200 },
    { rank: 5, name: 'Player5', score: 1100 },
  ];

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
          {leaderboardData.map((player) => (
            <tr key={player.rank} className="border-b border-gray-200">
              <td className="py-3 px-4">{player.rank}</td>
              <td className="py-3 px-4">{player.name}</td>
              <td className="py-3 px-4">{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;