function generatePermutations(number) {
  // Helper function to generate permutations
  function permute(arr, l, r, result) {
    if (l === r) {
      result.add(parseInt(arr.join(""), 10));
    } else {
      let seen = new Set();
      for (let i = l; i <= r; i++) {
        if (!seen.has(arr[i])) {
          seen.add(arr[i]);
          [arr[l], arr[i]] = [arr[i], arr[l]]; // Swap
          permute(arr, l + 1, r, result);
          [arr[l], arr[i]] = [arr[i], arr[l]]; // Swap back
        }
      }
    }
  }

  // Convert the number to a string and then to an array of digits
  let numStr = number.toString();
  let numArr = numStr.split("");
  let result = new Set();

  // Generate all permutations
  permute(numArr, 0, numArr.length - 1, result);

  // Convert the set to an array and return
  return Array.from(result).sort();
}
function nextSmaller(n) {
  let numbers = generatePermutations(n);
  let index = numbers.indexOf(n);
  console.log(numbers, index);

  if (numbers[index - 1]) {
    if (numbers[index - 1].toString().length === n.toString().length) {
      return numbers[index - 1];
    }
  } else {
    return -1;
  }
  return -1;
}
// Example usage
let number = 123;
let result = generatePermutations(number);
console.log(result);

console.log(nextSmaller(21));
// console.log(helper.pageCount());
// console.log(Math.ceil(2.1));
