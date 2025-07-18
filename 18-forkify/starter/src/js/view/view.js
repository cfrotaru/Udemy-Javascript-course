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
