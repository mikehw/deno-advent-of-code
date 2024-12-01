import { join } from "@std/path";

export async function getInputForDay(
  year: number,
  day: number,
): Promise<string> {
  const CACHE_DIR = join(Deno.cwd(), ".inputs");
  const cacheFile = join(CACHE_DIR, `${year}_${day}.txt`);
  try {
    await Deno.stat(cacheFile);
    return await Deno.readTextFile(cacheFile);
  } catch (err) {
    if (!(err instanceof Deno.errors.NotFound)) {
      throw err;
    }
  }
  const session = Deno.env.get("ADVENT_OF_CODE_SESSION_COOKIE");
  if (!session) {
    throw new Error(
      "ADVENT_OF_CODE_SESSION_COOKIE enviornment variable is required",
    );
  }
  const headers = new Headers({
    Cookie: `session=${session}`,
  });
  const resp = await fetch(
    `https://adventofcode.com/${year}/day/${day}/input`,
    {
      headers,
      credentials: "include",
    },
  ).catch((err) => {
    console.error(
      `Error fetching https://adventofcode.com/${year}/day/${day}/input: `,
      err,
    );
    Deno.exit(1);
  });
  const data = (await resp.text()).trim();
  await Deno.mkdir(CACHE_DIR, { recursive: true });
  await Deno.writeTextFile(cacheFile, data);
  return data;
}
