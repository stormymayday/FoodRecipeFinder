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
	console.log(query);

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

		// Searching the recipes
		await state.search.getResults();

		// Clearing the loader
		clearLoader();

		// Rendering the results
		searchView.renderResults(state.search.result);
	}
};

// Recipe Controller
const r = new Recipe(47746);
r.getRecipe();
console.log(r);

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
