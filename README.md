# apiLetsCook

## Description
**Let's Cook** est une application web développée entièrement en **Vanilla JavaScript** (sans frameworks). Elle permet aux utilisateurs de rechercher et d'explorer des recettes de cuisine en s'appuyant sur une **API REST** externe, [DummyJSON](https://dummyjson.com/).

### Objectifs pédagogiques

Ce projet a été conçu pour :
- Utiliser des **fonctions asynchrones** pour interagir avec une API REST.
- Structurer un projet web avec des bonnes pratiques : **HTML sémantique**, **CSS modularisé**, et **JavaScript en modules**.

## Fonctionnalités principales 🍴

1. **Recherche de recettes :** 🔍
   - Saisissez un mot-clé pour rechercher des recettes correspondantes.
   - Les résultats sont mis à jour dynamiquement grâce à une requête asynchrone.
   - Naviguez dans le menu des recettes grâce au bouton 'Recettes'.
   - Découvrez des recettes tendances en fonction de leur difficulté via le bouton "Tendances", qui affiche les recettes avec une note de difficulté supérieure à 4,5.
2. **Afficher les détails :** 📲
   - Cliquez sur les liens pour afficher plus d'informations sur une recette. Les contenus sont mis à jour dynamiquement pour une expérience fluide.
3. **Pagination dynamique :** 📄
   - Naviguez entre les pages grâce aux boutons "Précédent" et "Suivant", qui s'adaptent automatiquement au nombre de recettes affichées.
4. **Responsive Design :** 💻
   - L'application est optimisée pour une utilisation sur mobiles, tablettes et ordinateurs de bureau.

## Architecture du projet

```
.
├── assets
│   ├── css
|   |   |
│   │   ├── button.css
│   │   ├── custom.css
│   │   ├── header.css
│   │   ├── loader.css
│   │   ├── reboot.css
│   │   ├── style.css
│   │   ├── utilities.css
│   │   └── variables.css
│   │── fonts
|   |
│   ├── images
│   │   └── logo.svg
│   └── js
|       |── modules
|       |   |
|       |   |── dropdown.js
|       |   |── menu.js
|       |   |── menuTags.js
|       |   |── recipes.js
|       |   |── savoirPlus.js
|       |   |── search.js
│       └── index.js
│       
├── index.html
├── README.md
└── .gitignore
```

### Points clés de l'architecture :

1. **Séparation des préoccupations :**
   - **CSS** : Modularisé avec des fichiers dédiés pour les variables, styles généraux, et utilitaires.
   - **JavaScript** : Code structuré avec des modules.

## Ressources utilisées 📚

   - **API :** [DummyJSON](https://dummyjson.com/) pour les données des recettes.
   - **JavaScript :** Aucune bibliothèque ou framework.
   - **CSS :** Reboot et styles personnalisés.
## Fonctionnement

### Installation

1. Clonez ce dépôt :
   ```bash
   git clone https://github.com/DzmitryiKorjik/apiLetsCook.git
   ```
2. Accédez au répertoire du projet :
   ```bash
   cd lets-cook
   ```
3. Ouvrez le fichier `index.html` dans votre navigateur ou servez le projet avec un outil local (comme [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)).

### Explications techniques

- **Fonctions asynchrones :**
  - Les méthodes `fetchData` et `displayData` utilisent `async/await` pour récupérer et afficher les données.
  - La gestion des erreurs garantit une expérience utilisateur fluide.
- **API REST :**
  - Les requêtes sont construites dynamiquement à partir des paramètres sélectionnés (mot-clé, filtres, pagination).
  - Exemple d'URL générée : `https://dummyjson.com/recipes?limit=12&skip=24`.
- **Pagination :**
  - Les boutons "Précédent" et "Suivant" ajustent la valeur de `skip` en fonction du nombre d'éléments à afficher (`limit`).

### Déploiement

- Le projet sera déployé sur **Vercel**. Accédez à l'application ici : [Let's Cook](https://lets-cook.vercel.app).

### Affichage

- Le projet sur l'application : [Let's Cook](https://api-lets-cook.vercel.app/)

## Auteur

- **Nom :** MARDOVITCH Dzmitryi
- **Formation :** Développement Web et Web Mobile.
- **Objectif :** Validation des compétences en création et déploiement d'applications web.

## Améliorations possibles 🚀

1. Ajouter une base de données pour stocker les recettes.
2. Intégrer un système d'authentification pour les utilisateurs.
3. Migrer vers un framework comme **React** pour une gestion plus avancée des états.
4. Ajouter des tests automatisés avec **Jest** ou **Cypress**.