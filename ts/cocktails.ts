const cocktailURL =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita";

const searchCocktailURL =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

const getElementCocktails = (element: string) => {
  const selectedElement = document.querySelector(element);
  if (!selectedElement) return null;
  return selectedElement;
};

const loading = getElementCocktails(".loading");
const formCocktails = getElementCocktails(".search-form");
const inputCocktails = getElementCocktails(
  '[name="drink"]'
) as HTMLInputElement;

const showDrinks = async (url: string) => {
  const cocktailsData = await fetchDrinks(url);
  const sectionCocktails = await displayDrinks(cocktailsData);
  if (sectionCocktails) setSingleDrink(sectionCocktails);
};

const displayDrinks = async ({ drinks }: any) => {
  const section = getElementCocktails(".section-center") as HTMLDivElement;
  const title = getElementCocktails(".title") as HTMLHeadingElement;

  if (!drinks) {
    hideLoading();
    title.textContent = "Sorry, no drinks matched your search";
    section.innerHTML = "";
    return;
  }

  const newDrinks = drinks
    .map((drink: any) => {
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

const fetchDrinks = async (url: string) => {
  showLoading();
  try {
    const respone = await fetch(url);
    const respData = await respone.json();
    return respData;
  } catch (err: any) {
    console.log(err);
  }
};

const showLoading = () => {
  loading?.classList.remove("hide-loading");
};

const hideLoading = () => {
  loading?.classList.add("hide-loading");
};

const setSingleDrink = (section: any) => {
  section.addEventListener("click", function (e: Event) {
    // e.preventDefault();
    const id = (e.target as HTMLElement).parentElement?.dataset.id as string;
    localStorage.setItem("drink", id);
  });
};

formCocktails?.addEventListener("keyup", function (e: Event) {
  e.preventDefault();
  const value = inputCocktails.value;
  if (!value) return;
  showDrinks(`${searchCocktailURL}${value}`);
});

window.addEventListener("DOMContentLoaded", () => {
  showDrinks(cocktailURL);
});
