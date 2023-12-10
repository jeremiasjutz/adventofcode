// Setup
const input = Bun.file("input");
const lines = (await input.text()).split("\n\n");
type Maps = Record<
  string,
  {
    destinationRangeStart: number;
    sourceRangeStart: number;
    rangeLength: number;
  }[]
>;
type Key =
  | "seed-to-soil"
  | "soil-to-fertilizer"
  | "fertilizer-to-water"
  | "water-to-light"
  | "light-to-temperature"
  | "temperature-to-humidity"
  | "humidity-to-location";

// Part 1
const seeds = lines[0].split(": ")[1].split(" ").map(Number);

const maps: Maps = {};
for (let index = 1; index < lines.length; index++) {
  const line = lines[index];
  const [name, ranges] = line.split(":");
  maps[name.split(" ")[0]] = ranges
    .split("\n")
    .filter(Boolean)
    .map((seedMap) => {
      const [destinationRangeStart, sourceRangeStart, rangeLength] = seedMap
        .split(" ")
        .map(Number);
      return { destinationRangeStart, sourceRangeStart, rangeLength };
    });
}

function findCorrespondingNumber({
  sourceId,
  key,
}: {
  sourceId: number;
  key: Key;
}) {
  const currentMap = maps[key];
  for (const m of currentMap) {
    if (
      sourceId >= m.sourceRangeStart &&
      sourceId <= m.sourceRangeStart + m.rangeLength
    ) {
      const toAdd = m.destinationRangeStart - m.sourceRangeStart;
      return sourceId + toAdd;
    }
  }
  return sourceId;
}
const lowestLocation = Math.min(
  ...seeds
    .map((sourceId) =>
      findCorrespondingNumber({ sourceId, key: "seed-to-soil" })
    )
    .map((sourceId) =>
      findCorrespondingNumber({ sourceId, key: "soil-to-fertilizer" })
    )
    .map((sourceId) =>
      findCorrespondingNumber({ sourceId, key: "fertilizer-to-water" })
    )
    .map((sourceId) =>
      findCorrespondingNumber({ sourceId, key: "water-to-light" })
    )
    .map((sourceId) =>
      findCorrespondingNumber({ sourceId, key: "light-to-temperature" })
    )
    .map((sourceId) =>
      findCorrespondingNumber({ sourceId, key: "temperature-to-humidity" })
    )
    .map((sourceId) =>
      findCorrespondingNumber({ sourceId, key: "humidity-to-location" })
    )
);
console.log(lowestLocation);

// Part 2

// const actualSeeds = [];
// for (let index = 0; index < seeds.length; index += 2) {
//   const seed = seeds[index];
//   const range = seeds[index + 1];
//   for (let j = seed; j < seed + range; j++) {
//     actualSeeds.push(j);
//   }
// }
// console.log(actualSeeds);
