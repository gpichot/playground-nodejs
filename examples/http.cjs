const http = require("http");

function fibonacci(n) {
  if (n === 0 || n === 1) {
    return n;
  }
  return fibonacci(n - 2) + fibonacci(n - 1);
}

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  if (req.url === "/fibonacci") {
    res.end(fibonacci(5).toString());
    return;
  }

  res.end("Hello word");
});

server.listen(3123, "localhost", () => {
  console.log("server listening on http://localhost:3123");
});
