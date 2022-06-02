"use strict";
class Counter {
    counter;
    value;
    resetBtn;
    increaseBtn;
    decreaseBtn;
    DOMValue;
    constructor(element, value) {
        this.counter = element;
        this.value = value;
        this.resetBtn = element.querySelector(".reset");
        this.increaseBtn = element.querySelector(".increase");
        this.decreaseBtn = element.querySelector(".decrease");
        this.DOMValue = element.querySelector(".value");
        this.DOMValue.textContent = value.toString();
        this.increaseBtn?.addEventListener("click", this.increase.bind(this));
        this.decreaseBtn?.addEventListener("click", this.decrease.bind(this));
        this.resetBtn?.addEventListener("click", this.reset.bind(this));
    }
    increase() {
        this.value++;
        this.DOMValue.textContent = this.value.toString();
    }
    decrease() {
        this.value--;
        this.DOMValue.textContent = this.value.toString();
    }
    reset() {
        this.value = 0;
        this.DOMValue.textContent = this.value.toString();
    }
}
function getElement(selection) {
    const element = document.querySelector(selection);
    if (element)
        return element;
    throw new Error(`${selection} No such element exists`);
}
/* create element */
const firstCounter = new Counter(getElement(".first-counter"), 100);
const secondCounter = new Counter(getElement(".second-counter"), 200);
