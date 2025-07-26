import icons from 'url:../../img/icons.svg';
export default class View {
  _data;
  _container;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    this.markupRender();
  }

  update(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) return;
    this._data = data;
    const newMarkup = this._generateMarkup(data);

    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const currentElements = Array.from(this._container.querySelectorAll('*'));

    newElements.forEach((newElement, i) => {
      const currentElement = currentElements[i];

      if (
        !newElement.isEqualNode(currentElement) &&
        newElement.firstChild?.nodeType === Node.TEXT_NODE &&
        newElement.firstChild.nodeValue.trim() !== ''
      ) {
        currentElement.textContent = newElement.textContent;
      }

      if (!newElement.isEqualNode(currentElement)) {
        Array.from(newElement.attributes).forEach(attribute =>
          currentElement.setAttribute(attribute.name, attribute.value)
        );
      }
    });
  }

  markupRender() {
    const markup = this._generateMarkup();
    this._clear();
    this._container.insertAdjacentHTML('afterbegin', markup);
  }

  _clear(container = this._container) {
    container.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
              <div class="spinner">
                <svg>
                  <use href="${icons}#icon-loader"></use>
                </svg>
              </div>`;
    this._container.innerHTML = '';
    this._container.insertAdjacentHTML('afterbegin', markup);
  }
  stopSpinner() {
    const spinner = this._container.querySelector('.spinner');
    if (spinner) spinner.remove();
  }

  renderError(message = this._errorMessage) {
    const markup = `
          <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}!</p>
          </div>`;
    this._clear();
    this._container.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._successMessage) {
    const markup = `
          <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}!</p>
          </div>`;
    this._clear();
    this._container.insertAdjacentHTML('afterbegin', markup);
  }
}
