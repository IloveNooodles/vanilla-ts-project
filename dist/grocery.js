"use strict";
/* selector */
const alertParagraph = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const clearBtn = document.querySelector(".clear-btn");
const list = document.querySelector(".grocery-list");
const container = document.querySelector(".grocery-container");
let editElement;
let editFlag = false;
let editId = "";
var ACTION;
(function (ACTION) {
    ACTION["SUCCESS"] = "success";
    ACTION["DANGER"] = "danger";
})(ACTION || (ACTION = {}));
/* event listener */
form.addEventListener("submit", addItem);
clearBtn.addEventListener("click", clearItems);
window.addEventListener("DOMContentLoaded", loadItems);
/* functions */
function addItem(e) {
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
function displayAlert(text, action) {
    alertParagraph.textContent = text;
    alertParagraph.classList.add(`alert-${action}`);
    /* remove alert */
    setTimeout(() => {
        alertParagraph.textContent = "";
        alertParagraph.classList.remove(`alert-${action}`);
    }, 2000);
}
function addToLocalStorage(id, value) {
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
function removeFromLocalStorage(id) {
    let items = getLocalStorage();
    items = items.filter((item) => {
        if (item.id !== id)
            return item;
    });
    localStorage.setItem("list", JSON.stringify(items));
}
function editLocalStorage(id, value) {
    let items = getLocalStorage();
    items = items.map((item) => {
        if (item.id === id)
            item.value = value;
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
function deleteItem(e) {
    const selectedEvent = e.currentTarget;
    const selectedElement = selectedEvent?.parentElement?.parentElement;
    const id = selectedElement?.dataset.id;
    list.removeChild(selectedElement);
    if (list.children.length === 0)
        container.classList.remove("show-container");
    displayAlert("Item Removed", ACTION.DANGER);
    setBackToDefault();
    /* remove from local storage */
    // removeFromLocalStorage(id)
}
function editItem(e) {
    const currentTarget = e.currentTarget;
    const selectedElement = currentTarget?.parentElement?.parentElement;
    editElement = e.currentTarget;
    editElement = editElement?.parentElement
        ?.previousElementSibling;
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editId = selectedElement?.dataset.id;
    submitBtn.textContent = "edit";
}
function addArticleElement(id, value) {
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
    const deleteBtn = document.querySelector(".delete-btn");
    const editBtn = document.querySelector(".edit-btn");
    deleteBtn.addEventListener("click", deleteItem);
    editBtn.addEventListener("click", editItem);
    list.appendChild(elementToAdd);
}
function loadItems() {
    let items = getLocalStorage();
    if (items.length > 0) {
        items.forEach((item) => addArticleElement(item.id, item.value));
    }
    container.classList.add("show-container");
}
