import { Day, Solve } from "@mikehw/advent-of-code";
import { assert, assertEquals } from "@std/assert";

const puzzle: Day = {
  year: 2024,
  day: 9,
  part1: (input) => {
    const dataArray: string[] = []
    // Given a position, what is it's ID
    const dataIds: Record<number, number> = {}
    for(let i = 0; i < input.length; i++) {
      const c = input[i];
      const l = parseInt(c, 10)
      if (i%2 === 0) {
        const id = i / 2
        for (let j = 0; j < l; j++) {
          dataArray.push(c)
          dataIds[dataArray.length - 1] = id
        }
      } else {
        for (let j = 0; j < l; j++) {
          dataArray.push(".")
        }
      }
    }
    let front = dataArray.findIndex(c => c === ".")
    let end = dataArray.findLastIndex(c => c !== ".")
    while(end > front) {
      // Swap and find again
      const c = dataArray[end]
      dataArray[front] = c
      dataArray[end] = "."
      dataIds[front] = dataIds[end]
      delete dataIds[end] 
      front = dataArray.findIndex(c => c === ".")
      end = dataArray.findLastIndex(c => c !== ".")
    }

    let checksum = 0;
    for (let i = 0; i < dataArray.length - 1; i++) {
      if (dataArray[i] !== ".") {
        checksum += (dataIds[i] * i)
      }
    }
    return checksum
  },
  part2: (input) => {
    const dataArray: string[] = []
    // Given a position, what is it's ID
    const dataIds: Record<number, number> = {}
    const files: {length: number, startPos: number}[] = []
    for(let i = 0; i < input.length; i++) {
      const c = input[i];
      const l = parseInt(c, 10)
      if (i%2 === 0) {
        const id = i / 2
        files.push({length: l, startPos: dataArray.length})
        for (let j = 0; j < l; j++) {
          dataArray.push(c)
          dataIds[dataArray.length - 1] = id
        }
      } else {
        for (let j = 0; j < l; j++) {
          dataArray.push(".")
        }
      }
    }

    const swapIndex = (src: number, dest:number) => {
      const c = dataArray[src]
      dataArray[dest] = c
      dataArray[src] = "."
      dataIds[dest] = dataIds[src]
      delete dataIds[src] 
    }

    // Loop over files in reverse order, 
    // find the first gap that's large enough to fit,
    // then swap all indexes in the file to the space they fit
    files.reverse()
    for(const f of files) {
      for(let i = 0; i <= dataArray.length - f.length && i < f.startPos; i++) {
        if (dataArray.slice(i, i + f.length).every(c => c === ".")) {
          for(let s = 0; s <f.length; s++) {
            swapIndex(f.startPos + s, i + s)
          }
          break;
        }
      }
    }
    console.log(dataArray.join(""))
    let checksum = 0;
    for (let i = 0; i < dataArray.length - 1; i++) {
      if (dataArray[i] !== ".") {
        checksum += (dataIds[i] * i)
      }
    }
    return checksum
  },
};

if (import.meta.main) {
  await Solve(puzzle);
}

Deno.test("2024/day-9/part-1", async () => {
  const input = `2333133121414131402`;
  assertEquals(await puzzle.part1(input), 1928);
});

Deno.test("2024/day-9/part-2", async () => {
  const input = `2333133121414131402`;
  assertEquals(await puzzle.part2?.(input), 2858);
});
