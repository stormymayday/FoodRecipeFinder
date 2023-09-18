const renderSpinner = (parentElement) => {

    const markup = `
        <div class="spinner">
          <svg>
            <use href="/icons.svg#icon-loader"></use>
          </svg>
        </div> 
  `;

    parentElement.innerHTML = ``;

    parentElement.insertAdjacentElement('afterbegin', markup);

};

export default renderSpinner;