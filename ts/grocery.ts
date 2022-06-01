/* selector */
const alertParagraph = document.querySelector(".alert") as HTMLParagraphElement;
const form = document.querySelector(".grocery-form") as HTMLFormElement;
const grocery = document.getElementById("grocery") as HTMLInputElement;
const submitBtn = document.querySelector(".submit-btn") as HTMLButtonElement;
const clearBtn = document.querySelector(".clear-btn") as HTMLButtonElement;
const list = document.querySelector(".grocery-list") as HTMLDivElement;
const container = document.querySelector(
  ".grocery-container"
) as HTMLDivElement;

let editElement: HTMLElement;
let editFlag: boolean = false;
let editId: string = "";

enum ACTION {
  SUCCESS = "success",
  DANGER = "danger",
}

type groceryItem = {
  id: string;
  value: string;
};

/* event listener */
form.addEventListener("submit", addItem);
clearBtn.addEventListener("click", clearItems);
window.addEventListener("DOMContentLoaded", loadItems);

/* functions */
function addItem(e: Event) {
  e.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString();
  console.log(id, value);

  /* add item */
  if (value && !editFlag) {
    const elementToAdd = document.createElement("article");

    /* add class and id */
    let attributeElement = document.createAttribute("data-id");
    attributeElement.value = id;
    elementToAdd.setAttributeNode(attributeElement);
    elementToAdd.classList.add("grocery-item");
    elementToAdd.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <button class="edit-btn" type="button">
                <i class="fas fa-edit"></i>
              </button>
              <button class="delete-btn" type="button">
                <i class="fas fa-trash"></i>
              </button>
            </div>`;

    /* append child */
    const deleteBtn = elementToAdd.querySelector(".delete-btn");
    deleteBtn?.addEventListener("click", deleteItem);
    const editBtn = elementToAdd.querySelector(".edit-btn");
    editBtn?.addEventListener("click", editItem);

    list.appendChild(elementToAdd);
    displayAlert("Item added to the list", ACTION.SUCCESS);
    /* show container */
    container.classList.add("show-container");
    addToLocalStorage(id, value);
    setBackToDefault();
    return;
  }

  /* edit item */
  if (value && editFlag) {
    editElement.innerHTML = value;
    displayAlert("value changed", ACTION.SUCCESS);
    editLocalStorage(editId, value);
    setBackToDefault();
    return;
  }

  displayAlert("Please enter value", ACTION.DANGER);
}

function displayAlert(text: string, action: ACTION) {
  alertParagraph.textContent = text;
  alertParagraph.classList.add(`alert-${action}`);

  /* remove alert */
  setTimeout(() => {
    alertParagraph.textContent = "";
    alertParagraph.classList.remove(`alert-${action}`);
  }, 2000);
}

function addToLocalStorage(id: string, value: string) {
  const grocery = { id, value };
  let items = getLocalStorage();
  items.push(grocery);
  localStorage.setItem("list", JSON.stringify(items));
}

function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage?.getItem("list") || "")
    : [];
}

function removeFromLocalStorage(id: string) {
  let items = getLocalStorage();
  items = items.filter((item: groceryItem) => {
    if (item.id !== id) return item;
  });
  localStorage.setItem("list", JSON.stringify(items));
}

function editLocalStorage(id: string, value: string) {
  let items = getLocalStorage();
  items = items.map((item: groceryItem) => {
    if (item.id === id) item.value = value;
    return item;
  });
}

function setBackToDefault() {
  grocery.value = "";
  editFlag = false;
  editId = "";
  submitBtn.textContent = "submit";
}

function clearItems() {
  const toDelete = document.querySelectorAll(".grocery-item");

  if (toDelete.length > 0) {
    toDelete.forEach((item) => {
      list.removeChild(item);
    });
  }

  container.classList.remove("show-container");
  displayAlert("empty list", ACTION.DANGER);
  setBackToDefault();
  localStorage.removeItem("list");
}

function deleteItem(e: Event) {
  const selectedEvent = e.currentTarget as HTMLElement;
  const selectedElement = selectedEvent?.parentElement?.parentElement;
  const id = selectedElement?.dataset.id;
  list.removeChild(selectedElement as Node);
  if (list.children.length === 0) container.classList.remove("show-container");

  displayAlert("Item Removed", ACTION.DANGER);
  setBackToDefault();

  /* remove from local storage */
  // removeFromLocalStorage(id)
}

function editItem(e: Event) {
  const currentTarget = e.currentTarget as HTMLElement;
  const selectedElement = currentTarget?.parentElement?.parentElement;
  editElement = e.currentTarget as HTMLElement;
  editElement = editElement?.parentElement
    ?.previousElementSibling as HTMLElement;
  grocery.value = editElement.innerHTML;
  editFlag = true;
  editId = selectedElement?.dataset.id as string;

  submitBtn.textContent = "edit";
}

function addArticleElement(id: string, value: string) {
  const elementToAdd = document.createElement("article");

  /* add class and id */
  elementToAdd.classList.add("grocery-item");
  const attributeElement = document.createAttribute("data-id");
  attributeElement.value = id;
  elementToAdd.setAttributeNode(attributeElement);
  elementToAdd.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <button class="edit-btn" type="button">
                <i class="fas fa-edit"></i>
              </button>
              <button class="delete-btn" type="button">
                <i class="fas fa-trash"></i>
              </button>
            </div>`;

  /* append child */
  const deleteBtn = document.querySelector(".delete-btn") as HTMLButtonElement;
  const editBtn = document.querySelector(".edit-btn") as HTMLButtonElement;

  deleteBtn.addEventListener("click", deleteItem);
  editBtn.addEventListener("click", editItem);

  list.appendChild(elementToAdd);
}

function loadItems() {
  let items = getLocalStorage() as Array<groceryItem>;
  if (items.length > 0) {
    items.forEach((item) => addArticleElement(item.id, item.value));
  }
  container.classList.add("show-container");
}
