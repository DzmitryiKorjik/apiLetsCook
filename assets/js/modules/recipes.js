export function createRecipes() {
  const recipesContainer = document.querySelector(".recipes");
  const previousButton = document.querySelector(".btn__direction-previous");
  const nextButton = document.querySelector(".btn__direction-next");
  const accueilButton = document.querySelector("#accueil");
  const tendancesBtn = document.querySelector("#tendances");

  let currentPage = 1;
  const recipesPerPage = 12;

  const fetchData = async (page) => {
    const response = await fetch(
      `https://dummyjson.com/recipes?limit=${recipesPerPage}&skip=${(page - 1) * recipesPerPage}&sortBy=id&order=desc`
    );
    const data = await response.json();
    return data;
  };

  const displayData = async (page, filterFn = null) => {
    recipesContainer.innerHTML = `
          <div class="loader-container">
            <div class="loader">
              <div class="inner-circle"></div>
            </div>
            <div class="loading-text">Chargement<span class="dots"></span></div>
          </div>
        `;
    try {
      const data = await fetchData(page);

      recipesContainer.innerHTML = "";

      // Appliquer le filtrage si la fonction de filtrage est passée dans
      let filteredRecipes = data.recipes;
      if (filterFn) {
        filteredRecipes = filteredRecipes.filter(filterFn);
      }

      if (filteredRecipes.length === 0) {
        recipesContainer.innerHTML = `<p class="text-center">Aucune recette trouvée.</p>`;
        return;
      }

      const recipeCardsHTML = filteredRecipes.map((element) => {
        const formattedIngredients = Array.isArray(element.ingredients)
          ? element.ingredients.join(", ").substring(0, 50) + " ..."
          : "Aucun ingrédient";

        const fullIngredients = Array.isArray(element.ingredients)
          ? element.ingredients.join(", ")
          : "Aucun ingrédient";

        return `
              <div class="recipe-card" data-id=${element.id}>
                <div class="image-box">
                  <img class="recipe__image" src="${element.image}" alt="${element.name}">
                </div>
                <h3 class="recipe__title">${element.name}</h3>
                <p class="recipe__rating">Difficulté: ${element.rating} ⭐⭐⭐</p>
                <p class="recipe__text timesNewRoman" data-full-ingredients="${fullIngredients}">${formattedIngredients}</p>
                <a href="#" class="recipe__link">En savoir plus...</a>
              </div>`;
      });

      recipesContainer.innerHTML = recipeCardsHTML.join("");
    } catch (error) {
      recipesContainer.innerHTML = `<p class="text-center">Erreur de chargement des données.</p>`;
    }
  };

  // Gestionnaires d'événements pour les boutons
  previousButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      displayData(currentPage);
    }
  });

  nextButton.addEventListener("click", () => {
    currentPage++;
    displayData(currentPage);
  });

  accueilButton.addEventListener("click", () => {
    currentPage = 1;
    displayData(currentPage);
  });

  tendancesBtn.addEventListener("click", () => {
    currentPage = 1;
    displayData(currentPage, (element) => element.rating >= 4.5);
  });

  //  Initialisation : chargement de la première page
  displayData(currentPage);
}
