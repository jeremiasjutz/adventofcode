// Setup
const input = Bun.file("input");
const lines = (await input.text()).split("\n");

// Part 1
function part1() {
  const times = lines[0].split(":")[1].split(" ").filter(Boolean).map(Number);
  const distances = lines[1]
    .split(":")[1]
    .split(" ")
    .filter(Boolean)
    .map(Number);
  const newTimes = [];
  for (let index = 0; index < times.length; index++) {
    const time = times[index];
    const distance = distances[index];
    let newRecord = 0;
    for (let j = 0; j < time; j++) {
      const remaningTime = time - j;
      const distanceNew = remaningTime * j;
      if (distanceNew > distance) {
        newRecord += 1;
      }
    }
    newTimes.push(newRecord);
  }
  console.log(newTimes.reduce((a, b) => a * b));
}

// Part 2
function part2() {
  const time = Number(
    lines[0].split(":")[1].split(" ").filter(Boolean).join("")
  );
  const distance = Number(
    lines[1].split(":")[1].split(" ").filter(Boolean).join("")
  );
  const newTimes = [];
  let newRecord = 0;
  for (let j = 0; j < time; j++) {
    const remaningTime = time - j;
    const distanceNew = remaningTime * j;
    if (distanceNew > distance) {
      newRecord += 1;
    }
  }
  newTimes.push(newRecord);
  console.log(newTimes.reduce((a, b) => a * b));
}
part2();
