import React from "react";

const Navbar = ({
  mode,
  setMode,
  generateArray,
  handleSort,
  speed,
  setSpeed,
  selectedAlgo,
  setSelectedAlgo,
  target,
  setTarget,
  selectedSearchAlgo,
  setSelectedSearchAlgo,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between px-4 py-4 bg-white shadow-md gap-4">
      <img
        className="w-40 mx-auto sm:mx-0"
        src="https://felix-petersen.github.io/algovision-docs/_images/algovision_logo.png"
        alt="Algo Vision"
      />

      <div className="flex flex-wrap gap-3 justify-center sm:justify-end items-center">
        {/* 🟦 Mode Switch */}
        <div className="flex gap-2">
          <button
            onClick={() => setMode("sort")}
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              mode === "sort"
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Sorting
          </button>
          <button
            onClick={() => setMode("search")}
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              mode === "search"
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Searching
          </button>
        </div>

        {/* 🧮 Sorting Dropdown */}
        {mode === "sort" && (
          <select
            value={selectedAlgo}
            onChange={(e) => setSelectedAlgo(e.target.value)}
            className="px-2 py-2 border-2 border-green-400 text-green-700 rounded w-40"
          >
            <option value="bubble">Bubble Sort</option>
            <option value="selection">Selection Sort</option>
            <option value="insertion">Insertion Sort</option>
            <option value="merge">Merge Sort</option>
            <option value="quick">Quick Sort</option>
            <option value="heap">Heap Sort</option>
          </select>
        )}

        {/* 🔍 Search Options */}
        {mode === "search" && (
          <>
            <select
              value={selectedSearchAlgo}
              onChange={(e) => setSelectedSearchAlgo(e.target.value)}
              className="px-2 py-2 border-2 border-green-400 text-green-700 rounded w-36"
            >
              <option value="linear">Linear Search</option>
              <option value="binary">Binary Search</option>
            </select>

            <input
              type="number"
              value={target}
              onChange={(e) => setTarget(Number(e.target.value))}
              placeholder="Enter target"
              className="px-3 py-2 border-2 border-green-400 text-green-700 rounded w-32"
            />
          </>
        )}

        {/* 🔁 Buttons */}
        <button
          onClick={generateArray}
          className="px-4 py-2 text-green-700 border-2 border-green-400 hover:bg-green-400 hover:text-white rounded text-sm"
        >
          Generate
        </button>
        <button
          onClick={handleSort}
          className="px-4 py-2 text-green-700 border-2 border-green-400 hover:bg-green-400 hover:text-white rounded text-sm"
        >
          {mode === "sort" ? "Sort" : "Search"}
        </button>

        {/* ⚡ Speed Slider */}
        <div className="flex flex-col items-center text-sm">
          <label htmlFor="speed" className="mb-1">
            Speed
          </label>
          <input
            type="range"
            id="speed"
            min="10"
            max="500"
            step="10"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-24"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
