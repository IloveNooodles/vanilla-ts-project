"use strict";
const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".nextBtn");
const prevBtn = document.querySelector(".prevBtn");
/* setting up */
slides.forEach((slide, index) => {
    slide.style.left = `${index * 100}%`;
});
/* button */
let counter = 0;
nextBtn.addEventListener("click", function () {
    counter++;
    carousel();
});
prevBtn.addEventListener("click", function () {
    counter--;
    carousel();
});
function carousel() {
    if (counter < 0)
        counter = slides.length - 1;
    if (counter === slides.length)
        counter = 0;
    slides.forEach((slide) => {
        slide.style.transform = `translateX(-${counter * 100}%)`;
        console.log("test");
    });
}
