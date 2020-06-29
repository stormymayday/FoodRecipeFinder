// DOM elements
export const elements = {

    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchResult: document.querySelector('.results'),
    searchResultList: document.querySelector('.results__list')

};

export const elementStrings = {

    loader: 'loader'

};

// Loading spinner
export const renderLoader = parent => {

    // Creating the loader
    const loader = `
    <div class="${elementStrings.loader}">
        <svg>
            <use href="img/icons.svg#icon-cw"></use>
        </svg>
    </div>
    `;

    // Inserting the loader    
    parent.insertAdjacentHTML('afterbegin', loader);

};

export const clearLoader = () => {

    const loader = document.querySelector(`.${elementStrings.loader}`);

    if (loader) {

        loader.parentElement.removeChild(loader);

    }

};