// Основная функция для поиска рецептов
export function initializeSearch() {
    const searchInput = document.querySelector('.header__search input'); // Champ de saisie
    const searchButton = document.querySelector('.header__search button'); // Bouton de recherche
    const recipesContainer = document.querySelector('.recipes'); // Container pour l'affichage des recettes
  
    // Fonction de recherche
    const fetchRecipes = async (query) => {
      try {
        // Envoyer une demande à l'API avec le mot saisi
        const response = await fetch(`https://dummyjson.com/recipes/search?q=${encodeURIComponent(query)}`);
        console.log(response);
        if (!response.ok) {
          throw new Error("Erreur lors de l'exécution de la requête");
        }
        const data = await response.json();
        return data.recipes; // Retourne un tableau de recettes
      } catch (error) {
        console.error('Erreur:', error);
        return [];
      }
    };
  
    // Fonction d'affichage des résultats de la recherche
    const displayRecipes = (recipes) => {
      recipesContainer.innerHTML = ''; // Effacer le conteneur avant d'afficher de nouvelles données
  
      if (recipes.length === 0) {
        // S'il n'y a pas de recettes, un message s'affiche
        recipesContainer.innerHTML = '<p class="text-center">Rien trouvé</p>';
        return;
      }
  
      // Générer du HTML pour chaque recette
      const recipesHTML = recipes.map(recipe => {
        
      const formattedIngredients = Array.isArray(recipe.ingredients)
        ? recipe.ingredients.join(", ").substring(0, 50) + "..."
         : "Aucun ingrédient";

         const fullIngredients = Array.isArray(recipe.ingredients)
         ? recipe.ingredients.join(", ")
         : "Aucun ingrédient";

        // Générer le HTML pour une recette
      return`
        <div class="recipe-card">
          <div class="image-box">
            <img class="recipe__image" src="${recipe.image}" alt="${recipe.name}">
          </div>
          <h3 class="recipe__title">${recipe.name}</h3>
          <p class="recipe__rating">Difficulté: ${recipe.rating} ⭐⭐⭐</p>
          <p class="recipe__text timesNewRoman" data-full-ingredients="${fullIngredients}">${formattedIngredients}</p>
          <a href="#" class="recipe__link">En savoir plus...</a>
        </div>
      `});
  
      recipesContainer.innerHTML = recipesHTML.join(''); // Insérer du HTML dans le conteneur
    };
  
    // Gestionnaire du bouton de recherche
    searchButton.addEventListener('click', async () => {
      const query = searchInput.value.trim(); // Obtenir le mot saisi, en supprimant les espaces
  
      if (query === '') {
        // Si le champ est vide, le message suivant apparaît
        recipesContainer.innerHTML = '<p class="text-center">Saisir un terme de recherche</p>';
        return;
      }
  
      recipesContainer.innerHTML = '<p class="text-center">Chargement...</p>'; // Affichage de l'indicateur de charge
  
      const recipes = await fetchRecipes(query); // Recherche de recettes
      displayRecipes(recipes); // Afficher les résultats
    });
  
    // Gestionnaire de recherche lors de l'appui sur la touche Entrée d'un champ de saisie
    searchInput.addEventListener('keypress', async (e) => {
      if (e.key === 'Enter') {
        e.preventDefault(); // Empêcher l'envoi du formulaire
  
        const query = searchInput.value.trim(); // Obtenir le mot saisi, en supprimant les espaces
  
        if (query === '') {
          recipesContainer.innerHTML = '<p class="text-center">Saisir un terme de recherche</p>';
          return;
        }
  
        recipesContainer.innerHTML = '<p class="text-center">Chargement...</p>'; // Affichage de l'indicateur de charge
  
        const recipes = await fetchRecipes(query); // Recherche de recettes
        displayRecipes(recipes); // Afficher les résultats
      }
    });
  }
  