# Tic Tac Toe

## Objectives

We will build an API that allow users to play a game of Tic Tac Toe. The API will allow users to create a game, make moves, and check the status of the game.

We will make it gradually more complex by adding features such as:

- Validating moves
- Checking for a winner
- Storing the game state in a database
- Use websockets for real-time updates

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)
- [Postman](https://www.getpostman.com/)

## Create a new project

```bash
npx degit gpichot/rapide/templates/node tictactoe
cd tictactoe
yarn install
```

If you are using JavaScript:

- add `"allowJs": true` to `tsconfig.json` in the `compilerOptions` section ;
- rename `src/index.ts` to `src/index.js` ;
- change the `dev` script in `package.json` to use `src/index.js` in place of
  `src/index.ts`.

Run the project with `yarn dev`.

**Note:** this uses a template I created to bootstrap node projects.
`yarn dev` will run nodemon that will restart the server when you make changes.

## [Express](./001-express.markdown)

## [Basic Game](./002-basic-game.markdown)

## [Database](./003-mongodb.markdown)

## [Testing](./004-testing.markdown)

## [WebSockets](./005-websockets.markdown)

## [Scaling](./006-scaling.markdown)

## Bonus: Use a Worker Thread to compute Fibonacci numbers

1. Create a new file `src/worker.cjs`.

ES Modules are not yet supported in Worker Threads so use CommonJS.

Check the [documentation](https://nodejs.org/api/worker_threads.html#worker_threads_worker_threads).
