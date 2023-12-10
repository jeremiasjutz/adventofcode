import { sum } from "../../utils";

// Setup
const input = Bun.file("exampleinput");
const lines = (await input.text()).split("\n");

// Part 1
let result = 0;
for (const line of lines) {
  let parts = line.split(" ").map(Number);
  const prevLastNum = [parts.at(-1) ?? 0];
  while (parts.some((n) => n !== 0)) {
    parts = parts
      .map((n, i, original) => Math.abs(n - (original?.[i + 1] ?? 0)))
      .slice(0, -1);
    prevLastNum.push(parts.at(-1) ?? 0);
  }
  result += prevLastNum.reduce(sum, 0);
}
console.log(result);

// Part 2
