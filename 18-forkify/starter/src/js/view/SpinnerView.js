import icons from 'url:../../img/icons.svg';

export default class SpinnerView {
  static render(parentEl) {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>`;
    parentEl.innerHTML = '';
    parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  static stop() {
    const spinner = document.querySelector('.spinner');
    if (spinner) spinner.remove();
  }
}
