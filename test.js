function persistence(num, result = 0) {
  num = num.toString();
  if (num.length === 1) {
    return result;
  }
  let next = [...num].reduce((curr, d) => +curr * +d, 1);
  return persistence(next, result + 1);
}
console.log(persistence(999));
