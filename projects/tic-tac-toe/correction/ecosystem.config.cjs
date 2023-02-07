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
