const WHATSAPP_NUMBER = "2349162057661";
const WHATSAPP_GROUP_URL =
  "https://chat.whatsapp.com/Bym2VLFK3P4EwvmInZT6Cf?mode=gi_t";

const facilitators = [
  {
    name: "Ifeoluwa Oyewole",
    image: "./facilitators/ifeoluwa.jpeg",
    bioFile: "./facilitators/bio1.md",
  },
  {
    name: "Olufolake Zion Adegoke",
    image: "./facilitators/olufolake.jpeg",
    bioFile: "./facilitators/bio2.md",
  },
  {
    name: "Temitayo Femi Matthew",
    image: "./facilitators/matthew.jpg",
    bioFile: "./facilitators/bio3.md",
  },
  {
    name: "Damilola Mogaji",
    image: "./facilitators/mogaji.jpg",
    bioFile: "./facilitators/bio4.md",
  },
];

function normalizeText(text) {
  return text
    .replace(/Aú|A·/g, "·")
    .replace(/ƒ\?\"|Г\?\"|ƒ\?"|Г\?"/g, "—")
    .replace(/ƒ\+\u0027|Г\+\u0027|ƒ\+|Г\+/g, "→")
    .replace(/ƒ,İ|Г,▌/g, "₦")
    .replace(/ƒo"|Гo"/g, "✓")
    .replace(/ƒo▌|Гo▌/g, "★")
    .replace(/ƒ-\^|Г-\^/g, "◆")
    .replace(/ƒ-\+|Г-\+/g, "✦")
    .replace(/ƒкн|Гкн/g, "⬢")
    .replace(/ƒo\u0015|Гo\u0015/g, "▣")
    .replace(/ƒ-%|Г-%/g, "◉")
    .replace(/Ac/g, "©");
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
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

async function injectFacilitators() {
  const registerSection = document.getElementById("register");
  if (!registerSection) return;

  const bios = await Promise.all(facilitators.map((item) => readBio(item.bioFile)));
  const cards = facilitators
    .map((facilitator, index) => {
      const bio = renderBioMarkdown(bios[index]) || "<p>Bio coming soon.</p>";

      return `
        <article
          class="facilitator-card"
          tabindex="0"
          role="button"
          aria-label="Open bio for ${facilitator.name}"
          data-facilitator-trigger
          data-name="${escapeHtml(facilitator.name)}"
          data-image="${facilitator.image}"
          data-bio="${escapeHtml(bio)}"
        >
          <div class="facilitator-photo">
            <img src="${facilitator.image}" alt="${facilitator.name}">
          </div>
        </article>
      `;
    })
    .join("");

  const section = document.createElement("section");
  section.id = "facilitators";
  section.innerHTML = `
    <div class="section-tag">08 · Facilitators</div>
    <h2 class="section-title">Meet the <em>facilitators.</em></h2>
    <p class="section-lead">A lineup of facilitators bringing real-world perspectives across leadership, public health, execution, and impact-driven work. Click any photo to read the bio.</p>
    <div class="facilitators-grid">${cards}</div>
    <div class="facilitator-modal" id="facilitator-modal" aria-hidden="true">
      <div class="facilitator-modal-card">
        <button class="success-close" id="facilitator-modal-close" type="button" aria-label="Close">X</button>
        <div class="facilitator-modal-grid">
          <div class="facilitator-modal-photo">
            <img id="facilitator-modal-image" src="" alt="">
          </div>
          <div>
            <div class="facilitator-modal-label">Facilitator Bio</div>
            <div class="facilitator-modal-name" id="facilitator-modal-name"></div>
            <div class="facilitator-bio" id="facilitator-modal-bio"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  registerSection.parentNode.insertBefore(section, registerSection);
  setupFacilitatorModal();
}

function setupFacilitatorModal() {
  const modal = document.getElementById("facilitator-modal");
  const closeButton = document.getElementById("facilitator-modal-close");
  const nameEl = document.getElementById("facilitator-modal-name");
  const imageEl = document.getElementById("facilitator-modal-image");
  const bioEl = document.getElementById("facilitator-modal-bio");

  if (!modal || !closeButton || !nameEl || !imageEl || !bioEl) return;

  const closeModal = () => {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  const openModal = (trigger) => {
    const name = trigger.getAttribute("data-name") || "";
    const image = trigger.getAttribute("data-image") || "";
    const bio = trigger.getAttribute("data-bio") || "<p>Bio coming soon.</p>";

    nameEl.textContent = name;
    imageEl.src = image;
    imageEl.alt = name;
    bioEl.innerHTML = bio;
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

function setText(selector, value) {
  const node = document.querySelector(selector);
  if (node) node.textContent = value;
}

function replaceTextInNode(node, matcher, replacement) {
  if (!node) return;
  node.innerHTML = node.innerHTML.replace(matcher, replacement);
}

function updateStaticContent() {
  setText(".hero-meta", "Pan-African Leadership Masterclass · June 2026");
  setText(".countdown-label", "Masterclass Starts In");

  document.querySelectorAll(".cl-val").forEach((node) => {
    node.textContent = normalizeText(node.textContent)
      .replace(/2025/g, "2026");
  });

  const timeTitle = document.querySelectorAll(".section-title")[2];
  if (timeTitle) {
    timeTitle.innerHTML = "Clear your calendar. <em>June 19 - 21, 2026.</em>";
  }

  const timeDates = document.querySelector(".time-cell-value");
  if (timeDates) {
    timeDates.innerHTML = "<em>19th - 21st</em><br>June 2026";
  }

  const hostSection = document.getElementById("host");
  if (hostSection) {
    const tag = hostSection.querySelector(".section-tag");
    if (tag) tag.textContent = "07 · Covener";
    const heading = hostSection.querySelector(".section-title");
    if (heading) heading.innerHTML = "Meet your <em>covener.</em>";
    const lead = hostSection.querySelector(".section-lead");
    if (lead) {
      lead.textContent =
        "The masterclass is convened by a project manager whose work sits at the intersection of strategy, structure, funding, and execution.";
    }
    const hostImg = hostSection.querySelector("img");
    if (hostImg) hostImg.setAttribute("src", "./amara-4.jpg");
  }

  document.querySelectorAll("a").forEach((link) => {
    const text = normalizeText(link.textContent || "");
    link.textContent = text;
    if (link.href.includes("t.me/+yourtelegramlink")) {
      link.href = WHATSAPP_GROUP_URL;
      link.textContent = "Join WhatsApp Group";
      link.target = "_blank";
    }
  });

  document.querySelectorAll("*").forEach((node) => {
    if (node.children.length === 0 && node.textContent) {
      node.textContent = normalizeText(node.textContent)
        .replace(/2025/g, "2026")
        .replace("Early Bird Ends In", "Masterclass Starts In");
    }
  });

  const footerBottom = document.querySelector(".footer-bottom div");
  if (footerBottom) {
    footerBottom.textContent =
      "© 2026 Dreamers to Doers · Pan-African Leadership Masterclass";
  }
}

function setupCountdown() {
  const target = new Date("2026-06-19T18:00:00+01:00").getTime();
  const dEl = document.getElementById("cd-d");
  const hEl = document.getElementById("cd-h");
  const mEl = document.getElementById("cd-m");
  const sEl = document.getElementById("cd-s");

  function pad(n) {
    return (n < 10 ? "0" : "") + n;
  }

  function tick() {
    let diff = Math.max(0, target - Date.now());
    const d = Math.floor(diff / 86400000);
    diff %= 86400000;
    const h = Math.floor(diff / 3600000);
    diff %= 3600000;
    const m = Math.floor(diff / 60000);
    diff %= 60000;
    const s = Math.floor(diff / 1000);
    if (dEl) dEl.textContent = pad(d);
    if (hEl) hEl.textContent = pad(h);
    if (mEl) mEl.textContent = pad(m);
    if (sEl) sEl.textContent = pad(s);
  }

  tick();
  window.setInterval(tick, 1000);
}

function setupSuccessOverlay() {
  const successCard = document.querySelector(".success-card");
  if (successCard && !successCard.querySelector(".success-close")) {
    const button = document.createElement("button");
    button.className = "success-close";
    button.type = "button";
    button.setAttribute("aria-label", "Close");
    button.textContent = "X";
    button.addEventListener("click", () => {
      document.getElementById("success-overlay")?.classList.remove("active");
      document.body.style.overflow = "";
    });
    successCard.prepend(button);
  }

  const redirectText = document.querySelector(".redirect-bar span");
  if (redirectText) redirectText.textContent = "Redirecting you to the WhatsApp group";

  const manual = document.querySelector(".manual-link");
  if (manual) {
    manual.innerHTML = `Not redirected? <a href="${WHATSAPP_GROUP_URL}" target="_blank">Click here to join the WhatsApp group</a>.`;
  }
}

function setupFormHandler() {
  window.handleSubmit = function handleSubmit() {
    const first = document.getElementById("f-first").value.trim();
    const last = document.getElementById("f-last").value.trim();
    const email = document.getElementById("f-email").value.trim();
    const phone = document.getElementById("f-phone").value.trim();
    const cat = document.getElementById("f-category").value;
    const country = document.getElementById("f-country").value.trim();

    if (!first || !email || !cat) {
      alert("Please fill in your name, email, and category.");
      return;
    }

    const message = [
      "Hello Anna, I want to register for the Dreamers to Doers masterclass.",
      "",
      `First Name: ${first}`,
      `Last Name: ${last || "Not provided"}`,
      `Email: ${email}`,
      `WhatsApp Number: ${phone || "Not provided"}`,
      `Category: ${cat}`,
      `Country: ${country || "Not provided"}`,
    ].join("\n");

    const overlay = document.getElementById("success-overlay");
    if (overlay) overlay.classList.add("active");
    document.body.style.overflow = "hidden";

    window.setTimeout(() => {
      window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        message
      )}`;
    }, 1500);
  };
}

document.addEventListener("DOMContentLoaded", async () => {
  updateStaticContent();
  setupCountdown();
  setupSuccessOverlay();
  setupFormHandler();
});
