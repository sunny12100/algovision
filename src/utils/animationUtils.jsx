import { getBubbleSortAnimations } from "../algorithms/bubbleSort";
import { getSelectionSortAnimations } from "../algorithms/selectionSort";
import { getInsertionSortAnimations } from "../algorithms/insertionSort";
import { getMergeSortAnimations } from "../algorithms/mergeSort";
import { getQuickSortAnimations } from "../algorithms/quickSort";
import { getHeapSortAnimations } from "../algorithms/heapSort";

export const sortingFunctions = {
  bubble: getBubbleSortAnimations,
  selection: getSelectionSortAnimations,
  insertion: getInsertionSortAnimations,
  merge: getMergeSortAnimations,
  quick: getQuickSortAnimations,
  heap: getHeapSortAnimations,
};

export const runSortingAnimation = ({
  array,
  setArray,
  setActiveBars,
  setSortedIndices,
  setShowComplexity,
  speed,
  selectedAlgo,
}) => {
  const animations = sortingFunctions[selectedAlgo]([...array]);

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
          setShowComplexity(true);
        }, speed);
      }
    }, index * speed);
  });
};
