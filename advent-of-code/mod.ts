import { join } from "@std/path";
/**
 * A module providing a function for advent of code puzzles
 * @module
 */

/**
 * Advent of code two part puzzle
 */
export interface Day {
  /** Year of the challenge */
  year: number;
  /**  Day of the challenge */
  day: number;
  /** Part 1 Solution */
  part1: (input: string) => Promise<string> | string;
  /** Part 2 Solution */
  part2?: (intput: string) => Promise<string> | string;
}

/**
 * Solve a day's solution
 * if input is not supplied, it will read from .inputs if available or fetch the input from the adventofcode.com,
 * fetching requires the ADVENT_OF_CODE_SESSION_COOKIE enviornment variable to be set
 *
 * ```ts
 * if (import.meta.main) {
 *   await Solve(puzzle);
 * }
 * ```
 * @param day - Puzzle to Solve
 * @param input - Optionally, the input for the puzzle
 */
export async function Solve(day: Day, input?: string) {
  if (!input) {
    input = await getInputForDay(day.year, day.day);
  }
  console.log("Part 1:", await day.part1(input));
  if (day.part2) {
    console.log("Part 2:", await day.part2(input));
  }
}

async function getInputForDay(year: number, day: number): Promise<string> {
  const CACHE_DIR = join(Deno.cwd(), ".inputs");
  const cacheFile = join(CACHE_DIR, `${year}_${day}.txt`);
  try {
    await Deno.lstat(cacheFile);
    return await Deno.readTextFile(cacheFile);
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
    },
  ).catch((err) => {
    console.error(
      `Error fetching https://adventofcode.com/${year}/day/${day}/input: `,
      err,
    );
    Deno.exit(1);
  });
  const data = (await resp.text()).trim();
  await Deno.mkdir(CACHE_DIR, { recursive: true });
  await Deno.writeTextFile(cacheFile, data);
  return data;
}
