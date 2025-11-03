import { useState } from "react";
import { X } from "lucide-react";

function CloseTradeModal({ trade, onClose, onConfirm }) {
  const [exitPrice, setExitPrice] = useState("");
  const [exitDate, setExitDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const calculatePL = () => {
    if (!exitPrice) return 0;
    return (parseFloat(exitPrice) - trade.entryPrice) * trade.shares;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(exitPrice, exitDate);
  };

  const pl = calculatePL();

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Close Trade</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-gray-600">Ticker:</div>
            <div className="font-semibold">{trade.ticker}</div>

            <div className="text-gray-600">Entry Price:</div>
            <div className="font-semibold">${trade.entryPrice.toFixed(2)}</div>

            <div className="text-gray-600">Shares:</div>
            <div className="font-semibold">{trade.shares}</div>

            <div className="text-gray-600">Entry Date:</div>
            <div className="font-semibold">{trade.entryDate}</div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700 font-medium">
              Exit Price
            </label>
            <input
              type="number"
              step="0.01"
              value={exitPrice}
              onChange={(e) => setExitPrice(e.target.value)}
              required
              className="w-full p-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-green-600 transition-colors"
              placeholder="0.00"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-gray-700 font-medium">
              Exit Date
            </label>
            <input
              type="date"
              value={exitDate}
              onChange={(e) => setExitDate(e.target.value)}
              required
              className="w-full p-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-green-600 transition-colors"
            />
          </div>

          {exitPrice && (
            <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-gray-600 text-sm mb-1">Projected P&L:</div>
              <div
                className={`text-2xl font-bold ${
                  pl >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {pl >= 0 ? "+" : ""}${pl.toFixed(2)}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all font-semibold"
            >
              Close Trade
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CloseTradeModal;
