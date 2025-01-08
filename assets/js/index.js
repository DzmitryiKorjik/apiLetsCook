import { initializeDropdown } from './modules/dropdown.js';
import { menuTags } from './modules/menuTags.js';
import { menuRecipes } from './modules/menu.js';
import { createRecipes } from './modules/recipes.js';
import { initializeSearch } from './modules/search.js';


document.addEventListener('DOMContentLoaded', () => {
  initializeDropdown();
  menuTags();
  menuRecipes();
  createRecipes(); 
  initializeSearch();  
});

