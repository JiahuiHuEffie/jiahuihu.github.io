const navLinks = document.querySelectorAll(".site-nav a");

navLinks.forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
        const targetId = anchor.getAttribute("href").slice(1);
        const targetElement = document.getElementById(targetId);
        if (!targetElement) {
            return;
        }
        event.preventDefault();
        targetElement.scrollIntoView({ behavior: "smooth" });
        history.replaceState(null, "", `#${targetId}`);
    });
});

const sections = document.querySelectorAll("main section[id]");

function setActiveLink(id) {
    navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${id}`;
        link.classList.toggle("is-active", isActive);
        if (isActive) {
            link.setAttribute("aria-current", "true");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

function updateActiveSection() {
    const marker = Math.min(window.innerHeight * 0.28, 180);
    let currentId = sections[0]?.id;
    sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= marker) {
            currentId = section.id;
        }
    });
    if (currentId) {
        setActiveLink(currentId);
    }
}

if (sections.length) {
    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
}

const dialog = document.querySelector("#figure-dialog");
const dialogImage = document.querySelector("#figure-dialog-img");

document.querySelectorAll("[data-enlarge]").forEach((button) => {
    button.addEventListener("click", () => {
        const image = button.querySelector("img");
        if (!dialog || !dialogImage || !image) {
            return;
        }
        dialogImage.src = image.currentSrc || image.src;
        dialogImage.alt = image.alt;
        dialog.showModal();
    });
});

dialog?.addEventListener("click", (event) => {
    if (event.target === dialog || event.target.closest("[data-close-dialog]")) {
        dialog.close();
    }
});

dialog?.addEventListener("close", () => {
    if (dialogImage) {
        dialogImage.removeAttribute("src");
    }
});
