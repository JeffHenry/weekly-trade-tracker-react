import { useState } from "react";

function TradeForm({ onAddTrade }) {
  const [formData, setFormData] = useState({
    ticker: "",
    entryDate: new Date().toISOString().split("T")[0],
    entryPrice: "",
    shares: "",
    stopLoss: "",
    targetPrice: "",
    riskLevel: "STABLE",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTrade = {
      ...formData,
      entryPrice: parseFloat(formData.entryPrice),
      shares: parseInt(formData.shares),
      stopLoss: parseFloat(formData.stopLoss),
      targetPrice: parseFloat(formData.targetPrice),
      status: "OPEN",
      pl: 0,
      exitPrice: null,
      exitDate: null,
    };

    onAddTrade(newTrade);

    // Reset form
    setFormData({
      ticker: "",
      entryDate: new Date().toISOString().split("T")[0],
      entryPrice: "",
      shares: "",
      stopLoss: "",
      targetPrice: "",
      riskLevel: "STABLE",
    });
  };

  return (
    <div className="p-8 border-b border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-5">Add New Trade</h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
          <div className="flex flex-col">
            <label className="mb-1 text-gray-700 text-sm font-medium">
              Ticker
            </label>
            <input
              type="text"
              name="ticker"
              value={formData.ticker}
              onChange={handleChange}
              required
              className="p-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-green-600 transition-colors"
              placeholder="AAPL"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-700 text-sm font-medium">
              Entry Date
            </label>
            <input
              type="date"
              name="entryDate"
              value={formData.entryDate}
              onChange={handleChange}
              required
              className="p-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-green-600 transition-colors"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-700 text-sm font-medium">
              Entry Price
            </label>
            <input
              type="number"
              name="entryPrice"
              value={formData.entryPrice}
              onChange={handleChange}
              step="0.01"
              required
              className="p-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-green-600 transition-colors"
              placeholder="150.00"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-700 text-sm font-medium">
              Shares
            </label>
            <input
              type="number"
              name="shares"
              value={formData.shares}
              onChange={handleChange}
              required
              className="p-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-green-600 transition-colors"
              placeholder="10"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-700 text-sm font-medium">
              Stop Loss
            </label>
            <input
              type="number"
              name="stopLoss"
              value={formData.stopLoss}
              onChange={handleChange}
              step="0.01"
              required
              className="p-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-green-600 transition-colors"
              placeholder="145.00"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-700 text-sm font-medium">
              Target Price
            </label>
            <input
              type="number"
              name="targetPrice"
              value={formData.targetPrice}
              onChange={handleChange}
              step="0.01"
              required
              className="p-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-green-600 transition-colors"
              placeholder="160.00"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-700 text-sm font-medium">
              Risk Level
            </label>
            <select
              name="riskLevel"
              value={formData.riskLevel}
              onChange={handleChange}
              className="p-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-green-600 transition-colors"
            >
              <option value="STABLE">Stable</option>
              <option value="AGGRESSIVE">Aggressive</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-green-700 hover:shadow-lg transition-all"
        >
          Add Trade
        </button>
      </form>
    </div>
  );
}

export default TradeForm;
