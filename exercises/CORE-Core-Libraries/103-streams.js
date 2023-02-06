import fs from "fs";
import stream from "stream";

// Prime number generator function using the Sieve of Eratosthenes
function* primeNumbers(limit) {
  let n = 2;
  const primes = [];
  while (true) {
    if (n > limit) break;
    if (primes.every((p) => n % p !== 0)) {
      primes.push(n);
      yield n;
    }
    n += 1;
  }
}

console.log("--- Exercise 1 ---");
// A. Using the primeNumbers generator above, write the prime numbers <
// 1000_000 to a file
//
// 1. Use `stream.Readable.from` to create a readable stream from the generator
//   See: https://nodejs.org/api/stream.html#streamreadablefromiterable-options
// 2. Use `stream.pipeline` to pipe the stream to a file.
//  See: https://nodejs.org/api/fs.html#fscreatewritestreampath-options
// Hint: you may need to yield `strings` or Buffer from the generator in place
// of numbers

console.log("--- Exercise 2 ---");
// B. Using the primeNumbers generator above, write the square of the prime
// numbers < 1000_000 to a file
//
// 1. Implements a transform stream that squares the numbers it receives
//    See: https://nodejs.org/api/stream.html#implementing-a-transform-stream
// You may use the object mode to avoid converting to/from strings
