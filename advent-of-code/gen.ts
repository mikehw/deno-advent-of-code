#!/usr/bin/env -S deno run --allow-read=. --allow-write=.

import { parseArgs } from "@std/cli";
import { Eta } from "@eta-dev/eta";
import { join } from "@std/path/join";

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

  if (!import.meta.dirname) {
    console.error(`Unable to find templates`);
    Deno.exit(1);
  }
  const eta = new Eta({ views: import.meta.dirname });
  await Deno.writeTextFile(filePath, eta.render("./puzzle", { day, year }));
  console.log(`Generated File ${filePath}`);
}

if (import.meta.main) {
  await main();
}
