import AbstractComponent from "./abstract-component";

class Board extends AbstractComponent {
  /**
   * @return {string}
   */
  getTemplate() {
    return `<section class="board container"></section>`;
  }
}

export default Board;
