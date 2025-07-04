// src/algorithms/binarySearch.js

export function getBinarySearchAnimations(array, target) {
  const animations = [];
  const sorted = [...array].sort((a, b) => a - b); // ensure sorted
  let low = 0;
  let high = sorted.length - 1;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    animations.push(["compare", mid]);

    if (sorted[mid] === target) {
      animations.push(["found", mid]);
      return animations;
    }

    if (sorted[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  animations.push(["not-found"]);
  return animations;
}
