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
        <div class="impact-gallery-item">
          <img src="${image.src}" alt="${escapeHtml(project.title)}">
        </div>
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
  await loadImpactFootprints();
});
