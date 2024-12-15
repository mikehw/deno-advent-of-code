import { Day, Solve } from "@mikehw/advent-of-code";
import { assertEquals } from "@std/assert";

interface Plot {
  coordinates: Set<string>;
  type: string;
}

const puzzle: Day = {
  year: 2024,
  day: 12,
  part1: (input) => {
    const map = input.split("\n").map((line) => line.split(""));

    const plots: Plot[] = [];

    // For each r:c, which index in plots does that position belong to
    const posPlot: Record<string, number> = {};
    let sum = 0;
    for (let r = 0; r < map.length; r++) {
      for (let c = 0; c < map[0].length; c++) {
        if (posPlot[`${r}:${c}`] !== undefined) {
          continue;
        }
        const coordinates: Set<string> = new Set();
        const perimeter = findPlot1(
          map,
          r,
          c,
          posPlot,
          plots.length,
          coordinates,
        );
        plots.push({ coordinates, type: map[r][c] });
        const area = coordinates.size;
        sum += area * perimeter;
      }
    }
    return sum;
  },
  part2: (input) => {
    const map = input.split("\n").map((line) => line.split(""));

    const plots: Plot[] = [];

    // For each r:c, which index in plots does that position belong to
    const posPlot: Record<string, number> = {};
    let sum = 0;
    for (let r = 0; r < map.length; r++) {
      for (let c = 0; c < map[0].length; c++) {
        if (posPlot[`${r}:${c}`] !== undefined) {
          continue;
        }
        const coordinates: Set<string> = new Set();
        const perimeter = findPlot1(
          map,
          r,
          c,
          posPlot,
          plots.length,
          coordinates,
        );
        plots.push({ coordinates, type: map[r][c] });
        const area = coordinates.size;
        // sides is the perimeter, minus the number of shared edges
        console.log("checking", map[r][c]);

        console.log(
          input.replaceAll(new RegExp(`[^${map[r][c]}\n]`, "g"), "."),
        );
        const sides = perimeter - redundantParimeters(coordinates);
        console.log("perimeter", perimeter);
        console.log("edges", sides);
        //console.log(area, perimeter, edges);
        sum += area * sides;
      }
    }
    return sum;
  },
};

function findPlot1(
  map: string[][],
  r: number,
  c: number,
  posPlot: Record<string, number>,
  plotIndex: number,
  coordinates: Set<string>,
): number {
  if (posPlot[`${r}:${c}`] !== undefined) {
    return 0;
  }
  const t = map[r][c];
  posPlot[`${r}:${c}`] = plotIndex;
  coordinates.add(`${r}:${c}`);
  let p = 4;
  // add to coordinates and recurse
  // up
  if (map[r - 1]?.[c] === t) {
    p -= 1;
    p += findPlot1(map, r - 1, c, posPlot, plotIndex, coordinates);
  }
  // right
  if (map[r]?.[c + 1] === t) {
    p -= 1;
    p += findPlot1(map, r, c + 1, posPlot, plotIndex, coordinates);
  }
  // down
  if (map[r + 1]?.[c] === t) {
    p -= 1;
    p += findPlot1(map, r + 1, c, posPlot, plotIndex, coordinates);
  }
  // left
  if (map[r]?.[c - 1] === t) {
    p -= 1;
    p += findPlot1(map, r, c - 1, posPlot, plotIndex, coordinates);
  }
  return p;
}

function redundantParimeters(coordinates: Set<string>): number {
  let count = 0;
  for (const coord of coordinates) {
    const [r, c] = coord.split(":").map((c) => parseInt(c, 10));
    console.log("checking", r, c);
    // Check if this is a parmeter on the top
    if (!coordinates.has(`${r - 1}:${c}`)) {
      // If this has a coordinate to the left and not above the one on the left, then the top parimeter is repeated edge
      if (
        coordinates.has(`${r}:${c - 1}`) &&
        !coordinates.has(`${r - 1}:${c - 1}`)
      ) {
        console.log("repeated parimeter on top");
        count++;
      }
    }
    // Check if this is a parmeter on the bottom
    if (!coordinates.has(`${r + 1}:${c}`)) {
      // If this has a coordinate to the left, and not the one below on the left, then the bottom parimeter is repeated edge
      if (
        coordinates.has(`${r}:${c - 1}`) &&
        !coordinates.has(`${r + 1}:${c - 1}`)
      ) {
        console.log("repeated parimeter on bottom");
        count++;
      }
    }
    // Check if this is a parmeter on the left
    if (!coordinates.has(`${r}:${c - 1}`)) {
      // If this has a coordinate to above and not above to the left, then the left parimeter is repeated edge
      if (
        coordinates.has(`${r - 1}:${c}`) &&
        !coordinates.has(`${r - 1}:${c - 1}`)
      ) {
        console.log("repeated parimeter on left");
        count++;
      }
    }
    // Check if this is a parmeter on the right
    if (!coordinates.has(`${r}:${c + 1}`)) {
      // If this has a coordinate to above and not above to the right, then the left parimeter is repeated edge
      if (
        coordinates.has(`${r - 1}:${c}`) &&
        !coordinates.has(`${r - 1}:${c + 1}`)
      ) {
        console.log("repeated parimeter on right");
        count++;
      }
    }
  }
  console.log("Repeated Parimeters", count);
  return count;
}

if (import.meta.main) {
  await Solve(puzzle);
}

Deno.test("2024/day-12/part-1-1", async () => {
  const input = `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`;
  assertEquals(await puzzle.part1(input), 1930);
});

Deno.test("2024/day-12/part-1-2", async () => {
  const input = `OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`;
  assertEquals(await puzzle.part1(input), 772);
});

Deno.test("2024/day-12/part-1-3", async () => {
  const input = `AAAA
BBCD
BBCC
EEEC`;
  assertEquals(await puzzle.part1(input), 140);
});

Deno.test("2024/day-12/part-2", async () => {
  const input = `AAAA
BBCD
BBCC
EEEC`;
  assertEquals(await puzzle.part2?.(input), 80);
});
