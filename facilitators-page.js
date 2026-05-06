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

function renderBioMarkdown(markdown) {
  const normalized = markdown.replace(/\\\*\\\*/g, "**").trim();
  const paragraphs = normalized
    .split(/\r?\n\s*\r?\n/)
    .map((block) => block.replace(/\r?\n/g, " ").trim())
    .filter(Boolean);

  return paragraphs
    .map((paragraph) => {
      const escaped = escapeHtml(paragraph).replace(
        /\*\*(.+?)\*\*/g,
        "<strong>$1</strong>"
      );
      return `<p>${escaped}</p>`;
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

async function setupFacilitatorModal() {
  const modal = document.getElementById("facilitator-modal");
  const closeButton = document.getElementById("facilitator-modal-close");
  const nameEl = document.getElementById("facilitator-modal-name");
  const tagEl = document.getElementById("facilitator-modal-tag");
  const imageEl = document.getElementById("facilitator-modal-image");
  const bioEl = document.getElementById("facilitator-modal-bio");
  const impactEl = document.getElementById("facilitator-modal-impact");

  if (!modal || !closeButton || !nameEl || !tagEl || !imageEl || !bioEl || !impactEl) return;

  await loadImpactFootprints();

  const closeModal = () => {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  const openModal = (trigger) => {
    const name = trigger.getAttribute("data-name") || "";
    const tag = trigger.getAttribute("data-tag") || "";
    const image = trigger.getAttribute("data-image") || "";
    const bio =
      trigger.getAttribute("data-bio") ||
      "<p>Full profile details will be shared soon.</p>";

    nameEl.textContent = name;
    tagEl.textContent = tag;
    imageEl.src = image;
    imageEl.alt = name;
    bioEl.innerHTML = bio;
    impactEl.innerHTML = renderImpactProjects(name);
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  document.querySelectorAll("[data-facilitator-trigger]").forEach((trigger) => {
    trigger.addEventListener("click", () => openModal(trigger));
    trigger.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openModal(trigger);
      }
    });
  });

  closeButton.addEventListener("click", closeModal);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
}

async function renderFacilitatorsPage() {
  const grid = document.getElementById("facilitators-grid");
  if (!grid) return;

  const bios = await Promise.all(facilitators.map((item) => readBio(item.bioFile)));

  grid.innerHTML = facilitators
    .map((facilitator, index) => {
      const bio =
        renderBioMarkdown(bios[index]) ||
        "<p>Full profile details will be shared soon.</p>";

      return `
        <article
          class="facilitator-card"
          tabindex="0"
          role="button"
          aria-label="Open bio for ${facilitator.name}"
          data-facilitator-trigger
          data-name="${escapeHtml(facilitator.name)}"
          data-tag="${escapeHtml(facilitator.tag)}"
          data-image="${facilitator.image}"
          data-bio="${escapeHtml(bio)}"
        >
          <div class="facilitator-photo">
            <img src="${facilitator.image}" alt="${facilitator.name}">
          </div>
          <div class="facilitator-card-meta">
            <div class="facilitator-card-name">${escapeHtml(facilitator.name)}</div>
            <div class="facilitator-card-tag">${escapeHtml(facilitator.tag)}</div>
          </div>
        </article>
      `;
    })
    .join("");

  await setupFacilitatorModal();
}

document.addEventListener("DOMContentLoaded", async () => {
  await renderFacilitatorsPage();
});
