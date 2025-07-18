import View from './view';
class ResultsView extends View {
  _data;
  _container = document.querySelector('.results');
  _errorMessage = `No recipe was found :'(`;

  _generateMarkup() {
    const markup = this._data.map(this.#generateMarkupPreview).join('');
    return markup;
  }

  #generateMarkupPreview(recipe) {
    return `
        <li class="preview">
            <a class="preview__link preview__link" href="#${recipe.id}">
              <figure class="preview__fig">
                <img src="${recipe.image}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${recipe.title}</h4>
                <p class="preview__publisher">${recipe.publisher}</p>
              </div>
            </a>
          </li>
    `;
  }
}

export default new ResultsView();
