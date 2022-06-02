const slides = document.querySelectorAll(".slide") as NodeListOf<HTMLElement>;
const nextBtn = document.querySelector(".nextBtn") as HTMLButtonElement;
const prevBtn = document.querySelector(".prevBtn") as HTMLButtonElement;

/* setting up */
slides.forEach((slide: HTMLElement, index: number) => {
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
  if (counter < 0) counter = slides.length - 1;
  if (counter === slides.length) counter = 0;
  slides.forEach((slide: HTMLElement) => {
    slide.style.transform = `translateX(-${counter * 100}%)`;
    console.log("test");
  });
}
