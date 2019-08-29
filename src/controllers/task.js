import {renderComponent} from "../utils";
import TaskEdit from "../components/card-edit";
import {Task} from "../components/card";

class TaskController {
  constructor(container, data, currentTasks, onDataChange, onChangeView) {
    this._container = container;
    this._data = data;
    this._currentTasks = currentTasks;
    this._taskView = new Task(data).getElement();
    this._taskEdit = new TaskEdit(data).getElement();

    this.init();
  }

  init() {
    /**
     * @param {KeyboardEvent} keyEvt
     */
    const onEscKeyDown = (keyEvt) => {
      if (keyEvt.key === `Escape` || keyEvt.key === `Esc`) {
        this._container.getElement().firstChild.replaceChild(this._taskView, this._taskEdit);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    renderComponent(this._container.getElement().firstChild, this._taskView, `beforeend`);
    this._taskView.querySelector(`.card__btn--edit`).addEventListener(`click`, () => {
      this._container.getElement().firstChild.replaceChild(this._taskEdit, this._taskView);

      const repeatInput = document.querySelector(`.card__repeat-status`);
      const repeatingDays = document.querySelector(`.card__repeat-days-inner`).querySelectorAll(`input`);

      repeatingDays.forEach((it) => {
        if (it.checked === true) {
          repeatInput.innerHTML = `yes`;
        }
      });

      document.addEventListener(`keydown`, onEscKeyDown);
      this._taskEdit.querySelector(`.card__text`).addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscKeyDown);
      });
      this._taskEdit.querySelector(`.card__text`).addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    });
    this._taskEdit.querySelector(`.card__form`).addEventListener(`submit`, (evt) => {
      evt.preventDefault();

      const formData = new FormData(this._taskEdit.querySelector(`.card__form`));
      const entry = {
        description: formData.get(`text`),
        dueDate: formData.get(`date`),
        repeatingDays: formData.getAll(`repeat`).reduce((acc, it) => {
          acc[it] = true;
          return acc;
        }, {
          'mo': false,
          'tu': false,
          'we': false,
          'th': false,
          'fr': false,
          'sa': false,
          'su': false,
        }),
        tags: new Set(formData.getAll(`hashtag`)),
        color: formData.get(`color`),
      };

      this._container.getElement().firstChild.replaceChild(this._taskView, this._taskEdit);
      document.removeEventListener(`keydown`, onEscKeyDown);
    });
    this._currentTasks.shift();
  }
}

export default TaskController;
