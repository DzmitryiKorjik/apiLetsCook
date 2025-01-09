export function menuTags() {
    const dropdownMenu = document.querySelector('#dropdown .dropdown-menu-items')

    async function loadMenuTags() {
        try {
            const response = await fetch('https://dummyjson.com/recipes/tags');
            if (!response.ok) throw new Error('Failed to fetch tags');

            const tags = await response.json();
            // console.log('API Response (tags array):', tags); // Enregistrer le tableau reçu

            // Vérifier si la réponse est un tableau
            if (!Array.isArray(tags)) {
                throw new Error('Invalid data structure: Expected an array');
            }

            if (tags.length === 0) {
                dropdownMenu.innerHTML = `<li class="text-center">Aucun tag disponible</li>`;
                return;
            }

            dropdownMenu.innerHTML = '';

            tags.forEach(tag => {
                const li = document.createElement('li');
                li.classList.add('dropdown-item');
                const link = document.createElement('a');
                link.href = `#${tag}`;
                link.textContent = tag;

                li.appendChild(link);
                dropdownMenu.appendChild(li);
            });
        } catch (error) {
            console.error('Error loading tags:', error);
            dropdownMenu.innerHTML = `<li class="text-center">Erreur lors du chargement des tags</li>`;
        }
    }
    loadMenuTags();
}