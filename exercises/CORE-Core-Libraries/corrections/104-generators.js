console.log("--- Exercise 1 ---");

// 1. Write a generator that yields the cube of numbers

function* cube() {
  let i = 0;
  while (true) {
    yield i * i * i;
    i++;
  }
}

// 2. Print the first 3 cubes using the generator function

const gen = cube();

console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);

// 3. Print the 10 first cubes using `for (const ... of ...)`

let count = 0;
for (const c of cube()) {
  console.log(c);
  count += 1;
  if (count === 10) break;
}
