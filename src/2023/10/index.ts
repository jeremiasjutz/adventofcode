// Setup
const input = Bun.file("input");
const lines = (await input.text()).split("\n");

let [startX, startY] = [0, 0];
const grid = lines.reduce((acc, line, index) => {
  const indexOfS = line.indexOf("S");
  if (indexOfS !== -1) {
    [startX, startY] = [indexOfS, index];
  }
  return [...acc, line.split("")];
}, [] as string[][]);

const connections: Record<string, string[]> = {
  "|": ["t", "b"],
  "-": ["l", "r"],
  L: ["t", "r"],
  J: ["t", "l"],
  "7": ["b", "l"],
  F: ["b", "r"],
};

type Direction = "top" | "right" | "bottom" | "left";
type Character = {
  char: string;
  x: number;
  y: number;
  origin: Direction;
};

// Part 1
let count = 0;
function getPath(x: number, y: number, origin: Direction | null) {
  const [top, right, bottom, left]: Character[] = [
    { char: grid?.[y - 1]?.[x], x, y: y - 1, origin: "bottom" },
    { char: grid?.[y]?.[x + 1], x: x + 1, y, origin: "left" },
    { char: grid?.[y + 1]?.[x], x, y: y + 1, origin: "top" },
    { char: grid?.[y]?.[x - 1], x: x - 1, y, origin: "right" },
  ];

  const actualDirs = [];
  if (connections[top.char]?.includes("b") && origin !== "top") {
    actualDirs.push(top);
  }
  if (connections[right.char]?.includes("l") && origin !== "right") {
    actualDirs.push(right);
  }
  if (connections[bottom.char]?.includes("t") && origin !== "bottom") {
    actualDirs.push(bottom);
  }
  if (connections[left.char]?.includes("r") && origin !== "left") {
    actualDirs.push(left);
  }
  count += actualDirs.length;
  console.log(actualDirs);

  for (const dir of actualDirs) {
    getPath(dir.x, dir.y, dir.origin);
  }
}

getPath(startX, startY, null);
console.log(count);

// Part 2
