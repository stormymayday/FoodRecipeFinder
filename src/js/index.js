import Search from './models/Search';

/** Global State
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};

const controlSearch = async () => {

    // Getting query from the view
    const query = 'pizza';

    if (query) {

        // Creating new Search object and storing it in the Global State object
        state.search = new Search(query);

        // Prepearing the UI

        // Searching the recipes
        await state.search.getResults();

        // Rendering the results
        console.log(state.search.result);

    }

};

document.querySelector('.search').addEventListener('submit', e => {

    e.preventDefault();

    controlSearch();

});

