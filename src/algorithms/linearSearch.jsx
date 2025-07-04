// src/algorithms/linearSearch.js

export function getLinearSearchAnimations(array, target) {
  const animations = [];

  for (let i = 0; i < array.length; i++) {
    animations.push(["compare", i]);

    if (array[i] === target) {
      animations.push(["found", i]);
      return animations;
    }
  }

  animations.push(["not-found"]);
  return animations;
}
