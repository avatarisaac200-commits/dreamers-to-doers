const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.join(__dirname, "..");
const IMPACT_ROOT = path.join(ROOT_DIR, "facilitators", "Impact-footprints");

const TYPES = {
  ".gif": "image/gif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

function getRequestedPath(req) {
  const raw = Array.isArray(req.query?.path) ? req.query.path[0] : req.query?.path;
  return typeof raw === "string" ? raw : "";
}

function send(res, statusCode, body, contentType = "text/plain; charset=utf-8") {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", contentType);
  res.end(body);
}

module.exports = async function handler(req, res) {
  try {
    const relativePath = getRequestedPath(req).replace(/^\/+/, "");
    if (!relativePath) {
      send(res, 400, "Missing path");
      return;
    }

    const normalized = path.normalize(relativePath);
    const filePath = path.join(IMPACT_ROOT, normalized);

    if (!filePath.startsWith(IMPACT_ROOT)) {
      send(res, 403, "Forbidden");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    if (!TYPES[ext]) {
      send(res, 400, "Unsupported file type");
      return;
    }

    fs.readFile(filePath, (error, data) => {
      if (error) {
        send(res, 404, "Not found");
        return;
      }

      res.statusCode = 200;
      res.setHeader("Content-Type", TYPES[ext]);
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      res.end(data);
    });
  } catch (error) {
    send(res, 500, error.message || "Internal Server Error");
  }
};
