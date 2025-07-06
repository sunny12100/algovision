import { getLinearSearchAnimations } from "../algorithms/linearSearch";
import { getBinarySearchAnimations } from "../algorithms/binarySearch";

export const runSearchAnimation = ({
  array,
  target,
  selectedSearchAlgo,
  speed,
  setArray,
  setActiveIndex,
  setFoundIndex,
  setNotFound,
}) => {
  let animations = [];
  let workingArray = [...array];

  if (selectedSearchAlgo === "binary") {
    workingArray.sort((a, b) => a - b);
    setArray(workingArray); // reflect sorted array visually
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
        setTimeout(() => setNotFound(false), 3000);
      }
    }, index * speed);
  });
};
