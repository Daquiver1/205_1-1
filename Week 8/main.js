const http = require("http");

const HOSTNAME = "127.0.0.1";
const PORT = 4200;

const server = http.createServer((req, res) => {
  const { method, url } = req;

  // Parse the URL and query string using the URL module
  const parsedUrl = new URL(url, `http://${req.headers.host}`);

  switch (method) {
    case "GET":
      if (parsedUrl.pathname === "/resource") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "GET request received" }));
      } else {
        res.writeHead(404);
        res.end();
      }
      break;

    case "POST":
      if (parsedUrl.pathname === "/resource") {
        let body = "";
        req.on("data", (chunk) => {
          body += chunk.toString();
        });
        req.on("end", () => {
          res.writeHead(201, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              message: "POST request received",
              body: JSON.parse(body),
            })
          );
        });
      } else {
        res.writeHead(404);
        res.end();
      }
      break;

    case "PUT":
      if (parsedUrl.pathname === "/resource") {
        let body = "";
        req.on("data", (chunk) => {
          body += chunk.toString();
        });
        req.on("end", () => {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              message: "PUT request received",
              body: JSON.parse(body),
            })
          );
        });
      } else {
        res.writeHead(404);
        res.end();
      }
      break;

    case "DELETE":
      if (parsedUrl.pathname === "/resource") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "DELETE request received" }));
      } else {
        res.writeHead(404);
        res.end();
      }
      break;

    default:
      res.writeHead(405);
      res.end(`Method ${method} not allowed`);
      break;
  }
});

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server running on port ${PORT}`);
});
