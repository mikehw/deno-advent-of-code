import { assertEquals, assertRejects } from "@std/assert";
import { spy, stub } from "@std/testing/mock";
import { join } from "@std/path";
import { getInputForDay } from "./utils.ts";

Deno.test("getInputForDay", async (t) => {
  const originalEnv = Deno.env.get("ADVENT_OF_CODE_SESSION_COOKIE");

  await t.step("should throw error if no session cookie", async () => {
    Deno.env.delete("ADVENT_OF_CODE_SESSION_COOKIE");
    await assertRejects(
      () => getInputForDay(2023, 1),
      Error,
      "ADVENT_OF_CODE_SESSION_COOKIE enviornment variable is required",
    );
    cleanup(originalEnv);
  });

  await t.step("should fetch input from cache if exists", async () => {
    const statStub = stub(Deno, "stat", () => Promise.resolve<any>({}));
    const readStub = stub(
      Deno,
      "readTextFile",
      () => Promise.resolve("cached input"),
    );

    try {
      const input = await getInputForDay(2023, 1);
      assertEquals(input, "cached input");
    } finally {
      statStub.restore();
      readStub.restore();
    }
    cleanup(originalEnv);
  });

  await t.step("should fetch input from web and cache", async () => {
    // Set up test session cookie
    Deno.env.set("ADVENT_OF_CODE_SESSION_COOKIE", "test-session-cookie");

    // Stub fetch to return mock response
    const fetchStub = stub(globalThis, "fetch", () =>
      Promise.resolve({
        text: () => Promise.resolve("web fetched input\n"),
        ok: true,
      } as Response));

    const statStub = stub(Deno, "stat", () => {
      throw new Deno.errors.NotFound();
    });

    // Spy on Deno.mkdir and Deno.writeTextFile
    const mkdirSpy = spy(Deno, "mkdir");
    const writeFileSpy = spy(Deno, "writeTextFile");

    try {
      const input = await getInputForDay(2023, 1);

      // Verify input is trimmed
      assertEquals(input, "web fetched input");

      // Verify cache directory was created
      assertEquals(mkdirSpy.calls.length, 1);

      // Verify file was written to cache
      assertEquals(writeFileSpy.calls.length, 1);
      assertEquals(
        writeFileSpy.calls[0].args[0],
        join(Deno.cwd(), ".inputs", "2023_1.txt"),
      );
      assertEquals(writeFileSpy.calls[0].args[1], "web fetched input");

      Deno.remove(join(Deno.cwd(), ".inputs", "2023_1.txt"));
      Deno.remove(join(Deno.cwd(), ".inputs"));
    } finally {
      fetchStub.restore();
      statStub.restore();
      mkdirSpy.restore();
      writeFileSpy.restore();
    }
    cleanup(originalEnv);
  });
});

function cleanup(originalEnv: string | undefined) {
  if (originalEnv) {
    Deno.env.set("ADVENT_OF_CODE_SESSION_COOKIE", originalEnv);
  } else {
    Deno.env.delete("ADVENT_OF_CODE_SESSION_COOKIE");
  }
}
