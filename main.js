const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector("container");
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
  const baseUrl = `https://api.edamam.com/search?q=pizza&app_id=${APP_ID}&app_key=${APP_KEY}&to=20`;
  const response = await fetch(baseUrl);
  const data = await response.json(); //Here is the data with the recipes and the pictures
  generateHTML(data.hits); //As we can see on the screenshot provided the hits is the array with the recipes
}


//Every time we are looping through this array we are creating an item which is a blueprint for the recipes forms
//TODO refactor the names of the func
//TODO Add functionality for ingrediands array of data ideas:smth like other btn to click on to go to other page idk 
function generateHTML(results) {
  let generatedHTML = "";
  results.map((result) => {
    //1.From provided data screenshot we take the data.hits.recipe.image which is the item image
    //2.From privided data screenshot we take the data.hits.recipe.label to see the names of the recipes on each form
    //3.Dynamically changing the outcome of clicking the button "View Recipe"
    //4.Dynamically changing the calories and fix them to 2 decimal after the number
    generatedHTML += `<div class="item">
        <img src="${result.recipe.image}" alt="" /> 
        <div class="flex-container">
          <h1 class="title">${result.recipe.label}</h1>
          <a class="view-btn" href="${result.recipe.url}" target = "_blank">View Recipe</a>
        </div>
        <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
      </div>`;
  })
  //Add the forms to the website
  searchResultDiv.innerHTML = generatedHTML;
}