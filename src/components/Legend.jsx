const Legend = ({ mode }) => {
  const legendItems =
    mode === "sort"
      ? [
          { color: "bg-green-400", label: "Unsorted" },
          { color: "bg-yellow-400", label: "Comparing" },
          { color: "bg-purple-500", label: "Sorted" },
        ]
      : [
          { color: "bg-green-400", label: "Unsearched" },
          { color: "bg-yellow-400", label: "Comparing" },
          { color: "bg-purple-500", label: "Found" },
        ];

  return (
    <div className="flex justify-center items-center gap-6 mt-4 text-sm font-medium">
      {legendItems.map(({ color, label }, idx) => (
        <div className="flex items-center gap-2" key={idx}>
          <div className={`w-4 h-4 ${color} rounded-sm`}></div>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
};

export default Legend;
