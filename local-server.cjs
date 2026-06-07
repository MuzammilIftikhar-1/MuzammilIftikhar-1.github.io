const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const host = process.env.HOST || "0.0.0.0";
const port = Number(process.env.PORT || process.argv[2] || 5173);

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".wav": "audio/wav",
  ".mp4": "video/mp4",
  ".pdf": "application/pdf",
};

const server = http.createServer((request, response) => {
  const requestUrl = new URL(request.url, `http://127.0.0.1:${port}`);
  let pathname = decodeURIComponent(requestUrl.pathname);
  if (pathname === "/") {
    pathname = "/index.html";
  }

  const relativePath = pathname.replace(/^\/+/, "");
  const filePath = path.resolve(root, relativePath);
  const rootWithSeparator = root.endsWith(path.sep) ? root : `${root}${path.sep}`;

  if (
    filePath.toLowerCase() !== root.toLowerCase() &&
    !filePath.toLowerCase().startsWith(rootWithSeparator.toLowerCase())
  ) {
    response.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    response.writeHead(200, {
      "Content-Type": mimeTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    response.end(data);
  });
});

server.listen(port, host);
