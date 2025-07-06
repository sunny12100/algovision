import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import SortingVisualizer from "./components/SortingVisualizer";
import SearchVisualizer from "./components/SearchVisualizer";
import Legend from "./components/Legend";
import ComplexityInfo from "./components/ComplexityInfo";
import { runSortingAnimation } from "./utils/animationUtils";
import { runSearchAnimation } from "./utils/searchUtils";

const sortingComplexity = {
  bubble: {
    name: "Bubble Sort",
    time: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    space: "O(1)",
  },
  selection: {
    name: "Selection Sort",
    time: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    space: "O(1)",
  },
  insertion: {
    name: "Insertion Sort",
    time: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    space: "O(1)",
  },
  merge: {
    name: "Merge Sort",
    time: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
    space: "O(n)",
  },
  quick: {
    name: "Quick Sort",
    time: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n²)",
    },
    space: "O(log n)",
  },
  heap: {
    name: "Heap Sort",
    time: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
    space: "O(1)",
  },
};
const searchingComplexity = {
  linear: {
    name: "Linear Search",
    time: {
      best: "O(1)",
      average: "O(n)",
      worst: "O(n)",
    },
    space: "O(1)",
  },
  binary: {
    name: "Binary Search",
    time: {
      best: "O(1)",
      average: "O(log n)",
      worst: "O(log n)",
    },
    space: "O(1)",
  },
};

const App = () => {
  const [array, setArray] = useState([]);
  const [speed, setSpeed] = useState(200);
  const [selectedAlgo, setSelectedAlgo] = useState("bubble");
  const [activeBars, setActiveBars] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [showComplexity, setShowComplexity] = useState(false);
  const [mode, setMode] = useState("sort"); // or "search"
  const [target, setTarget] = useState(50); // default search target
  const [activeIndex, setActiveIndex] = useState(null);
  const [foundIndex, setFoundIndex] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [selectedSearchAlgo, setSelectedSearchAlgo] = useState("linear");

  const generateArray = () => {
    const newArr = Array.from({ length: 10 }, () =>
      Math.floor(Math.random() * 300 + 10)
    );
    setArray(newArr);
    setSortedIndices([]);
    setShowComplexity(false); // reset complexity box
    setActiveIndex(null);
    setFoundIndex(null);
    setNotFound(false);
  };

  useEffect(() => {
    generateArray();
  }, []);

  const handleSort = () => {
    runSortingAnimation({
      array,
      setArray,
      setActiveBars,
      setSortedIndices,
      setShowComplexity,
      speed,
      selectedAlgo,
    });
  };

  const handleSearch = () => {
    runSearchAnimation({
      array,
      target,
      selectedSearchAlgo,
      speed,
      setArray,
      setActiveIndex,
      setFoundIndex,
      setNotFound,
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar
        mode={mode}
        setMode={setMode}
        generateArray={generateArray}
        speed={speed}
        setSpeed={setSpeed}
        selectedAlgo={selectedAlgo}
        setSelectedAlgo={setSelectedAlgo}
        handleSort={mode === "sort" ? handleSort : handleSearch}
        target={target}
        setTarget={setTarget}
        selectedSearchAlgo={selectedSearchAlgo}
        setSelectedSearchAlgo={setSelectedSearchAlgo}
      />

      {mode === "sort" ? (
        <SortingVisualizer
          array={array}
          activeBars={activeBars}
          sortedIndices={sortedIndices}
        />
      ) : (
        <SearchVisualizer
          array={array}
          activeIndex={activeIndex}
          foundIndex={foundIndex}
        />
      )}

      {/* 🟦 LEGEND */}

      <Legend mode={mode} />

      {/* 📊 Complexity Info */}
      {mode === "search" && (
        <ComplexityInfo
          type="search"
          selectedKey={selectedSearchAlgo}
          data={searchingComplexity}
        />
      )}
      {mode === "sort" && showComplexity && (
        <ComplexityInfo
          type="sort"
          selectedKey={selectedAlgo}
          data={sortingComplexity}
        />
      )}
    </div>
  );
};

export default App;
