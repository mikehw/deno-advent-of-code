import { hasLoop } from "./day-6.ts";

self.onmessage = async (event: any) => {
  self.postMessage(hasLoop(event.data));
};
