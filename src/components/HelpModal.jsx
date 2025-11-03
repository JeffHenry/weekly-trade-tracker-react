import { X } from "lucide-react";

function HelpModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            How to Use Trade Tracker
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6 text-gray-700">
            <section>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Adding a Trade
              </h3>
              <p className="mb-2">Fill in the trade form with:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  <strong>Ticker:</strong> Stock symbol (e.g., AAPL, TSLA)
                </li>
                <li>
                  <strong>Entry Date:</strong> When you entered the trade
                </li>
                <li>
                  <strong>Entry Price:</strong> Price you bought at
                </li>
                <li>
                  <strong>Shares:</strong> Number of shares purchased
                </li>
                <li>
                  <strong>Stop Loss:</strong> Your exit price if trade goes
                  against you
                </li>
                <li>
                  <strong>Target Price:</strong> Your profit target
                </li>
                <li>
                  <strong>Risk Level:</strong> Stable or Aggressive
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Closing a Trade
              </h3>
              <p>
                Click the "Close" button on any open trade to record your exit
                price and date. The P&L will be automatically calculated.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Statistics
              </h3>
              <p className="mb-2">Track your performance with:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  <strong>Open Trades:</strong> Currently active positions
                </li>
                <li>
                  <strong>Closed Trades:</strong> Completed trades
                </li>
                <li>
                  <strong>Total P&L:</strong> Overall profit/loss
                </li>
                <li>
                  <strong>Win Rate:</strong> Percentage of profitable trades
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Performance Charts
              </h3>
              <p>View visual analytics including:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Monthly P&L trends</li>
                <li>Win/Loss distribution by month</li>
                <li>Best and worst performing tickers</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Import/Export
              </h3>
              <p className="mb-2">
                <strong>Export:</strong> Download your trades as a CSV file for
                backup or analysis in Excel/Google Sheets.
              </p>
              <p className="mb-2">
                <strong>Import:</strong> Upload a previously exported CSV file.
                You can choose to merge with existing trades or replace them
                entirely.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Data Storage
              </h3>
              <p>
                All trades are saved automatically to your browser's local
                storage. Your data persists between sessions but is specific to
                this browser.
              </p>
            </section>

            <section className="bg-gray-100 p-4 rounded-lg border border-gray-300">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                ⚠️ Important Notes
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-4 text-gray-700">
                <li>Data is stored locally in your browser only</li>
                <li>Clearing browser data will delete your trades</li>
                <li>Export regularly to backup your data</li>
                <li>This tool is for tracking only, not financial advice</li>
              </ul>
            </section>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all font-semibold"
          >
            Got It!
          </button>
        </div>
      </div>
    </div>
  );
}

export default HelpModal;
