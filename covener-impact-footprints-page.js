function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderProject(project) {
  if (!project.images.length) {
    return `
      <section class="covener-impact-project">
        <h3 class="covener-impact-project-title">${escapeHtml(project.title)}</h3>
        <div class="covener-impact-empty">Add JPG or JPEG images to this folder and they will appear here.</div>
      </section>
    `;
  }

  return `
    <section class="covener-impact-project">
      <h3 class="covener-impact-project-title">${escapeHtml(project.title)}</h3>
      <div class="covener-impact-gallery">
        ${project.images
          .map(
            (image) => `
              <div class="covener-impact-gallery-item">
                <img src="${image.src}" alt="${escapeHtml(project.title)}">
              </div>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

async function loadCovenerImpactFootprints() {
  const container = document.getElementById("covener-impact-list");
  if (!container) return;

  try {
    const response = await fetch("/api/covener-impact-footprints");
    if (!response.ok) {
      throw new Error("Request failed");
    }

    const data = await response.json();
    const covener = data.covener;

    if (!covener || !Array.isArray(covener.projects)) {
      throw new Error("Invalid response");
    }

    container.innerHTML = covener.projects.map(renderProject).join("");
  } catch {
    container.innerHTML =
      '<div class="covener-impact-error">Covener impact footprints could not be loaded right now. Please try again shortly.</div>';
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadCovenerImpactFootprints();
});
