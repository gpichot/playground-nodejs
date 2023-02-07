const {
  isMainThread,
  parentPort,
  Worker,
  workerData,
} = require("node:worker_threads");

function fibonacci(n) {
  if (n < 0)
    throw new Error(`n must be greater than or equal to 0, received ${n}`);
  if (n === 0) return 0;
  if (n === 1) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

function createWorker(n) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(__filename, {
      workerData: { n },
      type: "module",
    });
    worker.on("message", resolve);
    worker.on("error", reject);
    worker.on("exit", (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
}

if (!isMainThread) {
  const { n } = workerData;
  parentPort.postMessage(fibonacci(n));
}

exports.createWorker = createWorker;
