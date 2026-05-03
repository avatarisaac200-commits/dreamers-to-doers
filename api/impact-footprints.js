const fs = require("fs");
const path = require("path");

const FACILITATORS = [
  {
    name: "Ifeoluwa Oyewole",
    image: "/facilitators/ifeoluwa.jpeg",
    impactFolder: "Ifeoluwa",
  },
  {
    name: "Olufolake Zion Adegoke",
    image: "/facilitators/olufolake.jpeg",
    impactFolder: "Olufolake",
  },
  {
    name: "Temitayo Femi Matthew",
    image: "/facilitators/matthew.jpg",
    impactFolder: "Temitayo",
    highlight: "20,000 USD mobilized for Temitayo's impact footprints.",
  },
  {
    name: "Damilola Mogaji",
    image: "/facilitators/mogaji.jpg",
    impactFolder: "Damilola",
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

function readImpactFootprints(rootDir) {
  const impactRoot = path.join(rootDir, "facilitators", "Impact-footprints");

  return FACILITATORS.map((facilitator) => {
    const facilitatorDir = path.join(impactRoot, facilitator.impactFolder);
    let projects = [];

    if (fs.existsSync(facilitatorDir)) {
      projects = fs
        .readdirSync(facilitatorDir, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => {
          const projectDir = path.join(facilitatorDir, entry.name);
          return {
            title: entry.name,
            images: listProjectImages(projectDir, facilitator.impactFolder),
          };
        })
        .filter((project) => project.images.length > 0);
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
  const rootDir = process.cwd();
  handleNodeRequest(req, res, rootDir);
};

module.exports.handleNodeRequest = handleNodeRequest;
module.exports.readImpactFootprints = readImpactFootprints;
