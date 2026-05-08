const http = require("http");
const fs = require("fs");
const path = require("path");
const { handleNodeRequest } = require("./api/impact-footprints");
const { handleNodeRequest: handleHostImpactRequest } = require("./api/covener-impact-footprints");
const handleImpactImageRequest = require("./api/impact-image");

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

const redirects = {
  "/host": "/host/",
  "/facilitators": "/facilitators/",
  "/impact-footprints": "/impact-footprints/",
  "/convener": "/host/",
  "/convener/": "/host/",
  "/covener": "/host/",
  "/covener/": "/host/",
  "/Convener": "/host/",
  "/Convener/": "/host/",
  "/Covener": "/host/",
  "/Covener/": "/host/",
  "/Host": "/host/",
  "/Host/": "/host/",
  "/facilitators.html": "/facilitators/",
  "/impact-footprints.html": "/impact-footprints/",
  "/convener.html": "/host/",
  "/covener.html": "/host/",
};

http
  .createServer((req, res) => {
    const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);

    if (redirects[urlPath]) {
      res.writeHead(308, { Location: redirects[urlPath] });
      res.end();
      return;
    }

    if (urlPath === "/api/impact-footprints") {
      handleNodeRequest(req, res, root);
      return;
    }

    if (urlPath === "/api/impact-image") {
      const url = new URL(req.url || "/api/impact-image", "http://localhost");
      req.query = { path: url.searchParams.get("path") || "" };
      handleImpactImageRequest(req, res);
      return;
    }

    if (
      urlPath === "/api/host-impact-footprints" ||
      urlPath === "/api/covener-impact-footprints" ||
      urlPath === "/api/convener-impact-footprints"
    ) {
      handleHostImpactRequest(req, res, root);
      return;
    }

    const reqPath =
      urlPath === "/"
        ? "/index.html"
        : urlPath === "/facilitators/"
          ? "/facilitators/index.html"
          : urlPath === "/impact-footprints/"
            ? "/impact-footprints/index.html"
            : urlPath === "/host/"
              ? "/host/index.html"
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
