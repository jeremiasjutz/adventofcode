import { sum } from "../../utils";

// Setup
const input = Bun.file("input");
const lines = (await input.text()).split("\n");

/**
 * Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
 * Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
 * Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
 * Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
 * Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
 * Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
 */

// Part 1
const result1 = calculateResult(lines);
function calculateResult(linesInput: string[]) {
  let result = 0;
  for (const line of linesInput) {
    const [winningNumbers, numbers] = line
      .split(": ")[1]
      .split(" | ")
      .map((n) => n.split(" ").filter(Boolean).map(Number));
    let numberOfMatches = 0;
    for (const number of numbers) {
      if (winningNumbers.includes(number)) {
        if (numberOfMatches === 0) {
          numberOfMatches = 1;
        } else {
          numberOfMatches = numberOfMatches * 2;
        }
      }
    }
    result += numberOfMatches;
  }
  return result;
}

// Part 2
let result2 = 0;
let cards = Array(lines.length).fill(1);

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const [winningNumbers, numbers] = line
    .split(": ")[1]
    .split(" | ")
    .map((n) => n.split(" ").filter(Boolean).map(Number));
  const numberOfMatches = winningNumbers.reduce(
    (acc, num) => (numbers.includes(num) ? acc + 1 : acc),
    0
  );

  if (numberOfMatches > 0) {
    for (let j = 1; j <= numberOfMatches; j++) {
      if (cards[i + j]) {
        cards[i + j] += cards[i];
      }
    }
  }
}
result2 = cards.reduce(sum, 0);

console.log(result2);
