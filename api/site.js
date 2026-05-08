const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.join(__dirname, "..");

const TYPES = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/plain; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

function resolveRequestPath(urlPath) {
  if (urlPath === "/" || urlPath === "") {
    return "index.html";
  }

  if (urlPath === "/facilitators" || urlPath === "/facilitators/") {
    return path.join("facilitators", "index.html");
  }

  if (urlPath === "/impact-footprints" || urlPath === "/impact-footprints/") {
    return path.join("impact-footprints", "index.html");
  }

  if (
    urlPath === "/host" ||
    urlPath === "/host/" ||
    urlPath === "/Host" ||
    urlPath === "/Host/" ||
    urlPath === "/convener" ||
    urlPath === "/convener/" ||
    urlPath === "/Convener" ||
    urlPath === "/Convener/" ||
    urlPath === "/covener" ||
    urlPath === "/covener/" ||
    urlPath === "/Covener" ||
    urlPath === "/Covener/"
  ) {
    return path.join("host", "index.html");
  }

  return urlPath.replace(/^\/+/, "");
}

module.exports = async function handler(req, res) {
  try {
    const rawPath = Array.isArray(req.query?.path)
      ? req.query.path.join("/")
      : req.query?.path;
    const requestedPath = rawPath ? `/${rawPath}` : (req.url || "/").split("?")[0];
    const urlPath = decodeURIComponent(requestedPath);
    const relativePath = resolveRequestPath(urlPath);
    const filePath = path.normalize(path.join(ROOT_DIR, relativePath));

    if (!filePath.startsWith(ROOT_DIR)) {
      res.statusCode = 403;
      res.end("Forbidden");
      return;
    }

    const stats = fs.existsSync(filePath) ? fs.statSync(filePath) : null;
    const finalPath =
      stats && stats.isDirectory() ? path.join(filePath, "index.html") : filePath;

    fs.readFile(finalPath, (error, data) => {
      if (error) {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        res.end("Not found");
        return;
      }

      res.statusCode = 200;
      res.setHeader(
        "Content-Type",
        TYPES[path.extname(finalPath).toLowerCase()] || "application/octet-stream"
      );
      res.end(data);
    });
  } catch (error) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end(error.message || "Internal Server Error");
  }
};
