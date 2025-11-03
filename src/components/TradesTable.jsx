import { Trash2 } from "lucide-react";

function TradesTable({ trades, onCloseTrade, onDeleteTrade }) {
  if (trades.length === 0) {
    return (
      <div className="p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Your Trades</h2>
        <div className="text-center py-12 text-gray-500">
          No trades yet. Add your first trade above!
        </div>
      </div>
    );
  }

  // Sort trades by entry date - newest first
  const sortedTrades = [...trades].sort((a, b) => {
    const dateA = new Date(a.entryDate);
    const dateB = new Date(b.entryDate);
    return dateB - dateA; // Descending order (newest first)
  });

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-5">Your Trades</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr>
              <th className="bg-gray-50 p-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200">
                Ticker
              </th>
              <th className="bg-gray-50 p-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200">
                Entry Date
              </th>
              <th className="bg-gray-50 p-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200">
                Entry Price
              </th>
              <th className="bg-gray-50 p-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200">
                Shares
              </th>
              <th className="bg-gray-50 p-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200">
                Stop Loss
              </th>
              <th className="bg-gray-50 p-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200">
                Target
              </th>
              <th className="bg-gray-50 p-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200">
                Exit Price
              </th>
              <th className="bg-gray-50 p-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200">
                Exit Date
              </th>
              <th className="bg-gray-50 p-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200">
                P&L
              </th>
              <th className="bg-gray-50 p-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200">
                Status
              </th>
              <th className="bg-gray-50 p-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200">
                Risk
              </th>
              <th className="bg-gray-50 p-3 text-left font-semibold text-gray-700 border-b-2 border-gray-200">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedTrades.map((trade) => (
              <tr key={trade.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-3 border-b border-gray-200 font-medium">
                  {trade.ticker}
                </td>
                <td className="p-3 border-b border-gray-200">
                  {trade.entryDate}
                </td>
                <td className="p-3 border-b border-gray-200">
                  ${trade.entryPrice.toFixed(2)}
                </td>
                <td className="p-3 border-b border-gray-200">{trade.shares}</td>
                <td className="p-3 border-b border-gray-200">
                  ${trade.stopLoss.toFixed(2)}
                </td>
                <td className="p-3 border-b border-gray-200">
                  ${trade.targetPrice.toFixed(2)}
                </td>
                <td className="p-3 border-b border-gray-200">
                  {trade.exitPrice ? `$${trade.exitPrice.toFixed(2)}` : "-"}
                </td>
                <td className="p-3 border-b border-gray-200">
                  {trade.exitDate || "-"}
                </td>
                <td className="p-3 border-b border-gray-200">
                  <span
                    className={`font-semibold ${
                      trade.pl > 0
                        ? "text-green-600"
                        : trade.pl < 0
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                  >
                    {trade.pl > 0 ? "+" : ""}${trade.pl.toFixed(2)}
                  </span>
                </td>
                <td className="p-3 border-b border-gray-200">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      trade.status === "OPEN"
                        ? "bg-gray-200 text-gray-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {trade.status}
                  </span>
                </td>
                <td className="p-3 border-b border-gray-200">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      trade.riskLevel === "STABLE"
                        ? "bg-gray-200 text-gray-800"
                        : "bg-gray-700 text-white"
                    }`}
                  >
                    {trade.riskLevel}
                  </span>
                </td>
                <td className="p-3 border-b border-gray-200">
                  <div className="flex gap-2">
                    {trade.status === "OPEN" && (
                      <button
                        onClick={() => onCloseTrade(trade)}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
                      >
                        Close
                      </button>
                    )}
                    <button
                      onClick={() => onDeleteTrade(trade.id)}
                      className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TradesTable;
