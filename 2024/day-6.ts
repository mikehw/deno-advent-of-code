import { Day, Solve } from "@mikehw/advent-of-code";
import { assert, assertEquals } from "@std/assert";

const puzzle: Day = {
  year: 2024,
  day: 6,
  part1: (input) => {
    const map = input.split("\n").map((line) => line.split(""));
    while (!takeStep(map));
    let count = 0;
    for (const r of map) {
      for (const c of r) {
        if (c === "X") {
          count++;
        }
      }
    }
    return count;
  },
  part2: async (input) => {
    const map = input.split("\n").map((line) => line.split(""));
    let count = 0;
    const p = findPositionAndDirection(map);
    for (let i = 0; i < map.length; i++) {
      console.log("working on row", i);
      const promises: Promise<boolean>[] = [];
      for (let j = 0; j < map[0].length; j++) {
        if (i === p.row && j === p.col) {
          continue;
        }
        const testMap = input.split("\n").map((line) => line.split(""));
        testMap[i][j] = "#";
        promises.push(createWorker(testMap));
      }
      const results = await Promise.all(promises);
      count += results.filter(Boolean).length;
    }
    return count;
  },
};

const WORKER_SCRIPT = new URL("./day-6-worker.ts", import.meta.url).href;

const createWorker = (map: string[][]) => {
  return new Promise<boolean>((resolve) => {
    const worker = new Worker(WORKER_SCRIPT, { type: "module" });
    worker.onmessage = (event) => {
      resolve(event.data);
      worker.terminate();
    };
    worker.postMessage(map);
  });
};

export function hasLoop(map: string[][]): boolean {
  const previousPos: Record<string, boolean> = {};
  let p = findPositionAndDirection(map);
  previousPos[p.row.toString() + "|" + p.col.toString() + "|" + p.dir] = true;
  while (true) {
    if (takeStep(map)) {
      return false;
    }
    p = findPositionAndDirection(map);
    const pStr = p.row.toString() + "|" + p.col.toString() + "|" + p.dir;
    if (previousPos[pStr]) {
      return true;
    }
    previousPos[pStr] = true;
  }
}

// Directions <^>v
export function findPositionAndDirection(
  map: string[][],
): { row: number; col: number; dir: string } {
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[0].length; col++) {
      if (map[row][col] === "<") {
        return { row, col, dir: "<" };
      }
      if (map[row][col] === ">") {
        return { row, col, dir: ">" };
      }
      if (map[row][col] === "^") {
        return { row, col, dir: "^" };
      }
      if (map[row][col] === "v") {
        return { row, col, dir: "v" };
      }
    }
  }
  throw new Error("guard not found");
}

export function takeStep(map: string[][]): boolean {
  const p = findPositionAndDirection(map);
  if (p.dir === "^") {
    if (p.row === 0) {
      map[p.col][p.row] = "X";
      return true;
    }
    if (p.row === 0 || map[p.row - 1][p.col] === "#") {
      map[p.row][p.col] = ">";
      return false;
    } else {
      map[p.row - 1][p.col] = "^";
      map[p.row][p.col] = "X";
      return false;
    }
  }
  if (p.dir === ">") {
    if (p.col === map[0].length - 1) {
      map[p.col][p.row] = "X";
      return true;
    }
    if (p.col === map[0].length - 1 || map[p.row][p.col + 1] === "#") {
      map[p.row][p.col] = "v";
      return false;
    } else {
      map[p.row][p.col + 1] = ">";
      map[p.row][p.col] = "X";
      return false;
    }
  }
  if (p.dir === "v") {
    if (p.row === map.length - 1) {
      map[p.col][p.row] = "X";
      return true;
    }
    if (p.row === map.length - 1 || map[p.row + 1][p.col] === "#") {
      map[p.row][p.col] = "<";
      return false;
    } else {
      map[p.row + 1][p.col] = "v";
      map[p.row][p.col] = "X";
      return false;
    }
  }

  if (p.dir === "<") {
    if (p.col === 0) {
      map[p.col][p.row] = "X";
      return true;
    }
    if (p.col === 0 || map[p.row][p.col - 1] === "#") {
      map[p.row][p.col] = "^";
      return false;
    } else {
      map[p.row][p.col - 1] = "<";
      map[p.row][p.col] = "X";
      return false;
    }
  }
  return false;
}

if (import.meta.main) {
  await Solve(puzzle);
}

Deno.test("2024/day-4/part-1", async () => {
  const input = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;
  assertEquals(await puzzle.part1(input), 41);
});

Deno.test("2024/day-4/part-2", async () => {
  const input = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;
  assertEquals(await puzzle.part2?.(input), 6);
});
