import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

/** Global State
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};

// Search Controller
const controlSearch = async () => {
	// Getting query from the view
	const query = searchView.getInput();

	if (query) {
		// Instantiating new Search object and storing it in the Global State
		state.search = new Search(query);

		// Prepearing the UI:
		// Clearing the input field
		searchView.clearInput();

		// Clearing the results list from the previous search
		searchView.clearResults();

		// Rendering the loader
		renderLoader(elements.searchResult);

		try {
			// Searching the recipes
			await state.search.getResults();

			// Clearing the loader
			clearLoader();

			// Rendering the results
			searchView.renderResults(state.search.result);
		} catch (error) {
			alert('Something went wrong.');

			// Clearing the loader
			clearLoader();
		}
	}
};

// Search form event listener (on submit)
elements.searchForm.addEventListener('submit', (event) => {
	// Preventing page reload
	event.preventDefault();

	// Called whenever the form is submitted
	controlSearch();
});

elements.searchResPages.addEventListener('click', (event) => {
	const btn = event.target.closest('.btn-inline');

	if (btn) {
		const goToPage = parseInt(btn.dataset.goto, 10);

		searchView.clearResults();

		searchView.renderResults(state.search.result, goToPage);
	}
});

// Recipe Controller
const controlRecipe = async () => {
	// Getting recipe ID from url
	const id = window.location.hash.replace('#', '');
	// console.log(id);

	if (id) {
		// Prepearing UI
		// Creating new Recipe object and saving in the Global State
		state.recipe = new Recipe(id);

		try {
			// Getting recipe data
			await state.recipe.getRecipe();

			// TESTING
			console.log(state.recipe.ingredients);

			// Parsing the ingredients
			state.recipe.parseIngredients();

			// Calculating the cooking time
			state.recipe.calcCookingTime();

			// Calculating the number of servings
			state.recipe.calcServings();

			// Rendering the Recipe
			console.log(state.recipe);
		} catch (error) {
			alert('Something went wrong.');
		}
	}
};

// Adding Event Listener on events: hashchange in the url, page load:
[ 'hashchange', 'load' ].forEach((event) => window.addEventListener(event, controlRecipe));
