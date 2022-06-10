"use strict";
const wiki_url = "https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=";
// list=search - perform a full text search
// srsearch="inputValue" - search for page titles or content matching  this value.
// srlimit=20 How many total pages to return.
// format=json json response
// "origin=*" fix cors errors
const page_url = "href=http://en.wikipedia.org/?curid=${pageid}";
const formDOM = document.querySelector(".form");
const formInputDOM = document.querySelector(".form-input");
const resultsDOM = document.querySelector(".results");
formDOM?.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = formInputDOM.value;
    if (!value) {
        resultsDOM.innerHTML = `<div class="error">please enter valid search term</div>`;
        return;
    }
    fetchPages(value);
});
const fetchPages = async (value) => {
    resultsDOM.innerHTML = `<div class="loading"></div>`;
    try {
        const respone = await fetch(`${wiki_url}${value}`);
        console.log(respone);
        const dataRespone = await respone.json();
        const results = dataRespone.query.search;
        console.log(dataRespone);
        if (results.length < 1) {
            resultsDOM.innerHTML = `<div class="error">no matching found</div>`;
            return;
        }
        renderResultData(results);
    }
    catch (error) {
        resultsDOM.innerHTML = `<div class="error">there was some server error</div>`;
    }
};
const renderResultData = (list) => {
    const cardsList = list
        .map((item) => {
        const { title, snippet, pageid } = item;
        return `<a href="http://en.wikipedia.org/?curid=${pageid}" _target="_blank">
            <h4>${title}</h4>
            <p>
              ${snippet}
            </p>
          </a>`;
    })
        .join("");
    resultsDOM.innerHTML = `<div class="articles">
    ${cardsList}
  </div>`;
};
