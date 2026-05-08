const fs = require("fs");
const path = require("path");

const PUBLIC_FACILITATORS_DIR = path.join(process.cwd(), "public", "facilitators");

const FACILITATORS = [
  {
    name: "Damilola Mogaji",
    image: "/facilitators/mogaji.jpg",
    bioFile: "bio4.md",
    impactFolder: "Damilola",
    tag: "7+ years of experience",
    highlight: "Over 20,000 USD funding mobilized.",
  },
  {
    name: "Temitayo Femi Matthew",
    image: "/facilitators/matthew.jpg",
    bioFile: "bio3.md",
    impactFolder: "Temitayo",
    tag: "6+ years of experience",
    highlight: "Over 20,000 USD funding mobilized.",
  },
  {
    name: "Olufolake Zion Adegoke",
    image: "/facilitators/olufolake.jpeg",
    bioFile: "bio2.md",
    impactFolder: "Olufolake",
    tag: "5+ years of experience",
    highlight: "Over 20,000 USD funding mobilized.",
  },
  {
    name: "Ifeoluwa Oyewole",
    image: "/facilitators/ifeoluwa.jpeg",
    bioFile: "bio1.md",
    impactFolder: "Ifeoluwa",
    tag: "10+ years of experience",
    highlight: "Over 20,000 USD funding mobilized.",
  },
];

const HOST = {
  name: "Anna Ajibade",
  image: "/images/amara-4.jpg",
  impactFolder: "Covener",
  role: "Senior Project Manager / Strategy and Execution Lead",
  metrics: [
    { value: "USD 20,000", label: "Funding Mobilised" },
    { value: "3+", label: "Years Focused Delivery" },
  ],
  paragraphs: [
    "Anna Ajibade is a senior-level project manager and strategy execution lead focused on designing, coordinating, and delivering high-impact initiatives across education, youth development, leadership, and social impact spaces.",
    "Her expertise spans project architecture, strategic partnerships, stakeholder coordination, funding mobilisation, and execution systems that transform ideas from concept into measurable results.",
    "Among her notable works is the conceptualisation and successful execution of the Health Storytellers Summit, the first event of its kind at Obafemi Awolowo University. The landmark summit convened over 1,000 participants and featured Nigeria's foremost health storyteller, Aproko Doctor, creating a transformative platform that amplified conversations around healthcare communication, digital influence, and storytelling for impact.",
    "She is also the Founder and Executive Director of Afribloom, a nonprofit organisation operating at the intersection of education and leadership development, committed to ensuring that every African child has access to quality education, as well as the resources, exposure, and knowledge needed to harness their leadership potential.",
    "Under her leadership, Afribloom has successfully executed multiple outreach initiatives impacting over 3,500 secondary school students through educational interventions, career development programs, and leadership-focused engagements. The organisation currently provides full scholarship support to 15 out-of-school children, reinforcing its mission to bridge educational gaps and create pathways for long-term transformation.",
    "Her portfolio reflects a consistent track record of building initiatives that drive innovation, empower young leaders, and create scalable solutions for sustainable community advancement.",
  ],
};

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderInlineMarkdown(text) {
  return escapeHtml(text).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

function renderMarkdown(markdown) {
  const normalized = markdown.replaceAll("\\*\\*", "**").trim();
  const blocks = normalized
    .split(/\r?\n\s*\r?\n/)
    .map((block) => block.trim())
    .filter(Boolean);

  return blocks
    .map((block) => {
      const lines = block
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean);

      if (lines.every((line) => /^- /.test(line))) {
        const items = lines
          .map((line) => `<li>${renderInlineMarkdown(line.slice(2).trim())}</li>`)
          .join("");
        return `<ul>${items}</ul>`;
      }

      return `<p>${renderInlineMarkdown(lines.join(" "))}</p>`;
    })
    .join("");
}

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

function readBioHtml(fileName) {
  const filePath = path.join(PUBLIC_FACILITATORS_DIR, fileName);
  if (!fs.existsSync(filePath)) {
    return "<p>Bio coming soon.</p>";
  }

  return renderMarkdown(fs.readFileSync(filePath, "utf8"));
}

function readFacilitatorProjects(folder) {
  const baseDir = path.join(PUBLIC_FACILITATORS_DIR, "Impact-footprints", folder);
  if (!fs.existsSync(baseDir)) {
    return [];
  }

  return collectProjectGroups(baseDir, folder, true);
}

function readHostProjects() {
  const impactRoot = path.join(
    PUBLIC_FACILITATORS_DIR,
    "Impact-footprints",
    HOST.impactFolder
  );

  if (!fs.existsSync(impactRoot)) {
    return [];
  }

  return fs
    .readdirSync(impactRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => ({
      title: entry.name,
      images: listProjectImages(path.join(impactRoot, entry.name), HOST.impactFolder),
    }));
}

function getFacilitators() {
  return FACILITATORS.map((facilitator) => ({
    ...facilitator,
    bioHtml: readBioHtml(facilitator.bioFile),
    projects: readFacilitatorProjects(facilitator.impactFolder),
  }));
}

function getHost() {
  return {
    ...HOST,
    projects: readHostProjects(),
  };
}

function getImpactProfiles() {
  return [
    {
      name: HOST.name,
      image: HOST.image,
      highlight:
        "Add JPG or JPEG images into the folders below and they will appear here automatically.",
      projects: readHostProjects(),
    },
    ...getFacilitators().map((facilitator) => ({
      name: facilitator.name,
      image: facilitator.image,
      highlight: facilitator.highlight,
      projects: facilitator.projects,
    })),
  ];
}

module.exports = {
  getFacilitators,
  getHost,
  getImpactProfiles,
};
