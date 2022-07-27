//Blocking IO (Sequential)
/*const fs = require("fs");

let texte =
  fs.readFileSync("one.txt", "utf-8") +
  fs.readFileSync("two.txt", "utf-8") +
  fs.readFileSync("three.txt", "utf-8");
console.log(texte);*/

//Concurrent (promises)
const fs = require("fs/promises");
async function texte() {
  let txt1 = fs.readFile("one.txt", "utf-8");
  let txt2 = await fs.readFile("two.txt", "utf-8");
  let txt3 = await fs.readFile("three.txt", "utf-8");
  return txt1 + txt2 + txt3;
}

//texte().then(console.log);
texte().then((result) => console.log(result));

async function mergeFiles() {
  let txt1 = fs.readFile("one.txt", "utf-8");
  let txt2 = fs.readFile("two.txt", "utf-8");
  let txt3 = fs.readFile("three.txt", "utf-8");

  const content = await Promise.all([txt1, txt2, txt3]);
  return content.join(" ");
}

mergeFiles().then(console.log);

//Stream (début exemple, reste à faire une boucle par exemple),
//attention aux mélanges de contenus si fichiers pas de même taille etc...
const readable = fs.createReadStream("./one.txt", "utf-8");
const writable = fs.createWriteStream("./output.txt", "utf-8");
readable.pipe(writable);
