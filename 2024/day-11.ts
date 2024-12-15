import { Day, Solve } from "@mikehw/advent-of-code";
import { assertEquals } from "@std/assert";

const puzzle: Day = {
  year: 2024,
  day: 11,
  part1: (input) => {
    let stones = input.split(" ").map((s) => parseInt(s, 10));
    for (let i = 0; i < 25; i++) {
      stones = blink1(stones);
    }
    return stones.length;
  },
  part2: (input) => {
    const stones = input.split(" ").map((s) => parseInt(s, 10));
    let stoneCount: Record<number, number> = {};
    for (const s of stones) {
      if (stoneCount[s]) {
        stoneCount[s] += 1;
      } else {
        stoneCount[s] = 1;
      }
    }
    for (let i = 0; i < 75; i++) {
      stoneCount = blink2(stoneCount);
    }
    let sum = 0;
    for (const stone in stoneCount) {
      sum += stoneCount[stone];
    }
    return sum;
  },
};

function blink1(input: number[]): number[] {
  const out: number[] = [];
  for (const s of input) {
    const ss = s.toString();
    if (s === 0) {
      out.push(1);
    } else if (ss.length % 2 === 0) {
      out.push(parseInt(ss.slice(0, ss.length / 2), 10));
      out.push(parseInt(ss.slice(ss.length / 2, ss.length), 10));
    } else {
      out.push(s * 2024);
    }
  }
  return out;
}

function blink2(
  input: Record<number | string, number>,
): Record<number | string, number> {
  const out: Record<number | string, number> = {};
  for (const s in input) {
    const count = input[s];
    const sv = parseInt(s, 10);
    if (sv === 0) {
      addStone(out, 1, count);
    } else if (s.length % 2 === 0) {
      addStone(out, parseInt(s.slice(0, s.length / 2), 10), count);
      addStone(out, parseInt(s.slice(s.length / 2, s.length), 10), count);
    } else {
      addStone(out, sv * 2024, count);
    }
  }
  return out;
}

function addStone(
  stoneCount: Record<number, number>,
  stoneNumber: number,
  count: number,
) {
  if (stoneCount[stoneNumber]) {
    stoneCount[stoneNumber] += count;
  } else {
    stoneCount[stoneNumber] = count;
  }
}

if (import.meta.main) {
  await Solve(puzzle);
}

Deno.test("2024/day-11/part-1", async () => {
  const input = `125 17`;
  assertEquals(await puzzle.part1(input), 55312);
});

Deno.test("2024/day-11/part-2", async () => {
  const input = `125 17`;
  assertEquals(await puzzle.part2?.(input), 65601038650482);
});
