# Express

1. Add express using

```bash
npm add express
# With Typescript add the types with
npm add --save-dev @types/express
```

2. In the index file, add the following code:

```typescript
import app from "./app";

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
```

3. Create a new file `app.ts` in the `src` folder and add the following code:

```typescript
import express from "express";

const app = express();

export default app;
```

4. Add a route `GET /` that returns a welcome message in `app.ts`.

Reminder:

```typescript
app.get("/my-route", (req, res) => {
  res.send("Welcome to Tic Tac Toe");
});
```

You can test it with Postman, Insomnia or curl:

```bash
curl http://localhost:3000
```

5. Create a route `GET /fibonacci/:n` that returns the nth number of the Fibonacci sequence.

Reminder: Retrieve the value of `n` from `req.params.n`.

Use the Fibonacci sequence formula [from readline exercise](../../exercises/CORE-Core-Libraries/102-readline.js).

Curl the `/fibonacci/10` route and check that you get the correct result.

Curl the `/fibonacci/44` route. What happens? Why? Can you curl another route?

At this point, you may want to kill the dev server and restart it.
