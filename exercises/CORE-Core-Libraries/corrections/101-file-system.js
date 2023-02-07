import fs from "fs";
import fsPromises from "fs/promises";
import { createGzip } from "zlib";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream/promises";

// There are two objectives to this exercise:
// 1. Learn how to use the fs module
// 2. Help you understand the difference between promises and blocking code

// You can execute this file using the following command:
//  ```bash
//  $ node 101-file-system.js
//  ```
// Check that you are in the correct directory.
//
console.log("--- Exercise 1: Blocking ---");

// 1. Using fs.readFileSync see: https://nodejs.org/api/fs.html#fsreadfilesyncpath-options
// Read the content of the files "resources/one.txt", "resources/two.txt" and "resources/three.txt"
// and print the content of the files to the console in the order they are read.
// Hint: Use console.log() to print the content of the files to the console.

const content1 = fs.readFileSync("resources/one.txt", "utf-8");
const content2 = fs.readFileSync("resources/two.txt", "utf-8");
const content3 = fs.readFileSync("resources/three.txt", "utf-8");
const mergedContent = content1 + content2 + content3;

console.log(mergedContent);

console.log("--- Exercise 2: Promises ---");

// 2. Using fsPromises.readFile see: https://nodejs.org/api/fs.html#fspromisesreadfilepath-options
// Read the content of the files "resources/one.txt", "resources/two.txt" and "resources/three.txt"
// and print the content of the files to the console in the order they are read.

async function mergeContent() {
  const contents = await Promise.all([
    fsPromises.readFile("resources/one.txt", "utf-8"),
    fsPromises.readFile("resources/two.txt", "utf-8"),
    fsPromises.readFile("resources/three.txt", "utf-8"),
  ]);
  console.log(contents);
  return contents.join("");
}

const mergedContent2 = await mergeContent();
console.log(mergedContent2);

// 3. Write the concatenation of the content of the files to a new file called "resources/all.txt"
// Hint: Use fsPromises.writeFile see: https://nodejs.org/api/fs.html#fspromiseswritefilefiledata-options

await fsPromises.writeFile("resources/all.txt", mergedContent2);
console.log("File written");

console.log("--- Exercise 3: Streams (Bonus) ---");

// 4. Compressing files
// Using fs.createReadStream see: https://nodejs.org/api/fs.html#fs_fs_createreadstream_path_options
// and fs.createWriteStream see: https://nodejs.org/api/fs.html#fs_fs_createwritestream_path_options
// as well as zlib.createGzip see: https://nodejs.org/api/zlib.html#zlib_zlib_creategzip_options
//
// Compress the concatenation of the file "resources/all.text" generated in exercise 2
//
// Example:
//   ```javascript
//   import { createGzip } from "zlib";
//   import { createReadStream, createWriteStream } from "fs";
//   import { pipeline } from "stream";
//
// You can test the result by running the following command in the terminal:
//  ```bash
//  $ gunzip --stdout resources/all.txt.gz
//  ```

try {
  await pipeline(
    createReadStream("resources/all.txt"),
    createGzip(),
    createWriteStream("resources/all.txt.gz")
  );
  console.log("File compressed");
} catch (err) {
  console.error("Pipeline failed.", err);
}
