# Scaling

We will use [pm2](https://pm2.keymetrics.io/) to run the server in production.

1. Create an ecosystem file `ecosystem.config.cjs`:

```javascript
module.exports = {
  apps: [
    {
      name: "tictactoe-api",
      script: "./build/src/index.js",
      interpreter: "node",
      exec_mode: "cluster",
    },
  ],
};
```

2. Build the project using `yarn build`.

3. Launch the server using `pm2 start ecosystem.config.cjs`.

4. Add an instance of the application with:

```bash
pm2 scale tictactoe-api +1
```

Check the performance with the `ab` utility:

```bash
ab -k -c 10 -n 100 "http://localhost:3000/games/"
```

Add two instances of the application and check the performance of the
application.
