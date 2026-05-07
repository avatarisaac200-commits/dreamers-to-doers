const facilitators = [
  {
    name: "Damilola Mogaji",
    image: "./facilitators/mogaji.jpg",
    bioFile: "./facilitators/bio4.md",
    tag: "7+ years of experience",
  },
  {
    name: "Temitayo Femi Matthew",
    image: "./facilitators/matthew.jpg",
    bioFile: "./facilitators/bio3.md",
    tag: "6+ years of experience",
  },
  {
    name: "Olufolake Zion Adegoke",
    image: "./facilitators/olufolake.jpeg",
    bioFile: "./facilitators/bio2.md",
    tag: "5+ years of experience",
  },
  {
    name: "Ifeoluwa Oyewole",
    image: "./facilitators/ifeoluwa.jpeg",
    bioFile: "./facilitators/bio1.md",
    tag: "10+ years of experience",
  },
];

let facilitatorImpactMap = new Map();

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;");
}

function renderInlineMarkdown(text) {
  return escapeHtml(text).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

function renderBioMarkdown(markdown) {
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

async function readBio(file) {
  try {
    const response = await fetch(file);
    if (!response.ok) return "";
    return await response.text();
  } catch {
    return "";
  }
}

async function loadImpactFootprints() {
  if (facilitatorImpactMap.size) return facilitatorImpactMap;

  try {
    const response = await fetch("/api/impact-footprints");
    if (!response.ok) throw new Error("Request failed");

    const data = await response.json();
    const items = Array.isArray(data.facilitators) ? data.facilitators : [];
    facilitatorImpactMap = new Map(items.map((item) => [item.name, item]));
  } catch {
    facilitatorImpactMap = new Map();
  }

  return facilitatorImpactMap;
}

function renderImpactProjects(facilitatorName) {
  const facilitator = facilitatorImpactMap.get(facilitatorName);
  if (!facilitator || !Array.isArray(facilitator.projects) || !facilitator.projects.length) {
    return '<div class="facilitator-impact-empty">Impact footprints for this facilitator will appear here soon.</div>';
  }

  return facilitator.projects
    .map((project) => {
      const images = Array.isArray(project.images)
        ? project.images
            .map(
              (image) => `
                <a class="facilitator-impact-thumb" href="${image.src}" target="_blank" rel="noopener noreferrer" aria-label="Open ${escapeHtml(project.title)} image">
                  <img src="${image.src}" alt="${escapeHtml(project.title)}">
                </a>
              `
            )
            .join("")
        : "";

      return `
        <section class="facilitator-impact-project">
          <h3 class="facilitator-impact-title">${escapeHtml(project.title)}</h3>
          <div class="facilitator-impact-gallery">${images}</div>
        </section>
      `;
    })
    .join("");
}

async function renderFacilitatorsPage() {
  const grid = document.getElementById("facilitators-grid");
  if (!grid) return;

  const [bios] = await Promise.all([
    Promise.all(facilitators.map((item) => readBio(item.bioFile))),
    loadImpactFootprints(),
  ]);

  grid.innerHTML = facilitators
    .map((facilitator, index) => {
      const bio =
        renderBioMarkdown(bios[index]) ||
        "<p>Full profile details will be shared soon.</p>";

      return `
        <article class="facilitator-card facilitator-card-expanded">
          <div class="facilitator-photo">
            <img src="${facilitator.image}" alt="${facilitator.name}">
          </div>
          <div class="facilitator-card-body">
            <div class="facilitator-card-meta">
              <div class="facilitator-card-name">${escapeHtml(facilitator.name)}</div>
              <div class="facilitator-card-tag">${escapeHtml(facilitator.tag)}</div>
            </div>
            <div class="facilitator-bio">${bio}</div>
            <div class="facilitator-impact-block">
              <div class="facilitator-impact-label">Impact Footprint</div>
              <div class="facilitator-impact-list">${renderImpactProjects(
                facilitator.name
              )}</div>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

document.addEventListener("DOMContentLoaded", async () => {
  await renderFacilitatorsPage();
});
