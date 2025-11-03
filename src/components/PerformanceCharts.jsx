import { useMemo, useEffect, useRef } from "react";

function PerformanceCharts({ trades }) {
  const plChartRef = useRef(null);
  const winLossChartRef = useRef(null);

  const closedTrades = useMemo(
    () => trades.filter((t) => t.status === "CLOSED"),
    [trades]
  );

  const tickerPerformance = useMemo(() => {
    const tickerPL = {};
    closedTrades.forEach((trade) => {
      if (!tickerPL[trade.ticker]) {
        tickerPL[trade.ticker] = 0;
      }
      tickerPL[trade.ticker] += trade.pl;
    });

    const sorted = Object.entries(tickerPL).sort((a, b) => b[1] - a[1]);
    const winners = sorted.filter(([, pl]) => pl > 0).slice(0, 3);
    const losers = sorted.filter(([, pl]) => pl < 0).slice(0, 3);

    return { winners, losers };
  }, [closedTrades]);

  useEffect(() => {
    if (closedTrades.length === 0) return;

    // Draw P&L Chart
    const plCanvas = plChartRef.current;
    if (!plCanvas) return;

    const plCtx = plCanvas.getContext("2d");
    const plWidth = plCanvas.width;
    const plHeight = plCanvas.height;
    const padding = 50;

    // Clear canvas
    plCtx.clearRect(0, 0, plWidth, plHeight);

    // Organize data by month
    const monthData = {};
    closedTrades.forEach((trade) => {
      const date = new Date(trade.exitDate);
      const monthKey = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;
      if (!monthData[monthKey]) {
        monthData[monthKey] = 0;
      }
      monthData[monthKey] += trade.pl;
    });

    const months = Object.keys(monthData).sort();
    if (months.length === 0) return;

    const values = months.map((m) => monthData[m]);
    const maxPL = Math.max(...values.map(Math.abs), 100);

    // Draw axes
    plCtx.strokeStyle = "#666";
    plCtx.lineWidth = 2;
    plCtx.beginPath();
    plCtx.moveTo(padding, padding);
    plCtx.lineTo(padding, plHeight - padding);
    plCtx.lineTo(plWidth - padding, plHeight - padding);
    plCtx.stroke();

    // Draw zero line
    const zeroY = plHeight / 2;
    plCtx.strokeStyle = "#999";
    plCtx.lineWidth = 1;
    plCtx.setLineDash([5, 5]);
    plCtx.beginPath();
    plCtx.moveTo(padding, zeroY);
    plCtx.lineTo(plWidth - padding, zeroY);
    plCtx.stroke();
    plCtx.setLineDash([]);

    // Draw bars
    const barWidth = (plWidth - 2 * padding) / months.length;
    months.forEach((month, i) => {
      const pl = monthData[month];
      const x = padding + i * barWidth;
      const barHeight = (Math.abs(pl) / maxPL) * (plHeight / 2 - padding);

      plCtx.fillStyle = pl >= 0 ? "#10b981" : "#ef4444";

      if (pl >= 0) {
        plCtx.fillRect(
          x + barWidth * 0.1,
          zeroY - barHeight,
          barWidth * 0.8,
          barHeight
        );
      } else {
        plCtx.fillRect(x + barWidth * 0.1, zeroY, barWidth * 0.8, barHeight);
      }

      // Draw month label
      plCtx.fillStyle = "#666";
      plCtx.font = "11px sans-serif";
      plCtx.textAlign = "center";
      plCtx.fillText(month.slice(5), x + barWidth / 2, plHeight - padding + 20);
    });

    // Draw title
    plCtx.fillStyle = "#333";
    plCtx.font = "bold 14px sans-serif";
    plCtx.textAlign = "center";
    plCtx.fillText("Monthly P&L", plWidth / 2, 20);
  }, [closedTrades]);

  useEffect(() => {
    if (closedTrades.length === 0) return;

    // Draw Win/Loss Chart
    const wlCanvas = winLossChartRef.current;
    if (!wlCanvas) return;

    const wlCtx = wlCanvas.getContext("2d");
    const wlWidth = wlCanvas.width;
    const wlHeight = wlCanvas.height;
    const padding = 50;

    // Clear canvas
    wlCtx.clearRect(0, 0, wlWidth, wlHeight);

    // Organize data by month
    const monthData = {};
    closedTrades.forEach((trade) => {
      const date = new Date(trade.exitDate);
      const monthKey = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;
      if (!monthData[monthKey]) {
        monthData[monthKey] = { wins: 0, losses: 0 };
      }
      if (trade.pl > 0) {
        monthData[monthKey].wins++;
      } else if (trade.pl < 0) {
        monthData[monthKey].losses++;
      }
    });

    const months = Object.keys(monthData).sort();
    if (months.length === 0) return;

    const maxCount = Math.max(
      ...months.map((m) => Math.max(monthData[m].wins, monthData[m].losses)),
      1
    );

    // Draw axes
    wlCtx.strokeStyle = "#666";
    wlCtx.lineWidth = 2;
    wlCtx.beginPath();
    wlCtx.moveTo(padding, padding);
    wlCtx.lineTo(padding, wlHeight - padding);
    wlCtx.lineTo(wlWidth - padding, wlHeight - padding);
    wlCtx.stroke();

    // Draw bars
    const barWidth = (wlWidth - 2 * padding) / (months.length * 2);
    months.forEach((month, i) => {
      const x = padding + (i + 0.5) * ((wlWidth - 2 * padding) / months.length);
      const wins = monthData[month].wins;
      const losses = monthData[month].losses;
      const chartHeight = wlHeight - 2 * padding;

      const winHeight = (wins / maxCount) * chartHeight;
      wlCtx.fillStyle = "#10b981";
      wlCtx.fillRect(
        x - barWidth,
        wlHeight - padding - winHeight,
        barWidth * 0.8,
        winHeight
      );

      const lossHeight = (losses / maxCount) * chartHeight;
      wlCtx.fillStyle = "#ef4444";
      wlCtx.fillRect(
        x + barWidth * 0.2,
        wlHeight - padding - lossHeight,
        barWidth * 0.8,
        lossHeight
      );

      // Draw month label
      wlCtx.fillStyle = "#666";
      wlCtx.font = "11px sans-serif";
      wlCtx.textAlign = "center";
      wlCtx.fillText(month.slice(5), x, wlHeight - padding + 20);
    });

    // Draw legend
    wlCtx.fillStyle = "#10b981";
    wlCtx.fillRect(wlWidth - padding - 100, padding, 15, 15);
    wlCtx.fillStyle = "#666";
    wlCtx.font = "12px sans-serif";
    wlCtx.textAlign = "left";
    wlCtx.fillText("Wins", wlWidth - padding - 80, padding + 12);

    wlCtx.fillStyle = "#ef4444";
    wlCtx.fillRect(wlWidth - padding - 100, padding + 25, 15, 15);
    wlCtx.fillText("Losses", wlWidth - padding - 80, padding + 37);

    // Draw title
    wlCtx.fillStyle = "#333";
    wlCtx.font = "bold 14px sans-serif";
    wlCtx.textAlign = "center";
    wlCtx.fillText("Win/Loss by Month", wlWidth / 2, 20);
  }, [closedTrades]);

  if (closedTrades.length === 0) {
    return (
      <div className="p-8 bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-800 mb-5">
          Performance Analytics
        </h2>
        <div className="text-center py-12 text-gray-500">
          Close some trades to see performance analytics
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-800 mb-5">
        Performance Analytics
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <canvas
            ref={plChartRef}
            width="500"
            height="300"
            className="w-full"
          />
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <canvas
            ref={winLossChartRef}
            width="500"
            height="300"
            className="w-full"
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Ticker Performance
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-green-600 mb-3">
              Top Performers
            </h4>
            {tickerPerformance.winners.length > 0 ? (
              <ul className="space-y-2">
                {tickerPerformance.winners.map(([ticker, pl]) => (
                  <li
                    key={ticker}
                    className="flex justify-between items-center p-3 bg-green-50 rounded-lg"
                  >
                    <span className="font-semibold text-gray-800">
                      {ticker}
                    </span>
                    <span className="text-green-600 font-bold">
                      +${pl.toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No winners yet</p>
            )}
          </div>

          <div>
            <h4 className="font-semibold text-red-600 mb-3">
              Worst Performers
            </h4>
            {tickerPerformance.losers.length > 0 ? (
              <ul className="space-y-2">
                {tickerPerformance.losers.map(([ticker, pl]) => (
                  <li
                    key={ticker}
                    className="flex justify-between items-center p-3 bg-red-50 rounded-lg"
                  >
                    <span className="font-semibold text-gray-800">
                      {ticker}
                    </span>
                    <span className="text-red-600 font-bold">
                      ${pl.toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No losers yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PerformanceCharts;
