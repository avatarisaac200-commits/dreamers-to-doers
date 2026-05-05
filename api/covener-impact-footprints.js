const fs = require("fs");
const path = require("path");

const COVENER = {
  name: "Anna Ajibade",
  image: "/amara-4.jpg",
  impactFolder: "Covener",
  highlight: "Add JPG or JPEG images into the folders below and they will appear here automatically.",
};

function listProjectImages(projectDir, projectSlug) {
  return fs
    .readdirSync(projectDir, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .filter((entry) => /\.(png|jpe?g|webp|gif)$/i.test(entry.name))
    .map((entry) => ({
      name: entry.name,
      src: `/facilitators/Impact-footprints/${projectSlug}/${encodeURIComponent(
        path.basename(projectDir)
      )}/${encodeURIComponent(entry.name)}`,
    }));
}

function readCovenerImpactFootprints(rootDir) {
  const impactRoot = path.join(
    rootDir,
    "facilitators",
    "Impact-footprints",
    COVENER.impactFolder
  );

  const projects = [];

  if (fs.existsSync(impactRoot)) {
    fs.readdirSync(impactRoot, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .forEach((entry) => {
        const projectDir = path.join(impactRoot, entry.name);
        projects.push({
          title: entry.name,
          images: listProjectImages(projectDir, COVENER.impactFolder),
        });
      });
  }

  return {
    ...COVENER,
    projects,
  };
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify(payload));
}

function handleNodeRequest(req, res, rootDir) {
  try {
    const covener = readCovenerImpactFootprints(rootDir);
    sendJson(res, 200, { covener });
  } catch (error) {
    sendJson(res, 500, {
      error: "Failed to load covener impact footprints.",
      details: error.message,
    });
  }
}

module.exports = async function handler(req, res) {
  const rootDir = path.join(__dirname, "..");
  handleNodeRequest(req, res, rootDir);
};

module.exports.handleNodeRequest = handleNodeRequest;
module.exports.readCovenerImpactFootprints = readCovenerImpactFootprints;
