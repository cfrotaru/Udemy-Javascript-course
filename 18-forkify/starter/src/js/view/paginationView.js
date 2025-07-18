import View from './view';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _container = document.querySelector('.pagination');

  _generateMarkup() {
    return `
          <button class="btn--inline pagination__btn--prev hidden">
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
              </svg>
              <span class="pagination__page-number">Page</span>
            </button>
            <button class="btn--inline pagination__btn--next hidden">
              <span class="pagination__page-number">Page</span>
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
              </svg>
            </button>
            `;
  }

  updatePaginationButtons(options) {
    const { currentPage, lastPage } = options;
    const prevPageBtn = document.querySelector('.pagination__btn--prev');
    const nextPageBtn = document.querySelector('.pagination__btn--next');
    currentPage > 1
      ? prevPageBtn.classList.remove('hidden')
      : prevPageBtn.classList.add('hidden');

    currentPage < lastPage
      ? nextPageBtn.classList.remove('hidden')
      : nextPageBtn.classList.add('hidden');

    prevPageBtn.querySelector('.pagination__page-number').innerHTML = `Page ${
      currentPage - 1
    }`;
    nextPageBtn.querySelector('.pagination__page-number').innerHTML = `Page ${
      currentPage + 1
    }`;
  }

  addHandlerPagination(handler) {
    document.querySelector('.search-results').addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const isIncrease = btn.classList.contains('pagination__btn--next');
      const isDecrease = btn.classList.contains('pagination__btn--prev');

      if (!isIncrease && !isDecrease) return;

      handler(isIncrease);
    });
  }
}

export default new PaginationView();
