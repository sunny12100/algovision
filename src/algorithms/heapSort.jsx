export function getHeapSortAnimations(array) {
  const animations = [];
  const arr = array.slice();
  const n = arr.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i, animations);
  }

  // Extract elements
  for (let i = n - 1; i > 0; i--) {
    animations.push(["swap", 0, i]);
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0, animations);
  }

  return animations;
}

function heapify(arr, n, i, animations) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n) {
    animations.push(["compare", left, largest]);
    if (arr[left] > arr[largest]) largest = left;
  }

  if (right < n) {
    animations.push(["compare", right, largest]);
    if (arr[right] > arr[largest]) largest = right;
  }

  if (largest !== i) {
    animations.push(["swap", i, largest]);
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest, animations);
  }
}
