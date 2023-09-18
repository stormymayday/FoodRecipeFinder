const renderSpinner = (parentElement) => {

    const newDiv = document.createElement("div");

    newDiv.classList.add('spinner');

    const markup = `
          <svg>
            <use href="/icons.svg#icon-loader"></use>
          </svg>
  `;

    newDiv.innerHTML = markup;

    parentElement.innerHTML = ``;

    parentElement.insertAdjacentElement('afterbegin', newDiv);

};

export default renderSpinner;