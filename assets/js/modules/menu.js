export function menuRecipes() {
  // Sélectionne les éléments du DOM pour afficher les recettes, boutons et le menu déroulant
  const recipesContainer = document.querySelector(".recipes");
  const previousButton = document.querySelector(".btn__direction-previous");
  const nextButton = document.querySelector(".btn__direction-next");
  const accueilButton = document.querySelector("#accueil");
  const dropdownMenu = document.querySelector("#dropdown .dropdown-menu-items");

  let currentPage = 1; // Initialise la page actuelle à 1
  const recipesPerPage = 12; // Définit le nombre de recettes par page
  let selectedTag = null; // Initialisation de la balise sélectionnée (aucune au début)

  // Fonction pour récupérer les recettes de l'API en fonction de la page actuelle
  const fetchRecipes = async (page) => {
    const response = await fetch(
      `https://dummyjson.com/recipes?limit=${recipesPerPage}&skip=${(page - 1) * recipesPerPage}`
    );
    const data = await response.json();
    return data.recipes; // Retourne uniquement les recettes
  };

  // Fonction pour afficher les recettes dans le conteneur, avec une option de filtrage par balise
  const displayRecipes = async (page, filterTag = null) => {
    // Affiche un indicateur de chargement avant que les recettes soient affichées
    recipesContainer.innerHTML = `
        <div class="loader-container">
          <div class="loader">
            <div class="inner-circle"></div>
          </div>
          <div class="loading-text">Chargement<span class="dots"></span></div>
        </div>
      `;

    try {
      // Récupère les recettes de l'API
      const recipes = await fetchRecipes(page);

      // Filtre les recettes en fonction du tag sélectionné (si présent)
      let filteredRecipes = recipes;
      if (filterTag) {
        // Ne garde que les recettes dont les tags contiennent le tag sélectionné
        filteredRecipes = recipes.filter((recipe) =>
          recipe.tags.includes(filterTag)
        );
      }

      // Si aucune recette n'est trouvée, affiche un message d'erreur
      if (filteredRecipes.length === 0) {
        recipesContainer.innerHTML = `<p class="text-center">Aucune recette trouvée.</p>`;
        return;
      }

      // Crée les cartes de recette HTML
      const recipeCardsHTML = filteredRecipes.map((recipe) => {
        const formattedIngredients = Array.isArray(recipe.ingredients)
          ? recipe.ingredients.join(", ").substring(0, 80) + "..." // Formatte les ingrédients sous forme de chaîne
          : "Aucun ingrédient";

        return `
          <div class="recipe-card" data-id=${recipe.id}>
            <div class="image-box">
              <img class="recipe__image" src="${recipe.image}" alt="${recipe.name}">
            </div>
              <h3 class="recipe__title">${recipe.name}</h3>
              <p class="recipe__rating">Difficulté: ${recipe.rating} ⭐⭐⭐</p>
              <p class="recipe__text timesNewRoman">${formattedIngredients}</p>
              <a href="#" class="recipe__link">En savoir plus...</a>
          </div>`;
      });

      // Injecte le HTML généré dans le conteneur des recettes
      recipesContainer.innerHTML = recipeCardsHTML.join("");
    } catch (error) {
      // Si une erreur se produit pendant le chargement, affiche un message d'erreur
      recipesContainer.innerHTML = `<p class="text-center">Erreur de chargement des données.</p>`;
    }
  };

  // Gestionnaires d'événements pour les boutons de navigation (Précédent et Suivant)
  previousButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--; // Diminue le numéro de la page
      displayRecipes(currentPage, selectedTag); // Affiche les recettes de la nouvelle page
    }
  });

  nextButton.addEventListener("click", () => {
    currentPage++; // Augmente le numéro de la page
    displayRecipes(currentPage, selectedTag); // Affiche les recettes de la nouvelle page
  });

  // Gestionnaire d'événement pour le bouton Accueil (page 1)
  accueilButton.addEventListener("click", () => {
    currentPage = 1; // Réinitialise la page à 1
    selectedTag = null; // Réinitialise le tag sélectionné
    displayRecipes(currentPage); // Affiche toutes les recettes sans filtre
  });

  // Gestionnaire d'événement pour le menu déroulant des balises (tags)
  dropdownMenu.addEventListener("click", (event) => {
    const clickedElement = event.target;

    // Si un élément de menu (lien) a été cliqué
    if (clickedElement.tagName === "A") {
      event.preventDefault(); // Empêche le comportement par défaut du lien
      selectedTag = clickedElement.textContent; // Récupère le tag sélectionné
      currentPage = 1; // Remet la page à 1 lorsque le tag est sélectionné
      displayRecipes(currentPage, selectedTag); // Affiche les recettes filtrées par le tag sélectionné
    }
  });

  // Initialisation : affichage des recettes sur la première page sans filtre
  displayRecipes(currentPage);
}
