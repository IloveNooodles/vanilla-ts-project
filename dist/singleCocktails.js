"use strict";
const cocktailID = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";
const getElementSingleCocktails = (element) => {
    const selectedElement = document.querySelector(element);
    if (!selectedElement)
        return null;
    return selectedElement;
};
const loadingElem = getElementSingleCocktails(".loading");
const fetchSingleDrink = async (url) => {
    showLoadingElem();
    try {
        const respone = await fetch(url);
        const respData = await respone.json();
        return respData;
    }
    catch (err) {
        console.log(err);
    }
};
const displaySingleDrink = (data) => {
    hideLoadingElem();
    const drink = data.drinks[0];
    const { strDrinkThumb: image, strDrink: name, strInstructions: desc } = drink;
    const list = [
        drink.strIngredient1,
        drink.strIngredient2,
        drink.strIngredient3,
        drink.strIngredient4,
        drink.strIngredient5,
    ];
    const img = getElementSingleCocktails(".drink-img");
    const drinkName = getElementSingleCocktails(".drink-name");
    const drinkDesc = getElementSingleCocktails(".drink-desc");
    const ingredients = getElementSingleCocktails(".drink-ingredients");
    console.log(list);
    img.src = image;
    document.title = name;
    drinkName.textContent = name;
    drinkDesc.textContent = desc;
    ingredients.innerHTML = list
        .map((item) => {
        if (!item)
            return;
        return `<li><i class="far fa-check-square"></i>${item}</li>`;
    })
        .join("");
};
const showLoadingElem = () => {
    loadingElem?.classList.remove("hide-loading");
};
const hideLoadingElem = () => {
    loadingElem?.classList.add("hide-loading");
};
const presentDrink = async () => {
    const id = localStorage.getItem("drink");
    if (!id)
        window.location.replace("../pages/cocktails.html");
    const drinkData = await fetchSingleDrink(`${cocktailID}${id}`);
    displaySingleDrink(drinkData);
};
window.addEventListener("DOMContentLoaded", presentDrink);
