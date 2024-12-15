import { Day, Solve } from "@mikehw/advent-of-code";
import { assertEquals } from "@std/assert";

/**
 * it costs 3 tokens to push the A button and 1 token to push the B button.
 * You estimate that each button would need to be pressed no more than 100 times to win a prize.
 */
interface Machine {
  ax: number;
  ay: number;
  bx: number;
  by: number;
  prizex: number;
  prizey: number;
}

const puzzle: Day = {
  year: 2024,
  day: 13,
  part1: (input) => {
    const machines = getMachines(input, 0);
    let sum = 0;
    for (const m of machines) {
      sum += getCheapestCombination(m);
    }
    return sum;
  },
  part2: (input) => {
    const machines = getMachines(input, 10000000000000);
    let sum = 0;
    for (const m of machines) {
      sum += getCheapestCombination(m);
    }
    return sum;
  },
};

function getMachines(input: string, prizeShift: number): Machine[] {
  const ret: Machine[] = [];
  const lines = input.split("\n");
  for (let l = 0; l < lines.length; l += 4) {
    const aLine = lines[l].substring("Button A: X+".length).split(",");
    const ax = parseInt(aLine[0]);
    const ay = parseInt(aLine[1].substring(" Y+".length));
    const bLine = lines[l + 1].substring("Button B: X+".length).split(",");
    const bx = parseInt(bLine[0]);
    const by = parseInt(bLine[1].substring(" Y+".length));
    const pLine = lines[l + 2].substring("Prize: X=".length).split(",");
    const prizex = parseInt(pLine[0]) + prizeShift;
    const prizey = parseInt(pLine[1].substring(" Y=".length)) + prizeShift;
    ret.push({
      ax,
      ay,
      bx,
      by,
      prizex,
      prizey,
    });
  }
  return ret;
}

function getCheapestCombination(m: Machine) {
  const tolerance = 0.0000001;
  // Linear equation for how many times A and B are pressed
  const A = (m.bx * m.prizey - m.by * m.prizex) / (m.bx * m.ay - m.by * m.ax);
  const B = (m.prizex - m.ax * A) / m.bx;
  // Check if A and B are very close to being whole numbers, then there is a solution
  if (
    Math.abs(A - Math.round(A)) < tolerance &&
    Math.abs(B - Math.round(B)) < tolerance
  ) {
    return 3 * A + B;
  }
  return 0;
}

if (import.meta.main) {
  await Solve(puzzle);
}

Deno.test("2024/day-13/part-1", async () => {
  const input = `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`;
  assertEquals(await puzzle.part1(input), 480);
});

Deno.test("2024/day-13/part-2", async () => {
  const input = `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`;
  assertEquals(await puzzle.part2?.(input), 875318608908);
});
