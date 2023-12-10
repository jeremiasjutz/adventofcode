// Setup
const input = Bun.file("exampleinput");
const lines = (await input.text()).split("\n");

const cardRanks = [
  "A",
  "K",
  "Q",
  "J",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
];

const handRanks = [
  "fiveKind",
  "fourKind",
  "fullHouse",
  "threeKind",
  "twoPair",
  "onePair",
];

// Part 1
for (const line of lines) {
  const [hand, bid] = line.split(" ");
  const cards = hand.split("");
  const t: Record<string, number> = {};
  for (const card of cards) {
    if (t[card]) {
      t[card] += 1;
    } else {
      t[card] = 1;
    }
  }
  console.log(t);
}

// Part 2
