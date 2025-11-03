import { HelpCircle, Download, Upload, RotateCcw } from "lucide-react";

function Header({ onHelp, onExport, onImport, onReset }) {
  const handleImportClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".csv";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          onImport(event.target.result);
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <div className="bg-white p-8 text-center border-b border-gray-200 relative">
      <button
        onClick={onHelp}
        className="absolute top-8 right-8 p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        title="Help"
      >
        <HelpCircle size={24} />
      </button>

      <h1 className="text-4xl font-bold text-gray-900 mb-2">Trade Tracker</h1>
      <p className="text-gray-600 mb-6">
        Track and analyze your trading performance
      </p>

      <div className="flex justify-center gap-4 flex-wrap">
        <button
          onClick={onExport}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Download size={18} />
          Export CSV
        </button>

        <button
          onClick={handleImportClick}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
        >
          <Upload size={18} />
          Import CSV
        </button>

        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <RotateCcw size={18} />
          Reset All
        </button>
      </div>
    </div>
  );
}

export default Header;
