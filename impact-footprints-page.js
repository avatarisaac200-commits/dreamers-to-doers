function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderProject(project) {
  const images = project.images
    .map(
      (image) => `
        <button class="impact-gallery-item" type="button" data-impact-image="${image.src}" data-impact-alt="${escapeHtml(project.title)}">
          <img src="${image.src}" alt="${escapeHtml(project.title)}">
        </button>
      `
    )
    .join("");

  return `
    <section class="impact-project">
      <h3 class="impact-project-title">${escapeHtml(project.title)}</h3>
      <div class="impact-gallery">${images}</div>
    </section>
  `;
}

function setupImpactLightbox() {
  const lightbox = document.getElementById("impact-lightbox");
  const image = document.getElementById("impact-lightbox-image");
  const closeButton = document.getElementById("impact-lightbox-close");

  if (!lightbox || !image || !closeButton) return;

  const close = () => {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    image.src = "";
    image.alt = "";
    document.body.style.overflow = "";
  };

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-impact-image]");
    if (!trigger) return;

    image.src = trigger.getAttribute("data-impact-image") || "";
    image.alt = trigger.getAttribute("data-impact-alt") || "";
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });

  closeButton.addEventListener("click", close);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) close();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("active")) {
      close();
    }
  });
}

function renderFacilitator(facilitator) {
  const highlight = facilitator.highlight
    ? `<div class="impact-highlight">${escapeHtml(facilitator.highlight)}</div>`
    : "";

  const content = facilitator.projects.length
    ? `<div class="impact-projects">${facilitator.projects.map(renderProject).join("")}</div>`
    : `<div class="impact-empty">Impact images for this facilitator will appear here as soon as the corresponding folders are added.</div>`;

  return `
    <article class="impact-card">
      <div class="impact-photo">
        <img src="${facilitator.image}" alt="${escapeHtml(facilitator.name)}">
      </div>
      <div>
        <h2 class="impact-name">${escapeHtml(facilitator.name)}</h2>
        ${highlight}
        ${content}
      </div>
    </article>
  `;
}

async function loadImpactFootprints() {
  const container = document.getElementById("impact-list");
  if (!container) return;

  try {
    const response = await fetch("/api/impact-footprints");
    if (!response.ok) {
      throw new Error("Request failed");
    }

    const data = await response.json();
    const facilitators = Array.isArray(data.facilitators) ? data.facilitators : [];

    container.innerHTML = facilitators.map(renderFacilitator).join("");
  } catch {
    container.innerHTML =
      '<div class="impact-error">Impact footprints could not be loaded right now. Please try again shortly.</div>';
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  setupImpactLightbox();
  await loadImpactFootprints();
});
