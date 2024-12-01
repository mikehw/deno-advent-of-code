import { Day, Solve } from "@mikehw/advent-of-code";
import { assert, assertEquals } from "@std/assert";

const puzzle: Day = {
  year: 2024,
  day: 1,
  part1: (input) => {
    const left: number[] = [];
    const right: number[] = [];
    for (const line of input.split("\n")) {
      const pieces = line.split(/\s+/g);
      assert(pieces.length === 2, `Failed to split "${line}", got ${pieces}`);
      left.push(parseInt(pieces[0]));
      right.push(parseInt(pieces[1]));
    }
    left.sort();
    right.sort();
    let distanceSum = 0;
    for (let i = 0; i < left.length; i++) {
      distanceSum += Math.abs(left[i] - right[i]);
    }
    return distanceSum;
  },
  part2: (input) => {
    const left: number[] = [];
    const right: number[] = [];
    for (const line of input.split("\n")) {
      const pieces = line.split(/\s+/g);
      assert(pieces.length === 2, `Failed to split "${line}", got ${pieces}`);
      left.push(parseInt(pieces[0]));
      right.push(parseInt(pieces[1]));
    }
    let sum = 0;
    for (const v of left) {
      sum += v * (right.filter((r) => (r === v)).length);
    }
    return sum;
  },
};

if (import.meta.main) {
  await Solve(puzzle);
}

Deno.test("2024/day-1/part-1", async () => {
  const input = `3   4
4   3
2   5
1   3
3   9
3   3`;
  assertEquals(await puzzle.part1(input), 11);
});

Deno.test("2024/day-1/part-2", async () => {
  const input = `3   4
4   3
2   5
1   3
3   9
3   3`;
  assertEquals(await puzzle.part2?.(input), 31);
});
