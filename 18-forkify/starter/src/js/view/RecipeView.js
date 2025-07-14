import icons from 'url:../../img/icons.svg';

class RecipeView {
  #Container = document.querySelector('.recipe');

  render(recipe) {
    const markup = `
      <figure class="recipe__fig">
        <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img">
        <h1 class="recipe__title">
          <span>${recipe.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${
            recipe.cookingTime
          }</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${
            recipe.updatedServings
          }</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--decrease-servings">
              <svg><use href="${icons}#icon-minus-circle"></use></svg>
            </button>
            <button class="btn--tiny btn--increase-servings">
              <svg><use href="${icons}#icon-plus-circle"></use></svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated">
          <svg><use href="${icons}#icon-user"></use></svg>
        </div>
        <button class="btn--round">
          <svg><use href="${icons}#icon-bookmark-fill"></use></svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          ${this.generateIngredientsMarkup(recipe.updatedIngredients)}
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${
            recipe.publisher
          }</span>. Please check out directions at their website.
        </p>
        <a class="btn--small recipe__btn" href="${
          recipe.sourceUrl
        }" target="_blank">
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>`;

    this.#Container.innerHTML = '';
    this.#Container.insertAdjacentHTML('afterbegin', markup);
  }

  generateIngredientsMarkup(ingredients) {
    return ingredients
      .map(
        ing => `
      <li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${icons}#icon-check"></use>
        </svg>
        ${
          ing.quantity
            ? `<div class="recipe__quantity">${ing.quantity}</div>`
            : ''
        }
        <div class="recipe__description">
          ${ing.unit ? `<span class="recipe__unit">${ing.unit}</span>` : ''}
          ${ing.description}
        </div>
      </li>`
      )
      .join('');
  }

  addHandlerUpdateServings(handler) {
    this.#Container.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--tiny');
      if (!btn) return;

      const isIncrease = btn.classList.contains('btn--increase-servings');
      const isDecrease = btn.classList.contains('btn--decrease-servings');

      if (!isIncrease && !isDecrease) return;

      handler(isIncrease);
    });
  }
}

export default new RecipeView();
