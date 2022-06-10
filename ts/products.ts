const urlStore = "https://course-api.com/javascript-store-products";

const productsDOM = document.querySelector(
  ".products-center"
) as HTMLDivElement;

const fetchProducts = async () => {
  try {
    productsDOM.innerHTML = `<div class="loading"></div>`;
    const respond = await fetch(urlStore);
    const responData = await respond.json();
    if (!respond.ok) {
      throw new Error("Error fetching data");
    }
    return responData;
  } catch (err: any) {
    productsDOM.innerHTML = `<div class="error">Error fetching data</div>`;
    console.log(err);
  }
};

const displayProducts = (dataProducts: any) => {
  const productList = dataProducts
    .map((product: any) => {
      const { id } = product;
      const { name: title, price } = product.fields;
      const { url: img } = product.fields.image[0];
      return `<a href="singleProduct.html?id=${id}" class="single-product">
            <img
              src="${img}"
              alt="${title}"
              class="single-product-img img"
            />
            <footer>
              <h5 class="name">${title}</h5>
              <span class="price">${price / 100}</span>
            </footer>
          </a>`;
    })
    .join("");
  productsDOM.innerHTML = `<div class="products-container">
  ${productList}
  </div>`;
};

const startProducts = async () => {
  const data = await fetchProducts();
  displayProducts(data);
};

startProducts();
