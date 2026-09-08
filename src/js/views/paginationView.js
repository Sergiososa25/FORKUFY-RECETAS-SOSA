import icons from 'url:../../img/icons.svg';

class PaginationView {
  #parentElement = document.querySelector('.pagination');
  #data;

  addHandlerClick(handler) {
    this.#parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  render(data) {
    this.#data = data;
    const numPages = Math.ceil(this.#data.results.length / this.#data.resultsPerPage);
    const curPage = this.#data.page;

    
    if (curPage === 1 && numPages > 1) {
      return this.#generateButtonNext(curPage);
    }

    
    if (curPage === numPages && numPages > 1) {
      return this.#generateButtonPrev(curPage);
    }

    
    if (curPage < numPages) {
      return `
        ${this.#generateButtonPrev(curPage)}
        ${this.#generateButtonNext(curPage)}
      `;
    }

    
    return '';
  }

  #generateButtonPrev(curPage) {
    return `
      <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
      </button>
    `;
  }

  #generateButtonNext(curPage) {
    return `
      <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
  }
}

export default new PaginationView();