export function initializeDropdown() {
  const btnRecettes = document.querySelector('#dropdownMenu');
  const dropdownMenu = document.querySelector('.dropdown-menu-items');
  const recipes = document.querySelector('.recipes');

  if (!btnRecettes || !dropdownMenu || !recipes) {
    console.error('Erreur : les éléments nécessaires n\'ont pas été trouvés');
    return;
  }

  // Afficher ou masquer les menus
  btnRecettes.addEventListener('click', function (e) {
    e.preventDefault();
    dropdownMenu.classList.toggle('active');
  });

  // Traitement de la sélection d'un élément de menu
  dropdownMenu.addEventListener('click', function (e) {
    e.preventDefault();

    const clickedItem = e.target.closest('a'); // Vérifier si le lien a été cliqué
    if (clickedItem) {
      recipes.textContent = clickedItem.textContent; // Régler la valeur sélectionnée
      dropdownMenu.classList.remove('active'); // Fermeture du menu
    }
  });

  // Réinitialisation du texte et fermeture du menu en cas de clic extérieur
  document.addEventListener('click', function (e) {
    if (!dropdownMenu.contains(e.target) && e.target !== btnRecettes) {
      dropdownMenu.classList.remove('active');
    }
  });
}
