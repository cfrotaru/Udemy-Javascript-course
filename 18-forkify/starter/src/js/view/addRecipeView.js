import View from './view';

class AddRecipeView extends View {
  _container = document.querySelector('.upload');
  _successMessage = `Recipe was successfully uploaded :)`;

  #window = document.querySelector('.add-recipe-window');
  #overlay = document.querySelector('.overlay');
  #btnOpen = document.querySelector('.nav__btn--add-recipe');
  #btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this.#addHandlerShowWindow();
    this.#addHandlerHideWindow();
  }
  #addHandlerShowWindow() {
    this.#btnOpen.addEventListener('click', this.toggleModal.bind(this, true));
  }
  #addHandlerHideWindow() {
    [this.#overlay, this.#btnClose].forEach(element =>
      element.addEventListener('click', this.toggleModal.bind(this, false))
    );
  }

  addHandlerUpload(handler) {
    this._container.addEventListener('submit', function (e) {
      e.preventDefault();

      const dataArray = [...new FormData(this)];
      const data = Object.fromEntries(dataArray);

      handler(data);
    });
  }

  toggleModal(openModal = false) {
    this.#window.classList.toggle('hidden', !openModal);
    this.#overlay.classList.toggle('hidden', !openModal);
  }
}

export default new AddRecipeView();
