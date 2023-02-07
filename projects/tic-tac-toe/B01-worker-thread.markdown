# Worker Threads

1. Create a new file `src/worker.cjs` and add the following code:

```javascript
const {
  isMainThread,
  parentPort,
  Worker,
  workerData,
} = require("node:worker_threads");

function createWorker(n) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(__filename, {
      workerData: {
        /* ... */
      },
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
  const {
    /* ... */
  } = workerData;
  parentPort.postMessage(/* ... */);
}

exports.createWorker = createWorker;
```

ES Modules are not yet supported in Worker Threads so we need to use CommonJS.

Check the [documentation](https://nodejs.org/api/worker_threads.html#worker_threads_worker_threads).

Complete the code to compute the nth Fibonacci number in the worker.

Use the `createWorker` function in `src/app.js` to compute the nth Fibonacci number in your `GET /fibonacci/:n` route.

Check that the server is still responsive when computing the Fibonacci number.
