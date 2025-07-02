export function getQuickSortAnimations(array) {
  const animations = [];
  const arr = array.slice();
  quickSort(arr, 0, arr.length - 1, animations);
  return animations;
}

function quickSort(arr, low, high, animations) {
  if (low < high) {
    const pi = partition(arr, low, high, animations);
    quickSort(arr, low, pi - 1, animations);
    quickSort(arr, pi + 1, high, animations);
  }
}

function partition(arr, low, high, animations) {
  const pivot = arr[high];
  let i = low;

  for (let j = low; j < high; j++) {
    animations.push(["compare", j, high]);
    if (arr[j] < pivot) {
      animations.push(["swap", i, j]);
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
    }
  }

  animations.push(["swap", i, high]);
  [arr[i], arr[high]] = [arr[high], arr[i]];
  return i;
}
