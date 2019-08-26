import {createElement} from "../utils";

class NoTasks {
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
      <p class="board__no-tasks">
        Congratulations, all tasks were completed! To create a new click on
            «add new task» button.
      </p>
    `;
  }
}

export default NoTasks;
