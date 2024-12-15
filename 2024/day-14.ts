import { Day, Solve } from "@mikehw/advent-of-code";
import { assert, assertEquals } from "@std/assert";

interface Bot {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

let sizeX = 101;
let sizeY = 103;

const puzzle: Day = {
  year: 2024,
  day: 14,
  part1: (input) => {
    const lines = input.split("\n");
    const bots = parseBots(lines);
    for (let i = 0; i < 100; i++) {
      advanceBots(bots);
    }
    let q1 = 0, q2 = 0, q3 = 0, q4 = 0;
    for (const bot of bots) {
      // Top Left
      if (bot.x < Math.floor(sizeX / 2) && bot.y < Math.floor(sizeY / 2)) {
        q1++;
      }
      // Top Right
      if (bot.x > Math.floor(sizeX / 2) && bot.y < Math.floor(sizeY / 2)) {
        q2++;
      }
      // Bottom Left
      if (bot.x < Math.floor(sizeX / 2) && bot.y > Math.floor(sizeY / 2)) {
        q3++;
      }
      // Bottom right
      if (bot.x > Math.floor(sizeX / 2) && bot.y > Math.floor(sizeY / 2)) {
        q4++;
      }
    }
    return q1 * q2 * q3 * q4;
  },
  part2: async (input) => {
    const lines = input.split("\n");
    const bots = parseBots(lines);
    for (let i = 1; i < 100000; i++) {
      advanceBots(bots);
      await printBots(bots, i);
    }
  },
};

async function printBots(bots: Bot[], seconds: number) {
  const botPositions = new Set(bots.map((b) => `${b.x},${b.y}`));
  const rows = [];
  for (let y = 0; y < sizeY; y++) {
    let row = "";
    for (let x = 0; x < sizeX; x++) {
      row += botPositions.has(`${x},${y}`) ? "#" : " ";
    }
    rows.push(row);
  }
  if (rows.find((r) => r.includes("##########"))) {
    console.log(seconds);
    for (const row of rows) {
      console.log(row);
    }
    await prompt();
  }
}

function advanceBots(bots: Bot[]) {
  for (const bot of bots) {
    bot.x = (bot.x + bot.vx + sizeX) % sizeX;
    bot.y = (bot.y + bot.vy + sizeY) % sizeY;
  }
}

function parseBots(lines: string[]): Bot[] {
  const ret: Bot[] = [];
  const regex = /p=(-?\d+),(-?\d+)\s*v=(-?\d+),(-?\d+)/;
  for (const l of lines) {
    const match = l.match(regex);
    assert(match);
    ret.push({
      x: parseInt(match[1], 10),
      y: parseInt(match[2], 10),
      vx: parseInt(match[3], 10),
      vy: parseInt(match[4], 10),
    });
  }
  return ret;
}

if (import.meta.main) {
  await Solve(puzzle);
}

Deno.test("2024/day-14/part-1", async () => {
  sizeX = 11;
  sizeY = 7;
  const input = `p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`;
  assertEquals(await puzzle.part1(input), 12);
});

Deno.test("2024/day-14/part-2", async () => {
  sizeX = 11;
  sizeY = 7;
  const input = `p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`;
  assertEquals(await puzzle.part2?.(input), undefined);
});
