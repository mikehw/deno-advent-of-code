import { Day, Solve } from "@mikehw/advent-of-code";
import { assert, assertEquals } from "@std/assert";

const puzzle: Day = {
  year: 2024,
  day: 2,
  part1: (input) => {
    return input.split("\n").filter((line) => {
      const values = line.trim().split(" ").map((x) => parseInt(x));
      // determine if increasing or decreasing
      let increasing = true;
      for (const v of values) {
        if (v === values[0]) {
          continue;
        }
        increasing = v > values[0];
        break;
      }
      for (let i = 1; i < values.length; i++) {
        if (values[i] === values[i - 1]) {
          return false;
        }
        if (increasing && values[i] < values[i - 1]) {
          return false;
        }
        if (!increasing && values[i] > values[i - 1]) {
          return false;
        }
        if (Math.abs(values[i] - values[i - 1]) > 3) {
          return false;
        }
      }
      return true;
    }).length;
  },
  part2: (input) => {
    return input.split("\n").filter((line) => {
      const values = line.trim().split(" ").map((x) => parseInt(x));
      if (IsArraySafe(values)) {
        return true;
      }
      // Check if removing any one value will make it safe
      for (let i = 0; i < values.length; i++) {
        const clone = [...values];
        clone.splice(i, 1);
        if (IsArraySafe(clone)) {
          return true;
        }
      }
      return false;
    }).length;
  },
};

function IsArraySafe(
  values: number[],
) {
  let increasing = true;
  for (const v of values) {
    if (v === values[0]) {
      continue;
    }
    increasing = v > values[0];
    break;
  }
  for (let i = 1; i < values.length; i++) {
    if (values[i] === values[i - 1]) {
      return false;
    }
    if (increasing && values[i] < values[i - 1]) {
      return false;
    }
    if (!increasing && values[i] > values[i - 1]) {
      return false;
    }
    if (Math.abs(values[i] - values[i - 1]) > 3) {
      return false;
    }
  }
  return -1;
}

if (import.meta.main) {
  await Solve(puzzle);
}

Deno.test("2024/day-2/part-1", async () => {
  const input = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;
  assertEquals(await puzzle.part1(input), 2);
});

Deno.test("2024/day-2/part-2", async () => {
  const input = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;
  assertEquals(await puzzle.part2?.(input), 4);
});
