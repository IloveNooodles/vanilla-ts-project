"use strict";
const sublinks = [
    {
        page: "products",
        links: [
            { label: "payment", icon: "fas fa-credit-card", url: "products.html" },
            { label: "terminal", icon: "fas fa-credit-card", url: "products.html" },
            { label: "connect", icon: "fas fa-credit-card", url: "products.html" },
        ],
    },
    {
        page: "developers",
        links: [
            { label: "plugins", icon: "fas fa-book", url: "products.html" },
            { label: "libraries", icon: "fas fa-book", url: "products.html" },
            { label: "plugins", icon: "fas fa-book", url: "products.html" },
            { label: "billing", icon: "fas fa-book", url: "products.html" },
        ],
    },
    {
        page: "company",
        links: [
            { label: "about", icon: "fas fa-briefcase", url: "products.html" },
            { label: "customers", icon: "fas fa-briefcase", url: "products.html" },
        ],
    },
];
const toggleStripeBtn = document.querySelector(".toggle-btn");
const closeStripeBtn = document.querySelector(".close-btn");
const sidebarWrapper = document.querySelector(".sidebar-wrapper");
const sidebar = document.querySelector(".sidebar-links");
const linksBtn = [...document.querySelectorAll(".link-btn")];
const subMenu = document.querySelector(".submenu");
const hero = document.querySelector(".hero");
const nav = document.querySelector(".nav");
/* hide show toggle btn */
toggleStripeBtn.addEventListener("click", () => {
    sidebarWrapper.classList.add("show");
});
closeStripeBtn.addEventListener("click", () => {
    sidebarWrapper.classList.remove("show");
});
sidebar.innerHTML = sublinks
    .map((item) => {
    const { links, page } = item;
    return `<article>
  <h4>${page}</h4>
  <div class="sidebar-sublinks">
  ${links
        .map((linksItem) => {
        const { label, icon, url } = linksItem;
        return `<a href="${url}">
      <i class="${icon}"></i>${label}
    </a>`;
    })
        .join("")}
  </div>
  </article>`;
})
    .join("");
linksBtn.forEach((button) => {
    button.addEventListener("mouseover", function (e) {
        const text = e.currentTarget.textContent;
        const tempBtn = e.currentTarget.getBoundingClientRect();
        const center = (tempBtn.left + tempBtn.right) / 2;
        const bottom = tempBtn.bottom - 3;
        const tempPage = sublinks.find(({ page }) => page === text);
        if (tempPage) {
            const { page, links } = tempPage;
            subMenu?.classList.add("show");
            subMenu.style.left = `${center}px`;
            subMenu.style.top = `${bottom}px`;
            subMenu.innerHTML = `<section>
      <h4>${page}</h4>
      <div class="submenu-center col-2">
      ${links
                .map((linksItem) => {
                const { label, icon, url } = linksItem;
                return `<a href="${url}">
      <i class="${icon}"></i>${label}
    </a>`;
            })
                .join("")}
      </div>
      </section>`;
        }
    });
});
hero.addEventListener("mouseover", function (e) {
    subMenu.classList.remove("show");
});
nav.addEventListener("mouseover", function (e) {
    if (!e.target.classList.contains("link-btn")) {
        subMenu.classList.remove("show");
    }
});
