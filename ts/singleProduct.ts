const singleProduct = document.querySelector(".product") as HTMLDivElement;
const singleProductURL =
  "https://course-api.com/javascript-store-single-product?id=";

const fetchSingleProduct = async () => {
  try {
    singleProduct.innerHTML = `<h4 class="product-loading">loading</h4>`;
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const response = await fetch(`${singleProductURL}${id}`);
    const responseData = await response.json();
    displaySingleProduct(responseData);
    if (!response.ok) {
      throw new Error("Error fetching data");
    }
  } catch (err: any) {
    singleProduct.innerHTML = `<p class="product-loading">there was some error when fetching data</p>`;
    console.log(err);
  }
};

const displaySingleProduct = (prodcut: any) => {
  const {
    company,
    colors,
    description,
    name: title,
    price,
    image,
  } = prodcut.fields;
  document.title = (title as string).toUpperCase();
  const { url: img } = image[0];
  const colorList = colors.map((color: any) => {
    return `<span class="product-color" style="background: ${color}"></span>`;
  });
  singleProduct.innerHTML = `<div class="product-wrapper">
        <img src="${img}" class="img" alt="${title}" />
        <div class="product-info">
          <h3>${title}</h3>
          <h5>${company}</h5>
          <span>${price / 100}</span>
          <div class="colors">
            ${colorList}
          </div>
          <p>
            ${description}
          </p>
          <button class="btn">add to cart</button>
        </div>
      </div>`;
};

const start = async () => {
  const data = await fetchSingleProduct();
  displaySingleProduct(data);
};

start();
