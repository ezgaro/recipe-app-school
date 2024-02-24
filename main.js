const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");
let searchQuery = "";
const APP_ID = "037cecc6";
const APP_KEY = "d8a4576acefc09f30030f6e3d55a736e";

//Giving functionality for the search bar
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  fetchAPI();
});
async function fetchAPI() {
  //With "to" in the url we set the results of recipes to 20;
  const baseUrl = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&to=20`;
  const response = await fetch(baseUrl);
  const data = await response.json(); //Here is the data with the recipes and the pictures
  generateHTML(data.hits); //As we can see on the screenshot provided the hits are the array with the recipes
}


function showMoreLabels(button) {
  const hiddenLabels = button.parentNode.querySelectorAll('.label.hidden');
  hiddenLabels.forEach(label => label.classList.remove('hidden'));

  // Hide the "Show More" button
  button.style.display = 'none';
}
//Every time we are looping through this array we are creating an item which is a blueprint for the recipes forms 
function generateHTML(results) {
  //Changing the brand name and search bar when we search smth it becomes smaller
  container.classList.remove("initial");
  let formHTML = "";
  results.map((result) => {
    //1.From provided data screenshot we take the data.hits.recipe.image which is the item image
    //2.From privided data screenshot we take the data.hits.recipe.label to see the names of the recipes on each form
    //3.Dynamically changing the outcome of clicking the button "View Recipe"
    //4.Dynamically changing the calories and fix them to 2 decimal after the number
    formHTML += `
    <div class="item">
      <img src="${result.recipe.image}" alt="img">
      <div class="flex-container">
        <h1 class="title">${result.recipe.label}</h1>
        <a class="view-btn" target="_blank" href="${result.recipe.url}">View Recipe</a>
      </div>
      <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
      <p class="item-data">Diet label: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : 'No Data Found'}</p>
      <p class="item-data">Health labels: 
      <span class="label">${result.recipe.healthLabels[0]}</span>
      <span class="label">${result.recipe.healthLabels[1]}</span>
      ${result.recipe.healthLabels.slice(2).map((label, index) => 
        `<span class="label hidden" id="label-${index + 2}">${label}</span>`
      ).join('')}
      <button class="small-btn" id="show-more" onclick="showMoreLabels(this)">Show More</button>
      </p>
    </div>
  `
  })

  //Add the forms to the website
  searchResultDiv.innerHTML = formHTML;
}