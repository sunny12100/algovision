import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import SortingVisualizer from "./components/SortingVisualizer";
import { getBubbleSortAnimations } from "./algorithms/bubbleSort";
import { getSelectionSortAnimations } from "./algorithms/selectionSort";
import { getInsertionSortAnimations } from "./algorithms/insertionSort";
import { getMergeSortAnimations } from "./algorithms/mergeSort";
import { getQuickSortAnimations } from "./algorithms/quickSort";
import { getHeapSortAnimations } from "./algorithms/heapSort";
import { getLinearSearchAnimations } from "./algorithms/linearSearch";
import { getBinarySearchAnimations } from "./algorithms/binarySearch";
import SearchVisualizer from "./components/SearchVisualizer";
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
    let animations = [];
    const arrayCopy = [...array];

    switch (selectedAlgo) {
      case "bubble":
        animations = getBubbleSortAnimations(arrayCopy);
        break;
      case "selection":
        animations = getSelectionSortAnimations(arrayCopy);
        break;
      case "insertion":
        animations = getInsertionSortAnimations(arrayCopy);
        break;
      case "merge":
        animations = getMergeSortAnimations(arrayCopy);
        break;
      case "quick":
        animations = getQuickSortAnimations(arrayCopy);
        break;
      case "heap":
        animations = getHeapSortAnimations(arrayCopy);
        break;
      default:
        return;
    }

    animations.forEach((animation, index) => {
      setTimeout(() => {
        const [type, i, j] = animation;

        if (type === "compare" || type === "swap") {
          setActiveBars([i, j]);
        } else if (type === "overwrite") {
          setActiveBars([i]);
        }

        if (type === "swap") {
          setArray((prev) => {
            const newArr = [...prev];
            [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
            return newArr;
          });
        } else if (type === "overwrite") {
          setArray((prev) => {
            const newArr = [...prev];
            newArr[i] = j;
            return newArr;
          });
        }

        setTimeout(() => {
          setActiveBars([]);
        }, speed * 0.8);

        if (index === animations.length - 1) {
          setTimeout(() => {
            setSortedIndices([...Array(array.length).keys()]);
            setShowComplexity(true); // show complexity box
          }, speed);
        }
      }, index * speed);
    });
  };
  const handleSearch = () => {
    let animations = [];
    let workingArray = [...array];

    if (selectedSearchAlgo === "binary") {
      workingArray.sort((a, b) => a - b);
      setArray(workingArray); // show sorted version
      animations = getBinarySearchAnimations(workingArray, target);
    } else {
      animations = getLinearSearchAnimations(workingArray, target);
    }

    animations.forEach((animation, index) => {
      setTimeout(() => {
        const [type, idx] = animation;

        if (type === "compare") {
          setActiveIndex(idx);
        } else if (type === "found") {
          setFoundIndex(idx);
          setActiveIndex(null);
        } else if (type === "not-found") {
          setActiveIndex(null);
          setFoundIndex(null);
          setNotFound(true);
        }
      }, index * speed);
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
      <div className="">
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
      </div>

      {/* 🟦 LEGEND */}
      {mode === "sort" ? (
        <div className="flex justify-center items-center gap-6 mt-4 text-sm font-medium">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-400 rounded-sm"></div>
            <span>Unsorted</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-400 rounded-sm"></div>
            <span>Comparing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-500 rounded-sm"></div>
            <span>Sorted</span>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center gap-6 mt-4 text-sm font-medium">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-400 rounded-sm"></div>
            <span>Unsearched</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-400 rounded-sm"></div>
            <span>Comparing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-500 rounded-sm"></div>
            <span>Found</span>
          </div>
        </div>
      )}
      {mode === "search" && notFound && (
        <div className="text-center mt-4 text-red-500 font-semibold text-sm">
          🎯 Target not found in the array.
        </div>
      )}
      {mode === "search" && (
        <div className="mt-6 text-center text-sm text-white bg-gray-800 p-4 rounded-lg shadow-md w-fit mx-auto">
          <h3 className="text-lg font-semibold mb-2">
            {searchingComplexity[selectedSearchAlgo].name} Complexity
          </h3>
          <div className="flex flex-row gap-1">
            <p>🕐 Time Complexity:</p>
            <p>
              Best:{" "}
              <span className="font-mono">
                {searchingComplexity[selectedSearchAlgo].time.best}
              </span>
            </p>
            <p>
              Average:{" "}
              <span className="font-mono">
                {searchingComplexity[selectedSearchAlgo].time.average}
              </span>
            </p>
            <p>
              Worst:{" "}
              <span className="font-mono">
                {searchingComplexity[selectedSearchAlgo].time.worst}
              </span>
            </p>
            <p>
              💾 Space:{" "}
              <span className="font-mono">
                {searchingComplexity[selectedSearchAlgo].space}
              </span>
            </p>
          </div>
        </div>
      )}

      {/* 📊 Complexity Info */}
      {showComplexity && mode === "sort" && (
        <div className="mt-6 text-center text-sm text-white bg-gray-800 p-4 rounded-lg shadow-md w-fit mx-auto">
          <h3 className="text-lg font-semibold mb-2">
            {sortingComplexity[selectedAlgo].name} Complexity
          </h3>
          <div className="flex flex-row gap-1">
            <p>🕐 Time Complexity:</p>
            <p>
              Best:{" "}
              <span className="font-mono">
                {sortingComplexity[selectedAlgo].time.best}
              </span>
            </p>
            <p>
              Average:{" "}
              <span className="font-mono">
                {sortingComplexity[selectedAlgo].time.average}
              </span>
            </p>
            <p>
              Worst:{" "}
              <span className="font-mono">
                {sortingComplexity[selectedAlgo].time.worst}
              </span>
            </p>
            <p>
              💾 Space:{" "}
              <span className="font-mono">
                {sortingComplexity[selectedAlgo].space}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
