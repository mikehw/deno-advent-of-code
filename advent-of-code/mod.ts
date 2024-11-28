import { join } from "@std/path";

/**
 * Advent of code two part challenge
 */
export interface Day {
  // Year of the challenge
  year: number;
  // Day of the challenge
  day: number;
  // Part 1 Solution
  part1: (input: string) => Promise<string> | string;
  // Part 2 Solution
  part2?: (intput: string) => Promise<string> | string;
}

// Solve a day's solution
// if input is not supplied, it will read from .inputs if available or fetch the input from the adventofcode.com,
// fetching requires the ADVENT_OF_CODE_SESSION_COOKIE enviornment variable to be set,
export async function Solve(day: Day, input?: string) {
  if (!input) {
    input = await getInputForDay(day.year, day.day);
  }
  console.log("Part 1:");
  printPromise(day.part1(input));
  if (day.part2) {
    console.log("Part 2:");
    printPromise(day.part2(input));
  }
}

const CACHE_DIR = join(Deno.cwd(), ".inputs");

async function getInputForDay(year: number, day: number): Promise<string> {
  try {
    const file = join(CACHE_DIR, `${year}_${day}.txt`);
    await Deno.lstat(file);
    return await Deno.readTextFile(file);
  } catch (err) {
    if (!(err instanceof Deno.errors.NotFound)) {
      throw err;
    }
  }
  const session = Deno.env.get("ADVENT_OF_CODE_SESSION_COOKIE");
  if (!session) {
    console.error("ADVENT_OF_CODE_SESSION_COOKIE is required");
    Deno.exit(1);
  }
  const headers = new Headers({
    Cookie: `session=${session}`,
  });
  const resp = await fetch(
    `https://adventofcode.com/${year}/day/${day}/input`,
    {
      headers,
      credentials: "include",
    }
  ).catch((err) => {
    console.error(
      `Error fetching https://adventofcode.com/${year}/day/${day}/input: `,
      err
    );
    Deno.exit(1);
  });
  const data = await resp.text();
  return data;
}

async function printPromise(result: Promise<string> | string) {
  if (result instanceof Promise) {
    console.log(await result);
  } else {
    console.log(result);
  }
}
