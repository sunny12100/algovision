import React from "react";

const Navbar = ({
  generateArray,
  handleSort,
  speed,
  setSpeed,
  selectedAlgo,
  setSelectedAlgo,
}) => {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <h1 className="text-2xl font-bold">Algo Vision </h1>
      <div className="flex items-center gap-4 flex-wrap">
        <select
          value={selectedAlgo}
          onChange={(e) => setSelectedAlgo(e.target.value)}
          className="px-2 py-2  border-2 border-green-400 text-green-700 rounded"
        >
          <option value="bubble">Bubble Sort</option>
          <option value="selection">Selection Sort</option>
          <option value="insertion">Insertion Sort</option>
          <option value="merge">Merge Sort</option>
        </select>
        <button
          onClick={generateArray}
          className="px-4 py-2 text-green-700 border-2 border-green-400 hover:bg-green-400 hover:text-white rounded"
        >
          Generate New Array
        </button>
        <button
          onClick={handleSort}
          className="px-4 py-2 text-green-700 border-2 border-green-400 hover:bg-green-400 hover:text-white rounded"
        >
          Start Sort
        </button>
        <div className="flex flex-col text-sm items-center">
          <label htmlFor="speed">Speed</label>
          <input
            type="range"
            id="speed"
            min="10"
            max="500"
            step="10"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-[120px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
