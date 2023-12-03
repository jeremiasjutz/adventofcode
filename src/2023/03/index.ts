// Setup
const input = Bun.file("input");
const lines = (await input.text()).split("\n");

function hasSymbolNeighbour(lineIndex: number, charIndex: number) {
  const lines2d = lines.map((line) => line.split(""));
  const tr = lines2d?.[lineIndex - 1]?.[charIndex + 1];
  const t = lines2d?.[lineIndex - 1]?.[charIndex];
  const tl = lines2d?.[lineIndex - 1]?.[charIndex - 1];
  const r = lines2d?.[lineIndex]?.[charIndex + 1];
  const br = lines2d?.[lineIndex + 1]?.[charIndex + 1];
  const b = lines2d?.[lineIndex + 1]?.[charIndex];
  const bl = lines2d?.[lineIndex + 1]?.[charIndex - 1];
  const l = lines2d?.[lineIndex]?.[charIndex - 1];
  const neighbours = [t, tr, r, br, b, bl, l, tl].filter(Boolean);
  return neighbours.some(
    (neighbour) => neighbour !== "." && isNaN(Number(neighbour))
  );
}

// Part 1
let result = 0;
let t = [];
for (const [lineIndex, line] of lines.entries()) {
  const numbersInLine = [...line.matchAll(/\d+/g)].flat();
  let searchIndex = 0;
  const validNumbers = numbersInLine.map((numberInLine) => {
    const isNumValid = [];
    const start = line.indexOf(numberInLine, searchIndex);
    const end = start + numberInLine.length;
    searchIndex = end;

    for (let index = start; index < end; index++) {
      const hasNeighbour = hasSymbolNeighbour(lineIndex, index);
      isNumValid.push(hasNeighbour);
    }
    if (isNumValid.some(Boolean)) {
      return Number(numberInLine);
    }
    return 0;
  });
  t.push(validNumbers);

  const sum = validNumbers.reduce((acc, cur) => acc + cur, 0);
  result += sum;
}
console.log(result);

// Part 2
