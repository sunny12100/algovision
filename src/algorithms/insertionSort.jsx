export function getInsertionSortAnimations(array) {
  const animations = [];
  const arr = array.slice();

  for (let i = 1; i < arr.length; i++) {
    let j = i;
    while (j > 0 && arr[j] < arr[j - 1]) {
      animations.push(["compare", j, j - 1]);
      animations.push(["swap", j, j - 1]);
      [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      j--;
    }
  }

  return animations;
}
