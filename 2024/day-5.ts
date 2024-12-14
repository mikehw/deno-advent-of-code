import { Day, Solve } from "@mikehw/advent-of-code";
import { assert, assertEquals } from "@std/assert";

const puzzle: Day = {
  year: 2024,
  day: 5,
  part1: (input) => {
    const inputSplit = input.split("\n\n");
    const pairings = inputSplit[0].split("\n").map((p) =>
      p.split("|").map((n) => parseInt(n, 10))
    );
    let sumOfMiddles = 0;
    for (const proposed of inputSplit[1].split("\n")) {
      const nums = proposed.split(",").map((n) => parseInt(n, 10));
      const passes = checkAgainstPairings(nums, pairings);
      if (!passes) {
        continue;
      }
      sumOfMiddles += nums[(nums.length - 1) / 2], 10;
    }
    return sumOfMiddles;
  },
  part2: (input) => {
    const inputSplit = input.split("\n\n");
    const pairings = inputSplit[0].split("\n").map((p) =>
      p.split("|").map((n) => parseInt(n, 10))
    );
    let sumOfMiddles = 0;
    for (const proposed of inputSplit[1].split("\n")) {
      const nums = proposed.split(",").map((n) => parseInt(n, 10));
      const swapped = swapPairings(nums, pairings);
      if (!swapped) {
        continue;
      }
      sumOfMiddles += nums[(nums.length - 1) / 2], 10;
    }
    return sumOfMiddles;
  },
};

function checkAgainstPairings(line: number[], pairings: number[][]): boolean {
  for (const p of pairings) {
    const p1Index = line.indexOf(p[0]);
    const p2Index = line.indexOf(p[1]);
    if (p1Index !== -1 && p2Index !== -1 && p2Index < p1Index) {
      return false;
    }
  }
  return true;
}

function swapPairings(line: number[], pairings: number[][]): boolean {
  let swapped = false;
  while (!checkAgainstPairings(line, pairings)) {
    for (const p of pairings) {
      const p1Index = line.indexOf(p[0]);
      const p2Index = line.indexOf(p[1]);
      if (p1Index !== -1 && p2Index !== -1 && p2Index < p1Index) {
        line[p2Index] = p[0];
        line[p1Index] = p[1];
        swapped = true;
      }
    }
  }
  return swapped;
}

if (import.meta.main) {
  await Solve(puzzle);
}

Deno.test("2024/day-5/part-1", async () => {
  const input = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;
  assertEquals(await puzzle.part1(input), 143);
});

Deno.test("2024/day-5/part-2", async () => {
  const input = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;
  assertEquals(await puzzle.part2?.(input), 123);
});
