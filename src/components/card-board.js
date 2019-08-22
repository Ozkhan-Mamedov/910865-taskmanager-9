import {createElement} from "../utils";

class TaskBoard {
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
      <section class="board container">
          <div class="board__tasks"></div>
      </section>
    `;
  }
}

export {
  TaskBoard
};
