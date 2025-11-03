import { useState, useEffect } from "react";
import Header from "./components/Header";
import StatsCards from "./components/StatsCards";
import TradeForm from "./components/TradeForm";
import TradesTable from "./components/TradesTable";
import CloseTradeModal from "./components/CloseTradeModal";
import HelpModal from "./components/HelpModal";
import PerformanceCharts from "./components/PerformanceCharts";

function App() {
  const [trades, setTrades] = useState([]);
  const [tradeToClose, setTradeToClose] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  // Load trades from localStorage on mount
  useEffect(() => {
    const savedTrades = localStorage.getItem("trades");
    if (savedTrades) {
      try {
        setTrades(JSON.parse(savedTrades));
      } catch (error) {
        console.error("Error loading trades:", error);
      }
    }
  }, []);

  // Save trades to localStorage whenever they change
  useEffect(() => {
    if (trades.length > 0) {
      localStorage.setItem("trades", JSON.stringify(trades));
    }
  }, [trades]);

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  const addTrade = (newTrade) => {
    setTrades([...trades, { ...newTrade, id: Date.now() }]);
    showMessage("Trade added successfully!");
  };

  const openCloseTradeModal = (trade) => {
    setTradeToClose(trade);
  };

  const closeTradeModal = () => {
    setTradeToClose(null);
  };

  const closeTrade = (exitPrice, exitDate) => {
    const updatedTrades = trades.map((trade) => {
      if (trade.id === tradeToClose.id) {
        const pl = (exitPrice - trade.entryPrice) * trade.shares;
        return {
          ...trade,
          exitPrice: parseFloat(exitPrice),
          exitDate,
          status: "CLOSED",
          pl,
        };
      }
      return trade;
    });
    setTrades(updatedTrades);
    showMessage("Trade closed successfully!");
    closeTradeModal();
  };

  const deleteTrade = (id) => {
    if (window.confirm("Are you sure you want to delete this trade?")) {
      setTrades(trades.filter((trade) => trade.id !== id));
      showMessage("Trade deleted successfully!");
    }
  };

  const resetAllTrades = () => {
    if (
      window.confirm(
        "Are you sure you want to delete ALL trades? This cannot be undone!"
      )
    ) {
      setTrades([]);
      localStorage.removeItem("trades");
      showMessage("All trades have been reset!");
    }
  };

  const exportCSV = () => {
    if (trades.length === 0) {
      showMessage("No trades to export", "error");
      return;
    }

    const headers =
      "Ticker,Entry Date,Entry Price,Shares,Stop Loss,Target,Exit Price,Exit Date,P&L,Status,Risk Level";
    const rows = trades.map(
      (t) =>
        `${t.ticker},${t.entryDate},${t.entryPrice},${t.shares},${t.stopLoss},${
          t.targetPrice
        },${t.exitPrice || ""},${t.exitDate || ""},${t.pl},${t.status},${
          t.riskLevel
        }`
    );

    const csv = [headers, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `trades_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    showMessage("Trades exported successfully!");
  };

  const importCSV = (csv) => {
    try {
      const lines = csv.split("\n").filter((line) => line.trim());

      if (lines.length < 2) {
        showMessage("CSV file is empty or invalid", "error");
        return;
      }

      const expectedHeader =
        "Ticker,Entry Date,Entry Price,Shares,Stop Loss,Target,Exit Price,Exit Date,P&L,Status,Risk Level";
      if (lines[0].trim() !== expectedHeader) {
        showMessage(
          "CSV format does not match. Please use a file exported from this site.",
          "error"
        );
        return;
      }

      const importedTrades = [];
      for (let i = 1; i < lines.length; i++) {
        const fields = lines[i].split(",").map((f) => f.trim());
        if (fields.length === 11) {
          const [
            ticker,
            entryDate,
            entryPrice,
            shares,
            stopLoss,
            targetPrice,
            exitPrice,
            exitDate,
            pl,
            status,
            riskLevel,
          ] = fields;
          importedTrades.push({
            id: Date.now() + Math.random(),
            ticker,
            entryDate,
            entryPrice: parseFloat(entryPrice),
            shares: parseInt(shares),
            stopLoss: parseFloat(stopLoss),
            targetPrice: parseFloat(targetPrice),
            exitPrice: exitPrice ? parseFloat(exitPrice) : null,
            exitDate: exitDate || null,
            status,
            pl: parseFloat(pl),
            riskLevel,
          });
        }
      }

      if (importedTrades.length === 0) {
        showMessage("No valid trades found in CSV", "error");
        return;
      }

      const merge = window.confirm(
        `Found ${importedTrades.length} trades in CSV.\n\nClick OK to MERGE with existing trades (${trades.length})\nClick Cancel to REPLACE all existing trades`
      );

      if (merge) {
        setTrades([...trades, ...importedTrades]);
      } else {
        setTrades(importedTrades);
      }

      showMessage(`Successfully imported ${importedTrades.length} trades!`);
    } catch (error) {
      showMessage("Failed to import CSV: " + error.message, "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <Header
          onHelp={() => setShowHelp(true)}
          onExport={exportCSV}
          onImport={importCSV}
          onReset={resetAllTrades}
        />

        {message.text && (
          <div
            className={`mx-8 mt-4 p-4 rounded-lg ${
              message.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        <StatsCards trades={trades} />
        <TradeForm onAddTrade={addTrade} />
        <TradesTable
          trades={trades}
          onCloseTrade={openCloseTradeModal}
          onDeleteTrade={deleteTrade}
        />
        <PerformanceCharts trades={trades} />

        {tradeToClose && (
          <CloseTradeModal
            trade={tradeToClose}
            onClose={closeTradeModal}
            onConfirm={closeTrade}
          />
        )}

        {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
      </div>
    </div>
  );
}

export default App;
