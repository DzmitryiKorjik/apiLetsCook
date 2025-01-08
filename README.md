# apiLetsCook
//  import { createRecipes } from './recipes.js';

            // Extraction des données de la carte
             const imageElement = card.querySelector(".recipe__image");
             const image = imageElement ? imageElement.src : "Pas d'image";
             const title = card.querySelector(".recipe__title")?.textContent || "pas du title";
             const rating = card.querySelector(".recipe__rating")?.textContent || "Pas du rating";
             const fullIngredients = card.querySelector(".recipe__text")?.getAttribute("data-full-ingredients") || "Pas du ingredients";

            // Libérez le conteneur et insérez la carte dépliée.
             recipesContainer.innerHTML = `
                 <div class="recipe-card">
                     <div class="image-box">
                         <img class="recipe__image" src="${image}" alt="${title}">
                     </div>
                    <p class="recipe__rating">${rating}</p>
                    <h2 class="recipe__title">${title}</h2>
                    <p class="recipe__text">${fullIngredients}</p>
                    <button class="btn-back">Retour</button>
            `;

            document.querySelector(".btn-back").addEventListener("click", () => {
                createRecipes(); // Réinitialiser le conteneur
            });