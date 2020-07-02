import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
	elements.searchInput.value = '';
};

export const clearResults = () => {
	// Clearing results
	elements.searchResultList.innerHTML = '';

	// Clearing buttons
	elements.searchResPages.innerHTML = '';
};

export const highlightSelected = (id) => {
	// Selecting all the results
	const resultsArr = Array.from(document.querySelectorAll('.results__link'));

	// Removing --active class from previous selections
	resultsArr.forEach((el) => {
		el.classList.remove('results__link--active');
	});

	// Adding --active class
	document.querySelector(`a[href="#${id}"]`).classList.add('results__link--active');
};

const limitRecipeTitle = (title, lengthLimit = 17) => {
	const newTitle = [];

	if (title.length > lengthLimit) {
		title.split(' ').reduce((acc, currentWord) => {
			if (acc + currentWord.length <= lengthLimit) {
				newTitle.push(currentWord);
			}

			return acc + currentWord.length;
		}, 0);

		return `${newTitle.join(' ')} ...`;
	}

	return title;
};

const renderRecipe = (recipe) => {
	// Generating the markup
	const markup = `
                <li>
                    <a class="results__link" href="#${recipe.recipe_id}">
                        <figure class="results__fig">
                            <img src="${recipe.image_url}" alt="${recipe.title}">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                </li>
    
    `;

	// Inserting markup into the list
	elements.searchResultList.insertAdjacentHTML('beforeend', markup);
};

// type: 'prev' or 'next'
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
    <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;

// Pagination buttons
const renderButtons = (page, numResults, resPerPage) => {
	const pages = Math.ceil(numResults / resPerPage);

	let button;

	if (page === 1 && pages > 1) {
		// Single next page button
		button = createButton(page, 'next');
	} else if (page < pages) {
		// Both buttons
		button = `
            
        ${createButton(page, 'prev')}
        ${createButton(page, 'next')}
    
    `;
	} else if (page === pages && pages > 1) {
		// Single previous page button
		button = createButton(page, 'prev');
	}

	// Inserting button(s)
	elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
	const start = (page - 1) * resPerPage;
	const end = page * resPerPage;

	// Displaying 10 results per page
	recipes.slice(start, end).forEach(renderRecipe);

	// Rendering pagination buttons
	renderButtons(page, recipes.length, resPerPage);
};
