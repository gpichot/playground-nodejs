import fs from "fs";
import stream from "stream";
import { pipeline } from "stream/promises";

// Prime number generator function using the Sieve of Eratosthenes
function* primeNumbers(limit) {
  let n = 2;
  const primes = [];
  while (true) {
    if (n > limit) break;
    const sn = Math.sqrt(n);
    const primesToCheck = primes.filter((p) => p <= sn);
    if (primesToCheck.every((p) => n % p !== 0)) {
      primes.push(n);
      // yield n.toString() + "\n";
      yield n;
    }
    if (n === 2) n++;
    else n += 2;
  }
}

console.log("--- Exercise 1 ---");
// A. Using the primeNumbers generator above, write the prime numbers <
// 10_000 to a file
//
// 1. Use `stream.Readable.from` to create a readable stream from the generator
//   See: https://nodejs.org/api/stream.html#streamreadablefromiterable-options
// 2. Use `stream.pipeline` to pipe the stream to a file.
//  See: https://nodejs.org/api/fs.html#fscreatewritestreampath-options
// Hint: you may need to yield `strings` or Buffer from the generator in place
// of numbers

// Comment/uncomment the following lines and the line 15/16
// const primeStream = new stream.Readable.from(primeNumbers(10_000));
//
// try {
//   pipeline(
//     primeStream,
//     fs.createWriteStream("prime-numbers-1.txt", { encoding: "utf-8" })
//   );
// } catch(err) {
//  console.error(err);
// }

console.log("--- Exercise 2 ---");
// B. Using the primeNumbers generator above, write the square of the prime
// numbers < 10_000 to a file
//
// 1. Implements a transform stream that squares the numbers it receives
//    See: https://nodejs.org/api/stream.html#implementing-a-transform-stream
// You may use the object mode to avoid converting to/from strings

const squareStream = new stream.Readable.from(primeNumbers(10_000), {
  objectMode: true,
});

const transformStream = new stream.Transform({
  objectMode: true,
  transform(chunk, encoding, callback) {
    this.push(chunk.toString() + "\n");
    //this.push((chunk * chunk).toString() + "\n");
    callback();
  },
});

try {
  await pipeline(
    squareStream,
    transformStream,
    fs.createWriteStream("prime-numbers-2.txt")
  );
  console.log("Pipeline succeeded.");
} catch (err) {
  console.error("Pipeline failed.", err);
}
