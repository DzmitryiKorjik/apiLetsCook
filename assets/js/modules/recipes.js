export function createRecipes() {
  const recipesContainer = document.querySelector(".recipes");
    const previousButton = document.querySelector(".btn__direction-previous");
    const nextButton = document.querySelector(".btn__direction-next");
    const accueilButton = document.querySelector("#accueil");
    const tendancesBtn = document.querySelector('#tendances');

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
            recipesContainer.innerHTML = "<p>Aucune recette trouvée.</p>";
            return;
          }
    
          const recipeCardsHTML = filteredRecipes.map((element) =>
              `<div class="recipe-card">
                <img class="recipe__image" src="${element.image}" alt="${element.name}">
                <h3 class="recipe__title">${element.name}</h3>
                <p class="recipe__rating">${element.rating} ⭐⭐⭐</p>
                <p class="recipe__text">${element.ingredients}</p>
              </div>`
          );
    
          recipesContainer.innerHTML = recipeCardsHTML.join("");
        } catch (error) {
          recipesContainer.innerHTML = "<p>Erreur de chargement des données.</p>";
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
