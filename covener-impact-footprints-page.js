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
              <button class="covener-impact-gallery-item" type="button" data-covener-impact-image="${image.src}" data-covener-impact-alt="${escapeHtml(project.title)}">
                <img src="${image.src}" alt="${escapeHtml(project.title)}">
              </button>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

function setupCovenerImpactLightbox() {
  const lightbox = document.getElementById("covener-impact-lightbox");
  const image = document.getElementById("covener-impact-lightbox-image");
  const closeButton = document.getElementById("covener-impact-lightbox-close");

  if (!lightbox || !image || !closeButton) return;

  const close = () => {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    image.src = "";
    image.alt = "";
    document.body.style.overflow = "";
  };

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-covener-impact-image]");
    if (!trigger) return;

    image.src = trigger.getAttribute("data-covener-impact-image") || "";
    image.alt = trigger.getAttribute("data-covener-impact-alt") || "";
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
  setupCovenerImpactLightbox();
  await loadCovenerImpactFootprints();
});
