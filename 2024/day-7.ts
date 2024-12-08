import { Day, Solve } from "@mikehw/advent-of-code";
import { assert, assertEquals } from "@std/assert";

const puzzle: Day = {
  year: 2024,
  day: 7,
  part1: (input) => {
    const lines = input.split("\n");
    let sum = 0;
    for (const line of lines) {
      const parts = line.split(": ");
      const solution = parseInt(parts[0]);
      const numbers = parts[1].split(" ").map((n) => parseInt(n, 10));
      const solveable = isSolvable1(solution, numbers, 0);
      if (solveable) {
        sum += solution;
      }
    }
    return sum;
  },
  part2: (input) => {
    const lines = input.split("\n");
    let sum = 0;
    for (const line of lines) {
      const parts = line.split(": ");
      const solution = parseInt(parts[0]);
      const numbers = parts[1].split(" ").map((n) => parseInt(n, 10));
      const solveable = isSolvable2(solution, numbers, 0);
      if (solveable) {
        sum += solution;
      }
    }
    return sum;
  },
};

function isSolvable1(
  solution: number,
  remainingParts: number[],
  currentVal: number,
): boolean {
  if (remainingParts.length == 0) {
    return currentVal === solution;
  }
  const newParts = [...remainingParts];
  const n = newParts.shift();
  assert(n !== undefined);
  return isSolvable1(solution, newParts, currentVal + n) ||
    isSolvable1(solution, newParts, currentVal * n);
}

function isSolvable2(
  solution: number,
  remainingParts: number[],
  currentVal: number,
): boolean {
  if (remainingParts.length == 0) {
    return currentVal === solution;
  }
  const newParts = [...remainingParts];
  const n = newParts.shift();
  if (n === undefined) {
    throw new Error();
  }
  const pow = Math.floor(Math.log10(n)) + 1;
  return isSolvable2(solution, newParts, currentVal + n) ||
    isSolvable2(solution, newParts, currentVal * n) ||
    isSolvable2(solution, newParts, (currentVal * Math.pow(10, pow)) + n);
}

if (import.meta.main) {
  await Solve(puzzle);
}

Deno.test("2024/day-4/part-1", async () => {
  const input = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;
  assertEquals(await puzzle.part1(input), 3749);
});

Deno.test("2024/day-4/part-2", async () => {
  const input = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;
  assertEquals(await puzzle.part2?.(input), 11387);
});
