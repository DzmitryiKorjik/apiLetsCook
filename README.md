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

//================================================================
export function savoir() {
    const recipesContainer = document.querySelector(".recipes");
    const recipeDetailContainer = document.querySelector(".recipe-detail"); // Блок для подробной информации

    if (!recipesContainer || !recipeDetailContainer) {
        console.error("Le conteneur .recipes ou .recipe-detail n'a pas été trouvé !");
        return;
    }

    recipesContainer.addEventListener("click", async function (e) {
        // Проверка, что клик был по ссылке с классом `recipe__link`
        if (e.target.classList.contains("recipe__link")) {
            e.preventDefault();

            const card = e.target.closest(".recipe-card"); // Находим родительский элемент (карточку рецепта)
            if (!card) {
                console.error("L'élément parent .recipe-card n'a pas été trouvé !");
                return;
            }

            const recipeId = card.dataset.id; // Получаем id рецепта
            console.log("id: " + recipeId);

            // Загружаем подробную информацию о рецепте
            try {
                const response = await fetch(`https://dummyjson.com/recipes/${recipeId}`);
                const recipe = await response.json();

                // Обновляем содержимое блока для подробной информации
                recipeDetailContainer.innerHTML = `
                    <h2>${recipe.name}</h2>
                    <img src="${recipe.image}" alt="${recipe.name}" />
                    <p>${recipe.description || "Описание не доступно."}</p>
                    <h3>Ингредиенты:</h3>
                    <p>${recipe.ingredients.join(", ")}</p>
                `;
            } catch (error) {
                console.error("Ошибка при загрузке рецепта:", error);
                recipeDetailContainer.innerHTML = "<p>Ошибка загрузки данных рецепта.</p>";
            }
        }
    });
}


<div class="recipe-detail"></div> <!-- Этот блок будет обновляться при клике на рецепт -->
