import { Day, Solve } from "@mikehw/advent-of-code";
import { assert, assertEquals } from "@std/assert";

const puzzle: Day = {
  year: 2024,
  day: 3,
  part1: (input) => {
    const exp = /mul\(([0-9]+),([0-9]+)\)/gi;
    let sum = 0;
    for (const match of input.matchAll(exp)) {
      assert(match[1].length < 4);
      sum += parseInt(match[1]) * parseInt(match[2]);
    }
    return sum;
  },
  part2: (input) => {
    const mx = /mul\(([0-9]+),([0-9]+)\)/gi;
    const dox = /do\(\)/gi;
    const dontx = /don't\(\)/gi;
    const does = [...input.matchAll(dox)];
    const donts = [...input.matchAll(dontx)];
    let sum = 0;
    for (const match of input.matchAll(mx)) {
      // See if this is before the first dont
      if (match.index < donts[0].index) {
        sum += parseInt(match[1]) * parseInt(match[2]);
        continue;
      }
      // See if there is a do that comes closer to our index than a dont
      if (
        (donts.filter((d) => d.index < match.index).at(-1)?.index || 0) <
          (does.filter((d) => d.index < match.index).at(-1)?.index || 0)
      ) {
        sum += parseInt(match[1]) * parseInt(match[2]);
      }
    }
    return sum;
  },
};

if (import.meta.main) {
  await Solve(puzzle);
}

Deno.test("2024/day-3/part-1", async () => {
  const input =
    `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;
  assertEquals(await puzzle.part1(input), 161);
});

Deno.test("2024/day-3/part-2", async () => {
  const input =
    `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;
  assertEquals(await puzzle.part2?.(input), 48);
});
