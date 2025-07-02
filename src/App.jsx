import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import SortingVisualizer from "./components/SortingVisualizer";
import { getBubbleSortAnimations } from "./algorithms/bubbleSort";
import { getSelectionSortAnimations } from "./algorithms/selectionSort";
import { getInsertionSortAnimations } from "./algorithms/insertionSort";
import { getMergeSortAnimations } from "./algorithms/mergeSort";
import { getQuickSortAnimations } from "./algorithms/quickSort";
import { getHeapSortAnimations } from "./algorithms/heapSort";

const App = () => {
  const [array, setArray] = useState([]);
  const [speed, setSpeed] = useState(1000); // in ms
  const [selectedAlgo, setSelectedAlgo] = useState("bubble");
  const [activeBars, setActiveBars] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);

  const generateArray = () => {
    const newArr = Array.from({ length: 10 }, () =>
      Math.floor(Math.random() * 300 + 10)
    );
    setArray(newArr);
    setSortedIndices([]);
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

        // Set yellow comparing bars
        if (type === "compare" || type === "swap") {
          setActiveBars([i, j]);
        } else if (type === "overwrite") {
          setActiveBars([i]);
        }

        // Apply changes
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

        // Clear highlights
        setTimeout(() => {
          setActiveBars([]);
        }, speed * 0.8);

        // When last animation ends, mark all sorted
        if (index === animations.length - 1) {
          setTimeout(() => {
            setSortedIndices([...Array(array.length).keys()]);
          }, speed);
        }
      }, index * speed);
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar
        generateArray={generateArray}
        handleSort={handleSort}
        speed={speed}
        setSpeed={setSpeed}
        selectedAlgo={selectedAlgo}
        setSelectedAlgo={setSelectedAlgo}
      />
      <SortingVisualizer
        array={array}
        activeBars={activeBars}
        sortedIndices={sortedIndices}
      />

      {/* 🟦 LEGEND */}
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
    </div>
  );
};

export default App;
