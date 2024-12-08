import { Day, Solve } from "@mikehw/advent-of-code";
import { assert, assertEquals } from "@std/assert";

const puzzle: Day = {
  year: 2024,
  day: 8,
  part1: (input) => {
    const m = input.split("\n").map((line) => line.split(""));
    const antiNodes: boolean[][] = [];
    // Create a map of falses
    for (let r = 0; r < m.length; r++) {
      antiNodes.push([]);
      for (let c = 0; c < m.length; c++) {
        antiNodes[r].push(false);
      }
    }
    // Find the anti-nodes for each cell
    for (let r = 0; r < m.length; r++) {
      for (let c = 0; c < m[0].length; c++) {
        populateAntinodes1(m, r, c, antiNodes);
      }
    }
    let count = 0;
    for (let r = 0; r < m.length; r++) {
      for (let c = 0; c < m[0].length; c++) {
        if (antiNodes[r][c]) {
          count++;
        }
      }
    }
    return count;
  },
  part2: (input) => {
    const m = input.split("\n").map((line) => line.split(""));
    const antiNodes: boolean[][] = [];
    // Create a map of falses
    for (let r = 0; r < m.length; r++) {
      antiNodes.push([]);
      for (let c = 0; c < m.length; c++) {
        antiNodes[r].push(false);
      }
    }
    // Find the anti-nodes for each cell
    for (let r = 0; r < m.length; r++) {
      for (let c = 0; c < m[0].length; c++) {
        populateAntinodes2(m, r, c, antiNodes);
      }
    }
    let count = 0;
    for (let r = 0; r < m.length; r++) {
      for (let c = 0; c < m[0].length; c++) {
        if (antiNodes[r][c]) {
          count++;
        }
      }
    }
    return count;
  },
};

const freqs = /^[a-zA-Z0-9]$/;

function populateAntinodes1(
  m: string[][],
  r: number,
  c: number,
  antiNodes: boolean[][],
) {
  const f = m[r][c];
  if (!f.match(freqs)) {
    return;
  }
  for (let r2 = 0; r2 < m.length; r2++) {
    for (let c2 = 0; c2 < m[0].length; c2++) {
      if (m[r2][c2] !== f) {
        continue;
      }
      if (r2 === r && c2 === c) {
        continue;
      }
      const rDiff = r2 - r;
      const cDiff = c2 - c;
      const aR = r + (rDiff * 2);
      const aC = c + (cDiff * 2);
      if (aR < 0 || aR >= m.length || aC < 0 || aC >= m[0].length) {
        continue;
      }
      antiNodes[aR][aC] = true;
    }
  }
}

function populateAntinodes2(
  m: string[][],
  r: number,
  c: number,
  antiNodes: boolean[][],
) {
  const f = m[r][c];
  if (!f.match(freqs)) {
    return;
  }
  for (let r2 = 0; r2 < m.length; r2++) {
    for (let c2 = 0; c2 < m[0].length; c2++) {
      if (m[r2][c2] !== f) {
        continue;
      }
      if (r2 === r && c2 === c) {
        continue;
      }
      const rDiff = r2 - r;
      const cDiff = c2 - c;
      let aR = r + (rDiff * 2);
      let aC = c + (cDiff * 2);
      antiNodes[r][c] = true;
      antiNodes[r2][c2] = true;
      while (aR >= 0 && aR < m.length && aC >= 0 && aC < m[0].length) {
        antiNodes[aR][aC] = true;
        aR = aR + rDiff;
        aC = aC + cDiff;
      }
    }
  }
}

if (import.meta.main) {
  await Solve(puzzle);
}

Deno.test("2024/day-4/part-1", async () => {
  const input = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`;
  assertEquals(await puzzle.part1(input), 14);
});

Deno.test("2024/day-4/part-2", async () => {
  const input = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`;
  assertEquals(await puzzle.part2?.(input), 34);
});
