import { stdin, stdout } from "process";
import fs from "node:fs/promises";

function fibonacci(n) {
  if (n < 0)
    throw new Error(`n must be greater than or equal to 0, received ${n}`);
  if (n === 0) return 0;
  if (n === 1) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Run this file using the following command:
// ```bash
// $ node 102-readline.js
// ```

console.log("--- Exercise 1: Readline ---");

// 1. Using the readline module see: https://nodejs.org/api/readline.html
//
// Create a readline interface using the stdin and stdout streams that ask
// the user for a number and then print the n-th number of the fibonacci sequence.
//
// Hint: Use createInterface see: https://nodejs.org/api/readline.html#readline_readline_createinterface_options
//
// Use the async/await syntax to make the code more readable.

try {
  const contents = fs
    .readFile("./helloidonotexists.txt", "utf8")
    .catch(console.log);
} catch (e) {
  console.log(e);
}

setTimeout(() => console.log("Hello again"), 2000);
