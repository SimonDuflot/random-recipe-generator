//RELEVANT INPUTS
const recipeContainer = document.querySelector(".recipeContainer");
const btn = document.querySelector(".btn_random");
recipeContainer.innerHTML = "";

//FETCH FLAG BASED ON RECIPE
// const countryFlag = async (meal) => {
//   await fetch(`https://restcountries.com/v3.1/name/${meal.strArea}`)
//     .then((res) => {
//       return res.json();
//     })
//     .then((data) => {
//       flag = data[0].flags.png;
//     });
//   console.log(flag);
// };

//FETCH DATA THROUGH RECIPE API
const fetchData = async () => {
  //FETCH RECIPE DATA
  await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => {
      meal = data.meals[0];
      console.log(meal);
    });
  return recipeCard(meal);
};

//add button functionality
btn.addEventListener("click", function () {
  recipeContainer.innerHTML = "";
  fetchData();
});

//CREATE A RECIPE CARD WITH DATA FETCHED FROM API
const recipeCard = (meal) => {
  const imgRecipe = meal.strMealThumb;
  const url = meal.strYoutube;
  const ingredientsList = [];
  for (let i = 0; i <= 25; i++) {
    const ingredient = meal["strIngredient" + i];
    const measure = meal["strMeasure" + i];
    if (ingredient) ingredientsList.push(` ${ingredient} : ${measure}`);
  }

  const html = `
    <div class="recipe_country">
    <div class="recipe_img">
        <img src="${imgRecipe}" alt="${meal.strMeal}" class="img">
    </div>
    <h3 class="recipeName">${meal.strMeal} : ${meal.strArea}</h3>
    <img src="" alt="${meal.strArea}" class="img">
    <div class="ingredients-container">
    ${ingredientsList.map((ingredient) => `<p>${ingredient}</p>`).join("")}
          </div>
        <div class="instructions">${meal.strInstructions}
        </div>
        <iframe class="videoplayer" width="300" height="150"
        src="${url}">
        </iframe>  
        <div class="link">
        <a href="${url}"> Youtube Link </a>
        </div>
     
</div>`;
  recipeContainer.insertAdjacentHTML("afterbegin", html);
};
