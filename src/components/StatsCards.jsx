import { useMemo } from "react";

function StatsCards({ trades }) {
  const stats = useMemo(() => {
    const openTrades = trades.filter((t) => t.status === "OPEN");
    const closedTrades = trades.filter((t) => t.status === "CLOSED");

    const totalPL = closedTrades.reduce((sum, t) => sum + (t.pl || 0), 0);
    const wins = closedTrades.filter((t) => t.pl > 0).length;
    const losses = closedTrades.filter((t) => t.pl < 0).length;
    const winRate =
      closedTrades.length > 0
        ? ((wins / closedTrades.length) * 100).toFixed(1)
        : 0;

    return {
      openTrades: openTrades.length,
      closedTrades: closedTrades.length,
      totalPL,
      winRate,
      wins,
      losses,
    };
  }, [trades]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-8 bg-gray-50">
      <div className="bg-white p-5 rounded-lg shadow-md text-center border border-gray-200">
        <div className="text-gray-600 text-sm mb-2">Open Trades</div>
        <div className="text-3xl font-bold text-gray-900">
          {stats.openTrades}
        </div>
      </div>

      <div className="bg-white p-5 rounded-lg shadow-md text-center border border-gray-200">
        <div className="text-gray-600 text-sm mb-2">Closed Trades</div>
        <div className="text-3xl font-bold text-gray-900">
          {stats.closedTrades}
        </div>
      </div>

      <div className="bg-white p-5 rounded-lg shadow-md text-center border border-gray-200">
        <div className="text-gray-600 text-sm mb-2">Total P&L</div>
        <div
          className={`text-3xl font-bold ${
            stats.totalPL >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          ${stats.totalPL.toFixed(2)}
        </div>
      </div>

      <div className="bg-white p-5 rounded-lg shadow-md text-center border border-gray-200">
        <div className="text-gray-600 text-sm mb-2">Win Rate</div>
        <div
          className={`text-3xl font-bold ${
            parseFloat(stats.winRate) >= 50 ? "text-green-600" : "text-red-600"
          }`}
        >
          {stats.winRate}%
        </div>
      </div>
    </div>
  );
}

export default StatsCards;
