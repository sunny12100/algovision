import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import SortingVisualizer from "./components/SortingVisualizer";
import { getBubbleSortAnimations } from "./algorithms/bubbleSort";
import { getSelectionSortAnimations } from "./algorithms/selectionSort";
import { getInsertionSortAnimations } from "./algorithms/insertionSort";
import { getMergeSortAnimations } from "./algorithms/mergeSort";

const App = () => {
  const [array, setArray] = useState([]);
  const [speed, setSpeed] = useState(1000); // in ms
  const [selectedAlgo, setSelectedAlgo] = useState("bubble");
  const [activeBars, setActiveBars] = useState([]);

  const generateArray = () => {
    const newArr = Array.from({ length: 8 }, () =>
      Math.floor(Math.random() * 300 + 10)
    );
    setArray(newArr);
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
      default:
        return;
    }

    animations.forEach((animation, index) => {
      setTimeout(() => {
        const [type, i, j] = animation;

        // 🔧 Fix here:
        if (type === "compare" || type === "swap") {
          setActiveBars([i, j]);
        } else if (type === "overwrite") {
          setActiveBars([i]); // only highlight the bar being written
        }

        // Perform the action
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
      }, index * speed);
    });
  };

  return (
    <div className="min-h-screen ">
      <Navbar
        generateArray={generateArray}
        handleSort={handleSort}
        speed={speed}
        setSpeed={setSpeed}
        selectedAlgo={selectedAlgo}
        setSelectedAlgo={setSelectedAlgo}
      />
      <SortingVisualizer array={array} activeBars={activeBars} />
    </div>
  );
};

export default App;
