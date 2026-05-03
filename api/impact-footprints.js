const fs = require("fs");
const path = require("path");

const FACILITATORS = [
  {
    name: "Ifeoluwa Oyewole",
    image: "/facilitators/ifeoluwa.jpeg",
    impactFolder: "Ifeoluwa",
    highlight: "Over 20,000 USD funding mobilized.",
  },
  {
    name: "Olufolake Zion Adegoke",
    image: "/facilitators/olufolake.jpeg",
    impactFolder: "Olufolake",
    highlight: "Over 20,000 USD funding mobilized.",
  },
  {
    name: "Temitayo Femi Matthew",
    image: "/facilitators/matthew.jpg",
    impactFolder: "Temitayo",
    highlight: "Over 20,000 USD funding mobilized.",
  },
  {
    name: "Damilola Mogaji",
    image: "/facilitators/mogaji.jpg",
    impactFolder: "Damilola",
    highlight: "Over 20,000 USD funding mobilized.",
  },
];

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

function collectProjectGroups(baseDir, facilitatorSlug, includeLooseImages = false) {
  const entries = fs.readdirSync(baseDir, { withFileTypes: true });
  const groups = [];

  if (includeLooseImages) {
    const imageFiles = entries
      .filter((entry) => entry.isFile())
      .filter((entry) => /\.(png|jpe?g|webp|gif)$/i.test(entry.name));

    if (imageFiles.length > 0) {
      groups.push({
        title: "Featured images",
        images: imageFiles.map((entry) => ({
          name: entry.name,
          src: `/facilitators/Impact-footprints/${facilitatorSlug}/${encodeURIComponent(
            path.basename(baseDir)
          )}/${encodeURIComponent(entry.name)}`,
        })),
      });
    }
  }

  entries
    .filter((entry) => entry.isDirectory())
    .forEach((entry) => {
      const projectDir = path.join(baseDir, entry.name);
      const images = listProjectImages(projectDir, facilitatorSlug);

      if (images.length > 0) {
        groups.push({
          title: entry.name,
          images,
        });
      }

      groups.push(...collectProjectGroups(projectDir, facilitatorSlug, false));
    });

  return groups;
}

function readImpactFootprints(rootDir) {
  const impactRoot = path.join(rootDir, "facilitators", "Impact-footprints");

  return FACILITATORS.map((facilitator) => {
    const facilitatorDir = path.join(impactRoot, facilitator.impactFolder);
    let projects = [];

    if (fs.existsSync(facilitatorDir)) {
      projects = collectProjectGroups(facilitatorDir, facilitator.impactFolder, true);
    }

    return {
      name: facilitator.name,
      image: facilitator.image,
      impactFolder: facilitator.impactFolder,
      highlight: facilitator.highlight || "",
      projects,
    };
  });
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
    const facilitators = readImpactFootprints(rootDir);
    sendJson(res, 200, { facilitators });
  } catch (error) {
    sendJson(res, 500, {
      error: "Failed to load impact footprints.",
      details: error.message,
    });
  }
}

module.exports = async function handler(req, res) {
  const rootDir = path.join(__dirname, "..");
  handleNodeRequest(req, res, rootDir);
};

module.exports.handleNodeRequest = handleNodeRequest;
module.exports.readImpactFootprints = readImpactFootprints;
