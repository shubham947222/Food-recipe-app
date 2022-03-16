const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");

const APP_ID = "fe065446";
const APP_key = "d631bac2de0e233035d8bc8e348dcb36";

let searchQuery = "";
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  //   console.log(searchQuery);
  fetchAPI();
});

async function fetchAPI() {
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=21`;
  const response = await fetch(baseURL);
  const data = await response.json();
  generateHTML(data.hits);
  console.log(data);
}

function generateHTML(results) {
  container.classList.remove("initial");
  let generatedHTML = "";
  results.map((result) => {
    generatedHTML += `<div class="item">
        <img src="${result.recipe.image}" alt="" />
        <div class="flex-container">
          <h1 class="title">${result.recipe.label}</h1>
          <a href="${
            result.recipe.url
          }" target="_blank" class="view-button">View Recipe</a>
        </div>
        <p class="item-data">Calories:${result.recipe.calories.toFixed(2)}</p>
        <p class="item-data">Diet lable:${
          result.recipe.dietLabels.length > 0
            ? result.recipe.dietLabels
            : "No data found"
        }</p>
        <p class="item-data">Health lable:${result.recipe.healthLabels.slice(
          0,
          2
        )}</p>
      </div>`;
  });
  searchResultDiv.innerHTML = generatedHTML;
}
