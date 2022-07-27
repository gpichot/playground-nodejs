module.exports = {
    apps: [
        {
            name: "app1",
            node_args: "-r ts-node/register -r tsconfig-paths/register",
            script: "./dist/index.js",
            instances: "2",
            exec_mode: "cluster",
            env: {
                PORT: 3001,
                TS_NODE_BASEURL: "./dist",
            },
        },
    ],
};