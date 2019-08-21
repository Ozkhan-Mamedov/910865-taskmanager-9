import {createElement} from "../utils";

class LoadMoreButton {
  constructor() {
    this._element = null;
  }

  /**
   * @return {null | ChildNode}
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
    return `<button class="load-more" type="button">load more</button>`;
  }
}

export {
  LoadMoreButton
};
