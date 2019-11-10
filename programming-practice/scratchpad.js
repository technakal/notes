function sum(arr, n) {
  return n <= 0 ? arr[0] : sum(arr, n - 1) + arr[0];
}

console.log(sum([2, 3, 4], 1));
