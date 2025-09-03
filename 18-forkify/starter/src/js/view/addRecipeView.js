import View from './view';
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {
  _container = document.querySelector('.upload__container');
  _successMessage = `Recipe was successfully uploaded :)`;

  #window = document.querySelector('.add-recipe-window');
  #overlay = document.querySelector('.overlay');
  #btnOpen = document.querySelector('.nav__btn--add-recipe');
  #btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this.#addHandlerShowWindow();
    this.#addHandlerHideWindow();
    this.#addHandlerAddIngredient();
    this.#addHandlerRemoveIngredient();
  }

  #ingredientMarkup(index) {
    const ingredientsContainer = document.getElementById(
      'ingredients-container'
    );
    if (!index)
      index = ingredientsContainer
        ? ingredientsContainer.querySelectorAll('.ingredient-data').length + 1
        : 1;

    const markup = `<div class="ingredient-data">
              <div class="ingredient-header">
                <label class="ingredient-label">Ingredient ${index}</label>
                <button
                  type="button" 
                  class="btn--remove-ingredient">
                  &times;
                </button>
              </div>
              <div class="ingredient-row">
                <input
                  type="number"
                  class="input-quantity"
                  name="quantity[]"
                  placeholder="Quantity"
                  step="0.01"
                />
                <input
                  type="text"
                  class="input-unit"
                  name="unit[]"
                  placeholder="Unit"
                />
              </div>
              <div class="ingredient-row">
                <input
                  type="text"
                  class="input-description"
                  name="description[]"
                  placeholder="Description"
                  required
                />
              </div>
            </div>`;
    return markup;
  }

  _generateMarkup() {
    const markup = `
      <form class="upload">
        <div class="upload__column">
          <h3 class="upload__heading">Recipe data</h3>
          <label>Title</label>
          <input required name="title" type="text" />
          <label>URL</label>
          <input required name="sourceUrl" type="text" />
          <label>Image URL</label>
          <input required name="image" type="text" />
          <label>Publisher</label>
          <input required name="publisher" type="text" />
          <label>Prep time</label>
          <input required name="cookingTime" type="number" />
          <label>Servings</label>
          <input required name="servings" type="number" />
        </div>

        <div class="upload__column--ingredients">
          <h3 class="upload__heading">Ingredients</h3>
          <div class="ingredients-container" id="ingredients-container">
          ${this.#ingredientMarkup(1)}
          ${this.#ingredientMarkup(2)}
          </div>
          <button type="button" class="btn add__btn">
            + Add Ingredient
          </button>
        </div>

        <button class="btn upload__btn">
          <svg>
            <use href="${icons}#icon-upload-cloud"></use>
          </svg>
          <span>Upload</span>
        </button>
      </form>`;
    return markup;
  }

  #addHandlerShowWindow() {
    this.#btnOpen.addEventListener('click', this.toggleModal.bind(this, true));
  }
  #addHandlerHideWindow() {
    [this.#overlay, this.#btnClose].forEach(element =>
      element.addEventListener('click', this.toggleModal.bind(this, false))
    );
  }

  #addHandlerAddIngredient() {
    this._container.addEventListener('click', e => {
      const btn = e.target.closest('.add__btn');
      if (!btn) return;
      const ingContainer = this._container.querySelector(
        '.ingredients-container'
      );
      ingContainer.insertAdjacentHTML('beforeend', this.#ingredientMarkup());
      ingContainer.scrollTop = ingContainer.scrollHeight;
    });
  }

  #addHandlerRemoveIngredient() {
    this._container.addEventListener('click', e => {
      const btn = e.target.closest('.btn--remove-ingredient');
      if (!btn) return;

      // Prevent removing last ingredient and display tooltip
      if (
        btn
          .closest('.ingredients-container')
          .querySelectorAll('.ingredient-data').length === 1
      ) {
        this.showTooltip(btn, 'Cannot remove the last ingredient');
        return;
      }

      // Remove ingredient
      btn.closest('.ingredient-data').remove();
      // Renumber remaining ingredients
      this.#renumberIngredients();
    });
  }

  #renumberIngredients() {
    const ingredients = document.querySelectorAll('.ingredient-data');
    ingredients.forEach((ingredient, index) => {
      const newIndex = index + 1;

      // Update label
      const label = ingredient.querySelector('.ingredient-label');
      label.textContent = `Ingredient ${newIndex}`;
    });
  }

  addHandlerUpload(handler) {
    this._container.addEventListener('submit', e => {
      e.preventDefault();

      handler(new FormData(this._container.querySelector('.upload')));
    });
  }

  toggleModal(openModal = false) {
    this.#window.classList.toggle('hidden', !openModal);
    this.#overlay.classList.toggle('hidden', !openModal);
    if (!this._container.querySelector('.upload')) {
      this.markupRender();
    }
  }
}

export default new AddRecipeView();
