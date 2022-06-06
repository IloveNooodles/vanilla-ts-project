const url: string = "./data.json";

fetch(url)
  .then((resp) => resp.json())
  .then((data) => console.log(data))
  .catch((err: Error) => console.log(err));
