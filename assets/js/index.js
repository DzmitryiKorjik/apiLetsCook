import { initializeDropdown } from './modules/dropdown.js';
import { createRecipes } from './modules/recipes.js';
import { initializeSearch } from './modules/search.js';

document.addEventListener('DOMContentLoaded', () => {
  initializeDropdown(); 
  createRecipes(); 
  initializeSearch();  
});

