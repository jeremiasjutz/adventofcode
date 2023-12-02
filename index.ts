import { $ } from "zx";

const day = Bun.argv[2].padStart(2, "0");
const directory = `./src/${Bun.env.YEAR || new Date().getFullYear()}/${day}`;
await $`cd ${directory} && bun run index.ts`;
