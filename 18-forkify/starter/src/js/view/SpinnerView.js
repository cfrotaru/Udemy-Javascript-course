import icons from 'url:../../img/icons.svg';

class SpinnerView {
  #recipeContainer = document.querySelector('.recipe');
  #recipesNavigationListContainer = document.querySelector('.nav');
  #render(parentEl) {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>`;
    parentEl.innerHTML = '';
    parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderRecipeContainerSpinner() {
    this.#render(this.#recipeContainer);
  }

  renderRecipesNavigationListSpinner() {
    this.#render(this.#recipesNavigationListContainer);
  }

  stop() {
    const spinner = document.querySelector('.spinner');
    if (spinner) spinner.remove();
  }
}

export default new SpinnerView();
