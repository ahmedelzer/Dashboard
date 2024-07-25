function score(dice) {
  // Fill me in!
  let score = 0;
  for (let i = 0; i < dice.length; i++) {
    let filter = dice.filter((i) => i !== dice[i]);
    if (filter.length >= 3) {
      // dice = dice - filter;
      if (dice[i] === 1) {
        score += 1000;
      } else {
        score += +`${dice[i]}00`;
      }
    } else {
      if (dice[i] === 5) {
        score += 50;
      } else if (dice[i] === 1) {
        score += 100;
      }
    }
  }
  return score;
}
console.log(score([4, 4, 4, 3, 3]));
// console.log(ipsBetween("180.0.0.0", "181.0.0.0"));
