const form = document.querySelector(".search-form")
const recipeList = document.querySelector(".recipe.list")
const recipeDetails = document.querySelector(".recipe.Details")

form.addEventListener('submit', function (event) {
    event.preventDefault()
    const inputValue = event.target[0].value

    searchRecipes(inputValue)

})

async function searchRecipes(ingredient) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`

    )
    const data = await response.json()
    showRecipes(data.meals)
}

function showRecipes(recipes) {
    recipeList.innerHTML = recipes.map(
        (item) => `
        <div class="recipe-card" onclick="getRecipesDetails(${item.idMeal})"> 
        
        <img src="${item.strMealThumb}"alt="recipe-photo">
        <h3>${item.strMeal}</h3>
        
        </div>
        `

    ).join('')

}

async function getRecipesDetails(id) {
    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`

    )
    const data = await response.json()
    const recipe = data.meals[0]

    console.log(recipe)

    let ingredients = ''

    for (let i = 1; i <= 20; i++) {
        if (recipe[`strIngredient1${i}`]) {
            ingredients += `<li>${recipe[`strIngredient1${i}`]} - ${recipe[`strMeasure${i}`]}</li>`

        } else {

            break;
        }

    }

    for (let i = 1; i <= 20; i++) {
        if (recipe[`strIngredient${i}`]) {
            ingredients += `<li>${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`]}</li>`

        } else {

            break;
        }

    }


    getRecipesDetails.innerHTML = `
    <h2>${recipe.strMeal}</h2>
    <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" class="recipe-img">
    <h3>Category: ${recipe.strCategory}</h3>
    <h3>Origin: ${recipe.strArea}</h3>
    <h3>Ingredients: </h3>
    <ul>${ingredients}</ul>
    <h3>Instructions:</h3>
    <p>${recipe.strInstructions}</p>
    <p>${recipe.strTags ? recipe.strTags : 'No tags available'}</p>
    <p>Video: <a href="${recipe.strYoutube}" target="_blank">Watch the video on YouTube</a></p>
`



}





