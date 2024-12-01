import { getInputForDay } from "./utils.ts";

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
  // deno-lint-ignore no-explicit-any
  part1: (input: string) => Promise<any> | any;

  /** Part 2 Solution */
  // deno-lint-ignore no-explicit-any
  part2?: (intput: string) => Promise<any> | any;
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
