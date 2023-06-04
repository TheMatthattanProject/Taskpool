// main.js
import { Worker } from "worker_threads";

export class TaskPool {
  constructor(workerCount) {
    this.workerCount = workerCount;
    this.idleWorkers = [];
    this.tasksQueue = [];
    this.initializeWorkers();
  }

  initializeWorkers() {
    for (let i = 0; i < this.workerCount; i++) {
      const worker = new Worker("./worker.js");
      this.idleWorkers.push(worker);
    }
  }

  async runTask(task) {
    return new Promise((resolve, reject) => {
      if (this.idleWorkers.length === 0) {
        this.tasksQueue.push({ task, resolve, reject });
      } else {
        const worker = this.idleWorkers.pop();
        worker.once("message", (result) => {
          resolve(result);
          this.returnWorkerToPool(worker);
        });
        worker.once("error", reject);
        worker.postMessage(task);
      }
    });
  }

  returnWorkerToPool(worker) {
    worker.removeAllListeners("message");
    worker.removeAllListeners("error");
    if (this.tasksQueue.length === 0) {
      this.idleWorkers.push(worker);
    } else {
      const { task, resolve, reject } = this.tasksQueue.shift();
      worker.once("message", (result) => {
        resolve(result);
        this.returnWorkerToPool(worker);
      });
      worker.once("error", reject);
      worker.postMessage(task);
    }
  }

  async shutdown() {
    for (const worker of this.idleWorkers) {
      worker.terminate();
    }
    this.idleWorkers = [];
  }
}
