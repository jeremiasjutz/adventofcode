// Setup
const input = Bun.file("input");
const lines = (await input.text()).split("\n");

const amountPerColor: Record<string, number> = {
  red: 12,
  green: 13,
  blue: 14,
};
const colors = Object.keys(amountPerColor);

// Part 1
let result1 = 0;
for (const line of lines) {
  const [game, cubes] = line.split(":");
  const id = Number(game.split(" ")[1]);
  const sets = cubes.split(";").map((set) => set.split(", "));
  const isGameValid = sets
    .map((set) => {
      const match = colors.map(
        (color) =>
          (Number(
            set.find((cube) => cube.includes(color))?.replace(/[^0-9]/g, "")
          ) || 0) <= amountPerColor[color]
      );
      return match.every(Boolean);
    })
    .every(Boolean);
  if (isGameValid) {
    result1 += id;
  }
}
console.log(result1);

// Part 2
let result2 = 0;
for (const line of lines) {
  const cubes = line.split(":")[1];
  const sets = cubes.split(";").map((set) => set.split(", "));
  const colorStats = sets.map((set) => {
    const [red, green, blue] = colors.map(
      (color) =>
        Number(
          set.find((cube) => cube.includes(color))?.replace(/[^0-9]/g, "")
        ) || 0
    );
    return { red, green, blue };
  });
  const minRed = Math.max(...colorStats.map((stat) => stat.red));
  const minGreen = Math.max(...colorStats.map((stat) => stat.green));
  const minBlue = Math.max(...colorStats.map((stat) => stat.blue));
  const power = minRed * minGreen * minBlue;
  result2 += power;
}
console.log(result2);
