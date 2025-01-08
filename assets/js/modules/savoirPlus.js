import { createRecipes } from './recipes.js';

export function savoir() {
    const recipesContainer = document.querySelector(".recipes");
    const recipeDetailContainer = document.querySelector(".recipes");

    if (!recipesContainer) {
        console.error("Le conteneur .recipes n'a pas été trouvé !");
        return;
    }

    if (!recipeDetailContainer) {
        console.error("Le conteneur .recipes-detail n'a pas été trouvé !");
        return;
    }

    // Délégation d'événements
    recipesContainer.addEventListener("click", async function (e) {
        // Vérifier que le clic s'est fait sur un lien avec classe `recipe__link`
        if (e.target.classList.contains("recipe__link")) {
            e.preventDefault();

            console.log("Click");

            const card = e.target.closest(".recipe-card"); // Trouver la carte parentale
            if (!card) {
                console.error("L'élément parent .recipe-card n'a pas été trouvé !");
                return;
            }

            console.log(card.dataset.id);
            const recipeId = card.dataset.id
            console.log("id: " + recipeId);

            try {
                const response = await fetch(`https://dummyjson.com/recipes/${recipeId}`);

                recipesContainer.innerHTML = "";

                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }

                const recipe = await response.json();

                recipeDetailContainer.innerHTML = `
                    <div class="recipe-card">
                        <div class="image-box">
                            <img class="recipe__image" src="${recipe.image}" alt="${recipe.name}">
                        </div>
                        <h3 class="recipe__title">${recipe.name}</h3>
                        <p class="recipe__cuisine"><span>Cuisine : </span>${recipe.cuisine}</p>
                        <p class="recipe__text"><span>Ingredients : </span>${recipe.ingredients.join(", ")}</p>
                        <p class="recipe__text"><span>Instructions : </span>${recipe.instructions.join(", ")}</p>
                        <button class="btn-back">Retour</button>
                    </div>
                `;

                document.querySelector(".btn-back").addEventListener("click", () => {
                    recipeDetailContainer.innerHTML = ""; // Vider le conteneur
                    createRecipes(); // Réinitialiser le conteneur
                });

            } catch (error) {
                console.error("Erreur lors de la récupération de la recette: ", error);
                recipeDetailContainer.innerHTML = "<p>Erreur de chargement des données.</p>";
            }
        }
    });
}
