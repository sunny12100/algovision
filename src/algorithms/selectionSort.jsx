export function getSelectionSortAnimations(array) {
  const animations = [];
  const arr = array.slice();

  for (let i = 0; i < arr.length; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      animations.push(["compare", minIdx, j]);
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      animations.push(["swap", i, minIdx]);
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }

  return animations;
}
