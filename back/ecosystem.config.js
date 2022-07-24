module.exports = {
  apps: [
    {
      name: "app1",
      script: "./dist/index.js",
      instances: "2",
      exec_mode: "cluster",
      env: {
        PORT: 3123,
      },
    },
  ],
};
