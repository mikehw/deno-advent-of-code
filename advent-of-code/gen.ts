#!/usr/bin/env -S deno run --allow-read=. --allow-write=.

/**
 * This module is a cli tool to generate template solutions
 * @module
 */

import { parseArgs } from "@std/cli";
import { Eta } from "@eta-dev/eta";
import { join } from "@std/path/join";

const template = `<%
const year = it.year;
const day = it.day;
const paddedDay = day.toString().padStart(2, '0');
-%>
import { Day, Solve } from "@mikehw/advent-of-code";
import { assertEquals } from "@std/assert";

const puzzle: Day = {
  year: <%= year %>,
  day: <%= day %>,
  part1: (input) => {
  },
  part2: (input) => {
  }
};

if (import.meta.main) {
  await Solve(puzzle);
}

Deno.test("<%= year %>/day-<%= paddedDay %>/part-1", async () => {
  const input = \`\`;
  assertEquals(await puzzle.part1(input), undefined);
});

Deno.test("<%= year %>/day-<%= paddedDay %>/part-2", async () => {
  const input = \`\`;
  assertEquals(await puzzle.part2?.(input), undefined);
});
`;

async function main() {
  const args = parseArgs(Deno.args, {
    string: ["day", "year"],
    boolean: ["help"],
    alias: {
      d: "day",
      y: "year",
      h: "help",
    },
  });
  if (args.help) {
    console.log(`
Advent of Code Puzzle Template Generator
--year is the 4 digit year of the puzzle
--day is the day of the puzzle

The file will be generated in ./{year}/day-{padded-day}.ts

Example Usage:
deno run --allow-read=. --allow-write=. @mikehw/advent-of-code/gen --year 2024 --day 1
      `);
    Deno.exit(0);
  }

  if (!args.day || !args.year) {
    console.error("--year and --day parameters are required");
    Deno.exit(1);
  }
  if (args.year.length !== 4) {
    console.error("--year should be a 4 digit year");
    Deno.exit(1);
  }

  const yearDir = join(Deno.cwd(), args.year);
  try {
    await Deno.mkdir(yearDir);
  } catch (err) {
    if (!(err instanceof Deno.errors.AlreadyExists)) {
      throw err;
    }
  }
  const day = parseInt(args.day);
  const year = parseInt(args.year);

  const filePath = join(yearDir, `day-${day}.ts`);
  try {
    await Deno.lstat(filePath);
    console.error(`File ${filePath} already exists`);
    Deno.exit(1);
  } catch (err) {
    if (!(err instanceof Deno.errors.NotFound)) {
      throw err;
    }
  }

  const eta = new Eta();
  await Deno.writeTextFile(filePath, eta.renderString(template, { day, year }));
  console.log(`Generated File ${filePath}`);
}

if (import.meta.main) {
  await main();
}
