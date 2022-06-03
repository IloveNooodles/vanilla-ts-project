const items = [...document.querySelectorAll(".number")];

const updateCount = (element: HTMLElement) => {
  const value = parseInt(element.dataset.value || "0");
  const increment = Math.ceil(value / 1000);
  let initialValue = 0;

  const increaseCount = setInterval(() => {
    initialValue += increment;
    element.textContent = `${initialValue.toString()}+`;
    if (initialValue > value) {
      clearInterval(increaseCount);
      element.textContent = `${value.toString()}+`;
      return;
    }
  }, 1);
};

items.forEach((item: Element) => {
  updateCount(item as HTMLElement);
});
