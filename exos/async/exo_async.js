const fsPromised = require("fs/promises");

async function mergeFiles() {
  try {
    const file1 = fsPromised.readFile("file1.txt", "utf8");
    const file2 = fsPromised.readFile("file2.txt", "utf8");
    const file3 = fsPromised.readFile("file3.txt", "utf8");

    const contents = await Promise.all([file1, file2, file3]);

    return contents.join(" ");
  } catch (e) {
    console.log(e);
  }
}

mergeFiles().then(console.log);
