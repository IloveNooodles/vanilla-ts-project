const randomUserURL = "https://randomuser.me/api/";

const getElementUser = (selectedElement: string) => {
  const element = document.querySelector(selectedElement);
  if (element) return element;
  throw new Error("No element selected");
};

const img = getElementUser(".user-image") as HTMLImageElement;
const title = getElementUser(".user-title");
const value = getElementUser(".user-value");
const btn = getElementUser(".btn");
const btns = [...document.querySelectorAll(".icon")];

const getUser = async () => {
  const response = await fetch(randomUserURL);
  const responseData = await response.json();
  const person = responseData.results[0];
  const { phone, email } = person;
  const { large: image } = person.picture;
  const { password } = person.login;
  const { first, last } = person.name;
  const {
    dob: { age },
  } = person;
  const {
    street: { number, name },
  } = person.location;
  return {
    phone,
    email,
    image,
    password,
    first,
    age,
    street: `${number} ${name}`,
    name: `${first} ${last}`,
  };
};

const showRandomUser = async () => {
  const randomUser = await getUser();
  displayUser(randomUser);
};

const displayUser = (person: any) => {
  img.src = person.image;
  value.textContent = person.name;
  title.textContent = `My name is`;
  btns.forEach((button) => button.classList.remove("active"));
  btns[0].classList.add("actice");
  btns.forEach((btn: Element) => {
    const label = (btn as HTMLButtonElement).dataset.label as string;
    btn.addEventListener("click", () => {
      title.textContent = `My ${label} is`;
      value.textContent = person[label];
      btns.forEach((button) => button.classList.remove("active"));
      btn.classList.add("active");
    });
  });
};

window.addEventListener("DOMContentLoaded", showRandomUser);
btn.addEventListener("click", showRandomUser);
