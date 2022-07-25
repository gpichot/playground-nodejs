const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  if (req.url === "/ping") {
    const readStream = fs.createReadStream("test.text");
    readStream.pipe(res);
    return;
  }

  res.write("hello world");
});

server.listen(3123, "localhost", () => {
  console.log(`Server listening on http://localhost:3123`);
});
