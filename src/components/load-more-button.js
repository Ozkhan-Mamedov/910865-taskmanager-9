import AbstractComponent from "./abstract-component";

class LoadMoreButton extends AbstractComponent {
  constructor() {
    super();
  }

  /**
   * @return {string}
   */
  getTemplate() {
    return `<button class="load-more" type="button">load more</button>`;
  }
}

export default LoadMoreButton;
