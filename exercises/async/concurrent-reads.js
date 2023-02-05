import fs from "fs/promises";

function sleep(timeInMilliseconds) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, timeInMilliseconds);
  });
}

async function readFileA() {
  const fileA = await fs.readFile("fileA.txt");

  await sleep(1000);

  return { content: fileA.toString("utf8"), filename: "fileA.txt" };
}

async function readFileB() {
  const fileB = await fs.readFile("fileB.txt", "utf8");

  return { content: fileB, filename: "fileB.txt" };
}

readFileA().then(console.log);
readFileB().then(console.log);
