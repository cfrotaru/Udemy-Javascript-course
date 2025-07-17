class SearchView {
  #container = document.querySelector('.search');

  getQuery() {
    const query = this.#container.querySelector('.search__field').value;
    this.#clearInput();
    return query;
  }

  #clearInput() {
    this.#container.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this.#container.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
