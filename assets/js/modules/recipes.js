export function createRecipes() {
  const recipesContainer = document.querySelector(".recipes");

  const fetchData = async () => {
    const response = await fetch(
      "https://dummyjson.com/recipes?limit=12&sortBy=id&order=desc"
    );
    const data = await response.json();
    return data;
  };

  const displayData = async () => {
    recipesContainer.innerHTML = `
		<div class="loader-container">
			<div class="loader">
				<div class="inner-circle"></div>
			</div>
			<div class="loading-text">Chargement<span class="dots"></span></div>
		</div>
	`;
    const data = await fetchData();

    recipesContainer.innerHTML = "";

    const recipeCardsHTML = data.recipes.map((element) => 
		`<div class="recipe-card">
		  <img class="recipe__image" src="${element.image}" alt="${element.name}">
		  <h3 class="recipe__title text-center">${element.name}</h3>
		  <p class="recipe__text text-center">${element.cuisine}</p>
		</div>`
    );

    recipesContainer.innerHTML = recipeCardsHTML.join("");
  };

  displayData();
}
