import { Day, Solve } from "@mikehw/advent-of-code";
import { assertEquals } from "@std/assert";

const puzzle: Day = {
  year: 2023,
  day: 1,
  part1: (input: string) => {
    let sum = 0;
    for (const line of input.split("\n")) {
      const digits = line.replaceAll(/[^0-9]/g, "");
      const num = parseInt(digits[0]) * 10 +
        parseInt(digits[digits.length - 1]);
      sum += num;
    }
    return sum.toString();
  },
};

if (import.meta.main) {
  await Solve(puzzle);
}

Deno.test("2023/day-1/part-1", async () => {
  const input = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;
  assertEquals(await puzzle.part1(input), "142");
});
