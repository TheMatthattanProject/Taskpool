import { parentPort } from "worker_threads";
import { task } from "./task.js";

parentPort.on("message", async (input) => {
  const result = await task(input);
  parentPort.postMessage(result);
});
