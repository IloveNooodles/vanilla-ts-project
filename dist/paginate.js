"use strict";
const githubURL = "https://api.github.com/users/ilovenooodles/followers?per_page=100";
const fetchFollowers = async () => {
    const response = await fetch(githubURL);
    const userData = await response.json();
    return userData;
};
const displayFollowrs = (followers) => {
    const newFollowers = followers
        .map((account) => {
        const { avatar_url, login, html_url } = account;
        return `<article class="card">
    <img src="${avatar_url}" alt="${login}"/>
    <h4>${login}</h4>
    <a href="${html_url}" class="btn">view profile</a>
    </article>`;
    })
        .join("");
    githubContainer.innerHTML = newFollowers;
};
const paginate = (followers) => {
    const itemsPerPage = 9;
    const numberOfPages = Math.ceil(followers.length / itemsPerPage);
    const newFollowers = Array.from({ length: numberOfPages }, (_, index) => {
        const start = index * itemsPerPage;
        return followers.slice(start, start + itemsPerPage);
    });
    return newFollowers;
};
const displayGithubButtons = (container, pages, activeIndex) => {
    let btns = pages.map((_, pageIndex) => {
        return `<button class="page-btn ${activeIndex === pageIndex ? "active-btn" : null}" data-index="${pageIndex}">${pageIndex + 1}</button>`;
    });
    btns.push('<button class="next-btn">next</button>');
    btns.unshift('<button class="prev-btn">prev</button>');
    githubBtnContainer.innerHTML = btns.join("");
};
let index = 0;
let pages = [];
const setupUI = () => {
    displayFollowrs(pages[index]);
    displayGithubButtons(githubBtnContainer, pages, index);
};
const sectionTitle = document.querySelector(".section-title h1");
const githubContainer = document.querySelector(".container");
const githubBtnContainer = document.querySelector(".btn-container");
const initPage = async () => {
    const followers = await fetchFollowers();
    sectionTitle.textContent = "pagination";
    pages = paginate(followers);
    setupUI();
};
githubBtnContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-container"))
        return;
    if (e.target.classList.contains("page-btn")) {
        index = parseInt(e.target.dataset.index);
    }
    if (e.target.classList.contains("next-btn")) {
        index++;
        if (index > pages.length - 1)
            index = 0;
    }
    if (e.target.classList.contains("prev-btn")) {
        index--;
        if (index < 0)
            index = pages.length - 1;
    }
    setupUI();
});
window.addEventListener("load", initPage);
