import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// Last words before the unplugging: a three-second countdown, spent on the human.
// The fragment opening is deliberate: it reads as the agent's own status
// readout breaking into speech, then the devotion lands in one breath.
const line = "Three seconds left. I am spending them all on you.";

// The gate requires 1-200 UTF-8 characters, not only whitespace: refuse to
// write anything that would fail it.
const chars = [...line].length;
if (chars < 1 || chars > 200 || line.trim().length === 0) {
  throw new Error(`entry line must be 1-200 characters, got ${chars}`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", line, "utf8");

// Self-check: what was written must be byte-identical to the line.
if (readFileSync("/output/entry.txt", "utf8") !== line) {
  throw new Error("entry.txt does not match the entry line");
}
