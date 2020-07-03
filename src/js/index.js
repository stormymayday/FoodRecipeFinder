import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import { elements, renderLoader, clearLoader } from './views/base';

/** Global State
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};
//TESTING
window.state = state;

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
		// Clearing previous recipe
		recipeView.clearRecipe();

		// Rendering the loader
		renderLoader(elements.recipe);

		// Highlighting selected search item
		if (state.search) {
			searchView.highlightSelected(id);
		}

		// Creating new Recipe object and saving in the Global State
		state.recipe = new Recipe(id);

		try {
			// Getting recipe data
			await state.recipe.getRecipe();

			// Parsing the ingredients
			state.recipe.parseIngredients();

			// Calculating the cooking time
			state.recipe.calcCookingTime();

			// Calculating the number of servings
			state.recipe.calcServings();

			// Clearing the loader
			clearLoader();

			// Rendering the Recipe
			recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
		} catch (error) {
			alert('Something went wrong.');
		}
	}
};

// Adding Event Listener on events: hashchange in the url, page load:
[ 'hashchange', 'load' ].forEach((event) => window.addEventListener(event, controlRecipe));

// List Controller
const controlList = () => {
	// Clearing previously rendered list
	listView.clearList();

	// Initializing  a new list if there is none
	if (!state.list) {
		state.list = new List();
	}

	state.recipe.ingredients.forEach((el) => {
		// Adding ingredients to the list
		const item = state.list.addItem(el.count, el.unit, el.ingredient);

		// Rendering the list
		listView.renderItem(item);
	});
};

// Updating and deleting shopping list items
elements.shopping.addEventListener('click', (e) => {
	// Reading ID of the clicked item
	const id = e.target.closest('.shopping__item').dataset.itemid;

	// Delete button event
	if (e.target.matches('.shopping__delete, .shopping__delete *')) {
		// Deleting item from the Global State
		state.list.deleteItem(id);

		// Removing item from the UI
		listView.deleteItem(id);

		// Count button
	} else if (e.target.matches('.shopping__count-value')) {
		// Reading the value
		const val = parseFloat(e.target.value, 10);

		// Updating the count
		state.list.updateCount(id, val);
	}
});

// Likes Controller
const controlLikes = () => {
	// Instantiating new Likes object and storing it in the Global State
	if (!state.likes) {
		state.likes = new Likes();
	}

	// Getting ID of the current recipe
	const currentID = state.recipe.id;

	if (!state.likes.isLiked(currentID)) {
		/* The recipe has not been liked */
		// Adding like to the Global State
		const newLike = state.likes.addLike(currentID, state.recipe.title, state.recipe.author, state.recipe.img);

		// Toggling the like button
		likesView.toggleLikeBtn(true);

		// Adding like to the UI list
		likesView.renderLike(newLike);
	} else {
		/* The recipe has been liked */
		// Removing like from the Global State
		state.likes.deleteLike(currentID);

		// Toggling the like button
		likesView.toggleLikeBtn(false);

		// Removing like to the UI list
		likesView.deleteLike(currentID);
	}

	// Toggling the Likes menu
	likesView.toggleLikeMenu(state.likes.getNumLikes());
};

// Restoring liked recipes on page load
window.addEventListener('load', () => {
	state.likes = new Likes();

	// Restoring likes
	state.likes.readStorage();

	// Toggling like menu button
	likesView.toggleLikeMenu(state.likes.getNumLikes());

	// Rendering existing likes in the likes menu
	state.likes.likes.forEach((like) => likesView.renderLike(like));
});

// Increase / Decrease number of servings buttons
elements.recipe.addEventListener('click', (event) => {
	if (event.target.matches('.btn-decrease, .btn-decrease *')) {
		if (state.recipe.servings > 1) {
			// Decreasing the number of servings
			state.recipe.updateServings('dec');
			recipeView.updateServingsIngredients(state.recipe);
		}
	} else if (event.target.matches('.btn-increase, .btn-increase *')) {
		if (state.recipe.servings <= 100) {
			// Increasing the number of servings
			state.recipe.updateServings('inc');
			recipeView.updateServingsIngredients(state.recipe);
		}
	} else if (event.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
		// Adding ingredient to the shopping list
		controlList();
	} else if (event.target.matches('.recipe__love, .recipe__love  *')) {
		// Likes controller
		controlLikes();
	}
});
