// Setup
const input = Bun.file("input");
const lines = (await input.text()).split("\n");

// Part 1
const part1 = lines.reduce((acc, cur) => {
  const nums = cur.split("").filter(Number);
  return acc + Number(nums[0] + nums.at(-1));
}, 0);
console.log("Part 1", part1);

// Part 2
const numberMap: Record<string, string> = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const pattern = new RegExp(
  `(?=(\\d|${Object.keys(numberMap).join("|")}))`,
  "g"
);

const part2 = lines.reduce((acc, cur) => {
  const nums = [...cur.matchAll(pattern)].map(
    ([_, match]) => numberMap[match] ?? match
  );
  return acc + Number(nums[0] + nums.at(-1));
}, 0);
console.log("Part 2", part2);
