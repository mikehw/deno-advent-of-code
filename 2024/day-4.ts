import { Day, Solve } from "@mikehw/advent-of-code";
import { assert, assertEquals } from "@std/assert";

const puzzle: Day = {
  year: 2024,
  day: 4,
  part1: (input) => {
    const m = input.split("\n");
    let count = 0;
    for (let row = 0; row < m.length; row++) {
      for (let col = 0; col < m[0].length; col++) {
        count += checkForSolution1(m, row, col);
      }
    }
    return count;
  },
  part2: (input) => {
    const m = input.split("\n");
    let count = 0;
    for (let row = 0; row < m.length; row++) {
      for (let col = 0; col < m[0].length; col++) {
        count += checkForSolution2(m, row, col);
      }
    }
    return count;
  },
};

function checkForSolution1(m: string[], row: number, col: number): number {
  if (m[row][col] !== "X") {
    return 0;
  }
  let finds = 0;
  // Check Up
  if (
    m[row - 1]?.[col] == "M" &&
    m[row - 2]?.[col] == "A" &&
    m[row - 3]?.[col] == "S"
  ) {
    finds++;
  }
  // Check Up Right
  if (
    m[row - 1]?.[col + 1] == "M" &&
    m[row - 2]?.[col + 2] == "A" &&
    m[row - 3]?.[col + 3] == "S"
  ) {
    finds++;
  }
  // Check Right
  if (
    m[row]?.[col + 1] == "M" &&
    m[row]?.[col + 2] == "A" &&
    m[row]?.[col + 3] == "S"
  ) {
    finds++;
  }
  // Check Down Right
  if (
    m[row + 1]?.[col + 1] == "M" &&
    m[row + 2]?.[col + 2] == "A" &&
    m[row + 3]?.[col + 3] == "S"
  ) {
    finds++;
  }
  // Check Down
  if (
    m[row + 1]?.[col] == "M" &&
    m[row + 2]?.[col] == "A" &&
    m[row + 3]?.[col] == "S"
  ) {
    finds++;
  }
  // Check Down Left
  if (
    m[row + 1]?.[col - 1] == "M" &&
    m[row + 2]?.[col - 2] == "A" &&
    m[row + 3]?.[col - 3] == "S"
  ) {
    finds++;
  }
  // Check Left
  if (
    m[row]?.[col - 1] == "M" &&
    m[row]?.[col - 2] == "A" &&
    m[row]?.[col - 3] == "S"
  ) {
    finds++;
  }
  // Check Up Left
  if (
    m[row - 1]?.[col - 1] == "M" &&
    m[row - 2]?.[col - 2] == "A" &&
    m[row - 3]?.[col - 3] == "S"
  ) {
    finds++;
  }
  return finds;
}

function checkForSolution2(m: string[], row: number, col: number): number {
  /*
M.S
.A.
M.S
  */
  if (
    m[row]?.[col] === "M" &&
    m[row]?.[col + 2] === "S" &&
    m[row + 1]?.[col + 1] === "A" &&
    m[row + 2]?.[col] === "M" &&
    m[row + 2]?.[col + 2] === "S"
  ) {
    return 1;
  }
  /*
M.M
.A.
S.S
  */
  if (
    m[row]?.[col] === "M" &&
    m[row]?.[col + 2] === "M" &&
    m[row + 1]?.[col + 1] === "A" &&
    m[row + 2]?.[col] === "S" &&
    m[row + 2]?.[col + 2] === "S"
  ) {
    return 1;
  }

  /*
S.M
.A.
S.M
  */
  if (
    m[row]?.[col] === "S" &&
    m[row]?.[col + 2] === "M" &&
    m[row + 1]?.[col + 1] === "A" &&
    m[row + 2]?.[col] === "S" &&
    m[row + 2]?.[col + 2] === "M"
  ) {
    return 1;
  }

  /*
S.S
.A.
M.M
  */
  if (
    m[row]?.[col] === "S" &&
    m[row]?.[col + 2] === "S" &&
    m[row + 1]?.[col + 1] === "A" &&
    m[row + 2]?.[col] === "M" &&
    m[row + 2]?.[col + 2] === "M"
  ) {
    return 1;
  }
  return 0;
}

if (import.meta.main) {
  await Solve(puzzle);
}

Deno.test("2024/day-4/part-1", async () => {
  const input = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;
  assertEquals(await puzzle.part1(input), 18);
});

Deno.test("2024/day-4/part-2", async () => {
  const input = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;
  assertEquals(await puzzle.part2?.(input), 9);
});
