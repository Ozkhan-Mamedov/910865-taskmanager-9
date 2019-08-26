import {createElement} from "../utils";

class Search {
  constructor() {
    this._element = null;
  }

  /**
   * @return {null | Node}
   */
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  /**
   * @return {string}
   */
  getTemplate() {
    return `
      <section class="main__search search container">
        <input type="text" id="search__input" class="search__input" placeholder="START TYPING — SEARCH BY WORD, #HASHTAG OR DATE">
        <label class="visually-hidden" for="search__input">Search</label>
      </section>
    `;
  }
}

export default Search;
