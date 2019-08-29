import Board from "../components/board";
import TaskList from "../components/task-list";
import Sort from "../components/sort";
import {renderComponent} from "../utils";
import LoadMoreButton from "../components/load-more-button";
import {DEFAULT_CARD_RENDER_NUMBER} from "../constants";
import TaskController from "./task";

class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = tasks;
    this._board = new Board();
    this._taskList = new TaskList();
    this._sort = new Sort();
  }

  init() {
    renderComponent(this._container, this._board.getElement(), `beforeend`);
    renderComponent(this._board.getElement().firstChild, this._sort.getElement(), `beforeend`);
    renderComponent(this._board.getElement().firstChild, this._taskList.getElement(), `beforeend`);
    this._currentTasks = this._tasks.slice();
    this._currentTasks.slice(0, DEFAULT_CARD_RENDER_NUMBER).forEach((it) => this._renderTask(it));
    this._renderLoadMoreButton();
    this._sort.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
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
    new TaskController(this._taskList, task, this._currentTasks);
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
          this._renderTask(this._currentTasks[0]);
        }
      } else {
        document.querySelector(`.load-more`).remove();
      }
    };

    const loadMoreButton = new LoadMoreButton();

    renderComponent(this._board.getElement().firstChild, loadMoreButton.getElement(), `beforeend`);
    loadMoreButton.getElement().querySelector(`.load-more`).addEventListener(`click`, onLoadMoreClick);
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();
    if (evt.target.tagName !== `A`) {
      return;
    }
    this._taskList.getElement().firstChild.innerHTML = ``;

    switch (evt.target.dataset.sortType) {
      case `default`:
        if (document.querySelector(`.load-more`) !== null) {
          document.querySelector(`.load-more`).remove();
        }
        this._currentTasks = this._tasks.slice();
        this._currentTasks.slice(0, DEFAULT_CARD_RENDER_NUMBER).forEach((it) => {
          this._renderTask(it);
        });
        this._renderLoadMoreButton();
        break;

      case `date-up`:
        if (document.querySelector(`.load-more`) !== null) {
          document.querySelector(`.load-more`).remove();
        }
        this._currentTasks = this._tasks.slice().sort((a, b) => a.dueDate - b.dueDate);
        this._currentTasks.slice(0, DEFAULT_CARD_RENDER_NUMBER).forEach((it) => {
          this._renderTask(it);
        });
        this._renderLoadMoreButton();
        break;

      case `date-down`:
        if (document.querySelector(`.load-more`) !== null) {
          document.querySelector(`.load-more`).remove();
        }
        this._currentTasks = this._tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
        this._currentTasks.slice(0, DEFAULT_CARD_RENDER_NUMBER).forEach((it) => {
          this._renderTask(it);
        });
        this._renderLoadMoreButton();
        break;
    }
  }
}

export default BoardController;
