import { createCSV } from "./saveToCSV.js";
import { TaskPool } from "./TaskPool.js";

const input_data = [1, 2, 3];

const maxConcurrentRequests = 8;

const taskPool = new TaskPool(maxConcurrentRequests);
const results = await Promise.all(
  input_data.map((task) => taskPool.runTask(task))
);
await taskPool.shutdown();

const final_results = results.flat();

console.log("All tasks completed.");

createCSV("./output/example.csv", final_results);
