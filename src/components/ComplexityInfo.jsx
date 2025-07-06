const ComplexityInfo = ({ type, selectedKey, data }) => {
  const current = data[selectedKey];

  if (!current) return null;

  return (
    <div className="mt-6 text-center text-sm text-white bg-gray-800 p-4 rounded-lg shadow-md w-fit max-w-[95vw] mx-auto">
      <h3 className="text-lg font-semibold mb-2">{current.name} Complexity</h3>
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
        <p>
          🕐 <span className="font-semibold">Time:</span>
        </p>
        <p>
          Best: <span className="font-mono">{current.time.best}</span>
        </p>
        <p>
          Avg: <span className="font-mono">{current.time.average}</span>
        </p>
        <p>
          Worst: <span className="font-mono">{current.time.worst}</span>
        </p>
        <p>
          💾 <span className="font-semibold">Space:</span>{" "}
          <span className="font-mono">{current.space}</span>
        </p>
      </div>
    </div>
  );
};

export default ComplexityInfo;
