import Board from "../components/board";
import TaskList from "../components/task-list";
import Sort from "../components/sort";
import {renderComponent, unrenderComponent} from "../utils";
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
    this._onDataChange = this._onDataChange.bind(this);
    this._onChangeView = this._onChangeView.bind(this);
    this._subscriptions = [];
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
   * repeatingDays: {tu: boolean, mo: boolean, su: boolean, th: boolean, fr: boolean, we: boolean, sa: boolean},
   * isArchive: boolean,
   * color: string,
   * isFavourite: boolean,
   * tags: Set<string> }} task
   */
  _renderTask(task) {
    const taskController = new TaskController(this._taskList, task, this._currentTasks, this._onDataChange, this._onChangeView);

    this._subscriptions.push(taskController.setDefaultView.bind(taskController));
  }

  _onDataChange(newData, oldData) {
    this._tasks[this._tasks.findIndex((it) => it === oldData)] = newData;
    document.querySelector(`.board__tasks`).innerHTML = ``;
    this._currentTasks = this._tasks.slice();
    this._currentTasks.slice(0, DEFAULT_CARD_RENDER_NUMBER).forEach((it) => this._renderTask(it));
    if (this._currentTasks !== 0 && document.querySelector(`.load-more`) === null) {
      this._renderLoadMoreButton();
    }
  }

  _onChangeView() {
    this._subscriptions.forEach((subscription) => subscription());
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

        if (this._currentTasks.length === 0) {
          unrenderComponent(loadMoreButton.getElement());
        }
      } else {
        unrenderComponent(loadMoreButton.getElement());
      }
    };

    const loadMoreButton = new LoadMoreButton();

    renderComponent(this._board.getElement().firstChild, loadMoreButton.getElement(), `beforeend`);
    loadMoreButton.getElement().querySelector(`.load-more`).addEventListener(`click`, onLoadMoreClick);
  }

  /**
   * @param {Event} evt
   * @private
   */
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
