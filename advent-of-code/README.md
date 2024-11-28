# Advent of Code Runner

Advent of code runner helps with fetching input from adventofcode.com.

Set the env variable `ADVENT_OF_CODE_SESSION_COOKIE` to your adventofcode.com
session cookie value.

Create your solutions for the day in a file, write tests, and then solve with
your input.

```ts
import { Day, Solve } from "@mikehw/advent-of-code";
import { assertEquals } from "@std/assert";

const puzzle: Day = {
  year: 2023,
  day: 1,
  part1: (input: string): string => {
    return input.length.toString();
  },
};

Deno.test("2023/day-1/part-1", async () => {
  const input = `hello world!`;
  assertEquals(await puzzle.part1(input), "12");
});

if (import.meta.main) {
  await Solve(puzzle);
}
```

To test run `deno test day1.ts`

If you are using a `.env` file to store your session value, for example

```
ADVENT_OF_CODE_SESSION_COOKIE = "abc123"
```

Use this command to run the puzzle with your official input

`deno run -A --env-file day1.ts`
