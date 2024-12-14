import { Day, Solve } from "@mikehw/advent-of-code";
import { assertEquals } from "@std/assert";

const puzzle: Day = {
  year: 2024,
  day: 10,
  part1: (input) => {
    let trails = 0
    const map = input.split("\n").map((line) => line.split(""));
    for(let r = 0; r < map.length; r++) {
      for(let c = 0; c < map[0].length; c++) {
        if (map[r][c] !== "0") {
          continue;
        }
        const peaks: Set<string> = new Set()
        findPeaks(map, r, c, peaks)
        trails += peaks.size;
      }
    }
    return trails;
  },
  part2: (input) => {
    let trails = 0
    const map = input.split("\n").map((line) => line.split(""));
    for(let r = 0; r < map.length; r++) {
      for(let c = 0; c < map[0].length; c++) {
        if (map[r][c] !== "0") {
          continue;
        }
        trails += findPeaks2(map, r, c)
      }
    }
    return trails;
  }
};

function findPeaks(map: string[][], row: number, col: number, peaks: Set<string>) {
  const v = map[row][col]
  if (v === "9") {
     peaks.add(`${row}:${col}`)
  }

  const n = (parseInt(v, 10) + 1).toString()
  // up
  if (map[row-1]?.[col] === n) {
    findPeaks(map, row-1, col, peaks)
  }
  // right
  if (map[row]?.[col+1] === n) {
    findPeaks(map, row, col+1, peaks)
  }
  // down
  if (map[row+1]?.[col] === n) {
    findPeaks(map, row+1, col, peaks)
  }
  // left
  if (map[row]?.[col-1] === n) {
    findPeaks(map, row, col-1, peaks)
  }
}

function findPeaks2(map: string[][], row: number, col: number): number {
  const v = map[row][col]
  if (v === "9") {
     return 1
  }
  const n = (parseInt(v, 10) + 1).toString()
  let sum = 0;
  // up
  if (map[row-1]?.[col] === n) {
    sum += findPeaks2(map, row-1, col)
  }
  // right
  if (map[row]?.[col+1] === n) {
    sum += findPeaks2(map, row, col+1)
  }
  // down
  if (map[row+1]?.[col] === n) {
    sum += findPeaks2(map, row+1, col)
  }
  // left
  if (map[row]?.[col-1] === n) {
    sum += findPeaks2(map, row, col-1)
  }
  return sum;
}

if (import.meta.main) {
  await Solve(puzzle);
}

Deno.test("2024/day-10/part-1-1", async () => {
  const input = `...0...
...1...
...2...
6543456
7.....7
8.....8
9.....9`;
  assertEquals(await puzzle.part1(input), 2);
});

Deno.test("2024/day-10/part-1-2", async () => {
  const input = `..90..9
...1.98
...2..7
6543456
765.987
876....
987....`;
  assertEquals(await puzzle.part1(input), 4);
});

Deno.test("2024/day-10/part-1-3", async () => {
  const input = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`;
  assertEquals(await puzzle.part1(input), 36);
});

Deno.test("2024/day-10/part-2", async () => {
  const input = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`;
  assertEquals(await puzzle.part2?.(input), 81);
});
