"use strict";
const cocktailURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita";
const searchCocktailURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const getElementCocktails = (element) => {
    const selectedElement = document.querySelector(element);
    if (!selectedElement)
        return null;
    return selectedElement;
};
const loading = getElementCocktails(".loading");
const formCocktails = getElementCocktails(".search-form");
const inputCocktails = getElementCocktails('[name="drink"]');
const showDrinks = async (url) => {
    //fetch drinks
    const cocktailsData = await fetchDrinks(url);
    //display drinks
    const sectionCocktails = await displayDrinks(cocktailsData);
};
const displayDrinks = async ({ drinks }) => {
    const section = getElementCocktails(".section-center");
    const title = getElementCocktails(".title");
    /* if no drinks available */
    if (!drinks) {
        hideLoading();
        title.textContent = "Sorry, no drinks matched your search";
        section.innerHTML = "";
        return;
    }
    const newDrinks = drinks
        .map((drink) => {
        const { idDrink: id, strDrink: name, strDrinkThumb: img } = drink;
        return `<a href="./cocktailsSinglePage.html">
          <article class="cocktail" data-id="${id}">
            <img src="${img}" alt="" />
            <h3>${name}</h3>
          </article>
        </a>`;
    })
        .join("");
    hideLoading();
    title.textContent = "";
    section.innerHTML = newDrinks;
    return section;
};
const fetchDrinks = async (url) => {
    showLoading();
    try {
        const respone = await fetch(url);
        const respData = await respone.json();
        return respData;
    }
    catch (err) {
        console.log(err);
    }
};
const showLoading = () => {
    loading?.classList.remove("hide-loading");
};
const hideLoading = () => {
    loading?.classList.add("hide-loading");
};
formCocktails?.addEventListener("keyup", function (e) {
    e.preventDefault();
    const value = inputCocktails.value;
    if (!value)
        return;
    showDrinks(`${searchCocktailURL}${value}`);
});
window.addEventListener("DOMContentLoaded", () => {
    showDrinks(cocktailURL);
});
