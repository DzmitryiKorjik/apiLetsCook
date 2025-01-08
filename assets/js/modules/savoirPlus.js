export function savoir() {
    const recipesContainer = document.querySelector(".recipes");

    if (!recipesContainer) {
        console.error("Le conteneur .recipes n'a pas été trouvé !");
        return;
    }

    // Délégation d'événements
    recipesContainer.addEventListener("click", function (e) {
        // Vérifier que le clic s'est fait sur un lien avec classe `recipe__link`
        if (e.target.classList.contains("recipe__link")) {
            e.preventDefault();

            const card = e.target.closest(".recipe-card"); // Trouver la carte parentale
            if (!card) {
                console.error("L'élément parent .recipe-card n'a pas été trouvé !");
                return;
            }

            console.log(card.dataset.id);

            const recipe = card.dataset.id
            console.log("id: " + recipe);


            
        }
    });
}
