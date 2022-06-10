const url: string = "https://icanhazdadjoke.com/";

const dadJokesBtn = document.querySelector(".btn") as HTMLElement;
const pResult = document.querySelector(".result") as HTMLParagraphElement;
dadJokesBtn?.addEventListener("click", () => {
  fetchRandomJokes();
});

const fetchRandomJokes = async () => {
  pResult.textContent = "loading";
  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
    });
    if (!response.ok) {
      pResult.textContent = "error";
      throw new Error("Response error");
    }
    const dataRes = await response.json();
    pResult.textContent = dataRes.joke;
  } catch (err: any) {
    pResult.textContent = "there was an error";
    console.log(err);
  }
};

fetchRandomJokes();
