# Time for some testing

## Installation

Install `ts-jest`, `@shelf/jest-mongodb`, and `supertest`.

```bash
yarn add --dev ts-jest @shelf/jest-mongodb supertest
```

Explanations:

- `ts-jest` will be used to transpile ES Modules
- `@shelf/jest-mongodb` will be used to spawn a mongodb during tests locally
- `supertest` will be used to simulate http requests.

## Configuration

Add a file `jest-mongodb-config.cjs` with the content (configuration for
`jest-mongodb`):

```javascript
module.exports = {
  mongodbMemoryServerOptions: {
    binary: {
      version: "6.0.4",
      skipMD5: true,
    },
    autoStart: false,
    instance: {},
  },
  mongoURLEnvName: "MONGODB_URI",
};
```

Add the following jest configuration in a `jest.config.cjs` file:

```javascript
module.exports = {
  preset: "@shelf/jest-mongodb",
  rootDir: "src",
  modulePathIgnorePatterns: ["<rootDir>/__tests__/utils"],
  transform: {
    "^.+\\.jsx?$": "ts-jest",
    "^.+\\.tsx?$": "ts-jest",
  },
  watchPathIgnorePatterns: ["<rootDir>/globalConfig.json"],
};
```

In `src/mongo.js` replace the mongodb connection with the following:

````javascript
if (process.env.NODE_ENV !== "test") {
  mongoose.connect(mongoUri);
}

👌 We are ready now!

## Adding tests

We will add tests for our Games router.

1. Starts by adding the following content in the `src/routes/games.test.js`
   file:

```javascript
import mongoose from "mongoose";
import supertest from "supertest";

import app from "../app";
import { Game } from "../models/game";

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI, { connectTimeoutMS: 2000 });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("GET /games/", () => {
  it("return the list of games", async () => {
    await Game.create({
      board: createNewBoard(),
    });

    const request = supertest(app);

    const response = await request.get("/games");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toMatchObject({
      _id: expect.any(String),
      board: [
        ["", "", ""],
        ["", "X", ""],
        ["", "", ""],
      ],
    });
  });
});

describe("POST /games/", () => {
  it.todo("creates a new game and returns it");
});

describe("GET /games/:id", () => {
  it.todo("returns a game");
});

describe("POST /games/:id/move", () => {
  it.todo("makes a move");

  it.todo("raises an error for an invalid move");

  it.todo("raises en an error for a move a ticked cell");

  it.todo("raises an error for a move on a finished game");

  it.todo("finish the game when there is a winner");
});
````

Take some time to understand what is happening here.

2. Run the tests with `yarn test -- --watch` or `npm run test -- --watch`.

One test is failing, fix it.

3. Complete the todo tests. To do so, remove the `.todo` from the `it` function
   calls. and add an async function as the second argument.
