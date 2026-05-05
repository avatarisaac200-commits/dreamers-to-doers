const http = require("http");
const fs = require("fs");
const path = require("path");
const { handleNodeRequest } = require("./api/impact-footprints");
const { handleNodeRequest: handleCovenerImpactRequest } = require("./api/covener-impact-footprints");

const root = __dirname;
const port = process.env.PORT || 3000;

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".md": "text/plain; charset=utf-8",
};

http
  .createServer((req, res) => {
    const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);

    if (urlPath === "/api/impact-footprints") {
      handleNodeRequest(req, res, root);
      return;
    }

    if (urlPath === "/api/covener-impact-footprints") {
      handleCovenerImpactRequest(req, res, root);
      return;
    }

    const reqPath =
      urlPath === "/"
        ? "/index.html"
        : urlPath === "/facilitators" || urlPath === "/facilitators/"
          ? "/facilitators.html"
          : urlPath === "/impact-footprints" || urlPath === "/impact-footprints/"
            ? "/impact-footprints.html"
          : urlPath === "/covener" || urlPath === "/covener/"
            ? "/covener.html"
          : urlPath;
    const filePath = path.normalize(path.join(root, reqPath));

    if (!filePath.startsWith(root)) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("Not found");
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, {
        "Content-Type": types[ext] || "application/octet-stream",
      });
      res.end(data);
    });
  })
  .listen(port, () => {
    console.log(`Masterclass standalone server running on http://localhost:${port}`);
  });
