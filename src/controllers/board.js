import Board from "../components/board";
import TaskList from "../components/task-list";
import {renderComponent} from "../utils";
import {Task} from "../components/card";
import TaskEdit from "../components/card-edit";
import LoadMoreButton from "../components/load-more-button";
import {DEFAULT_CARD_RENDER_NUMBER} from "../constants";

class BoardController {
  constructor(container, currentTasks) {
    this._container = container;
    this._currentTasks = currentTasks;
    this._board = new Board();
    this._taskList = new TaskList();
    this._LoadMoreButton = new LoadMoreButton();
  }

  init() {
    renderComponent(this._container, this._board.getElement(), `beforeend`);
    renderComponent(this._board.getElement().firstChild, this._taskList.getElement(), `beforeend`);
    for (let i = 0; i < DEFAULT_CARD_RENDER_NUMBER; i++) {
      this._renderTask(this._currentTasks[0]);
    }
    this._renderLoadMoreButton();
  }

  /**
   * @param {{
   * description: string,
   * dueDate: number,
   * repeatingDays: {Tu: boolean, Mo: boolean, Su: boolean, Th: boolean, Fr: boolean, We: boolean, Sa: boolean},
   * isArchive: boolean,
   * color: string,
   * isFavourite: boolean,
   * tags: Set<string> }} task
   */
  _renderTask(task) {
    let cardComponent = new Task(task).getElement();
    let cardEditComponent = new TaskEdit(task).getElement();

    /**
     * @param {KeyboardEvent} keyEvt
     */
    const onEscKeyDown = (keyEvt) => {
      if (keyEvt.key === `Escape` || keyEvt.key === `Esc`) {
        this._taskList.getElement().firstChild.replaceChild(cardComponent, cardEditComponent);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    renderComponent(this._taskList.getElement().firstChild, cardComponent, `beforeend`);
    cardComponent.querySelector(`.card__btn--edit`).addEventListener(`click`, () => {
      this._taskList.getElement().firstChild.replaceChild(cardEditComponent, cardComponent);

      const repeatInput = document.querySelector(`.card__repeat-status`);
      const repeatingDays = document.querySelector(`.card__repeat-days-inner`).querySelectorAll(`input`);

      repeatingDays.forEach((it) => {
        if (it.checked === true) {
          repeatInput.innerHTML = `yes`;
        }
      });

      document.addEventListener(`keydown`, onEscKeyDown);
      cardEditComponent.querySelector(`.card__text`).addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscKeyDown);
      });
      cardEditComponent.querySelector(`.card__text`).addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    });
    cardEditComponent.querySelector(`.card__form`).addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      this._taskList.getElement().firstChild.replaceChild(cardComponent, cardEditComponent);
      document.removeEventListener(`keydown`, onEscKeyDown);
    });
    this._currentTasks.shift();
  }

  _renderLoadMoreButton() {
    /**
     * @param {[object]} arr массив карточек
     * @return {number}
     */
    const getMaxTaskNumber = (arr) => {
      let result;

      if (arr.length > 8) {
        result = 8;
      } else {
        result = arr.length;
      }

      return result;
    };

    const onLoadMoreClick = () => {
      if (this._currentTasks.length !== 0) {
        let maxTasksLeft = getMaxTaskNumber(this._currentTasks);

        for (let i = 0; i < maxTasksLeft; i++) {
          this._renderTask(this._currentTasks[0]); // ?
        }
      } else {
        document.querySelector(`.load-more`).remove();
      }
    };

    renderComponent(this._board.getElement().firstChild, this._LoadMoreButton.getElement(), `beforeend`);

    const loadMoreButton = document.querySelector(`.load-more`);

    loadMoreButton.addEventListener(`click`, onLoadMoreClick);
  }
}

export default BoardController;
