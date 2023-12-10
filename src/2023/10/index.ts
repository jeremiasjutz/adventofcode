// Setup
const input = Bun.file("exampleinput");
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

// Part 1
function getPath(x: number, y: number) {
  const [top, right, bottom, left] = [
    { char: grid?.[y - 1]?.[x], x, y: y - 1 },
    { char: grid?.[y]?.[x + 1], x: x + 1, y },
    { char: grid?.[y + 1]?.[x], x, y: y + 1 },
    { char: grid?.[y]?.[x - 1], x: x - 1, y },
  ];

  const actualDirs = [];
  if (connections[top.char]?.includes("b")) {
    actualDirs.push(top);
  }
  if (connections[right.char]?.includes("l")) {
    actualDirs.push(right);
  }
  if (connections[bottom.char]?.includes("t")) {
    actualDirs.push(bottom);
  }
  if (connections[left.char]?.includes("r")) {
    actualDirs.push(left);
  }

  console.log(actualDirs);

  for (const dir of actualDirs) {
    getPath(dir.x, dir.y);
  }

  //   console.log(
  //     Object.fromEntries(Object.entries(dirs).filter(([, v]) => Boolean(v)))
  //   );
}

getPath(startX, startY);

// Part 2
