import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => { elements.searchInput.value = ''; };

export const clearResults = () => { elements.searchResultList.innerHTML = ''; };

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

const renderRecipe = recipe => {

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

export const renderResults = recipes => {

    recipes.forEach(renderRecipe);

};