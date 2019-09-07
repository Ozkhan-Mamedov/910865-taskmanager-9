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
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;

    this.create();
  }

  create() {
    /**
     * @param {KeyboardEvent} keyEvt
     */
    const onEscKeyDown = (keyEvt) => {
      if (keyEvt.key === `Escape` || keyEvt.key === `Esc`) {
        document.removeEventListener(`keydown`, onEscKeyDown);
        this._container.getElement().firstChild.replaceChild(this._taskView, this._taskEdit);
      }
    };

    renderComponent(this._container.getElement().firstChild, this._taskView, `beforeend`);
    this._taskView.querySelector(`.card__btn--favorites`).addEventListener(`click`, () => {
      if (this._taskView.querySelector(`.card__btn--favorites`).classList.contains(`card__btn--disabled`)) {
        this._taskView.querySelector(`.card__btn--favorites`).classList.remove(`card__btn--disabled`);
        document.querySelector(`.filter__favorites-count`).textContent--;
      } else {
        this._taskView.querySelector(`.card__btn--favorites`).classList.add(`card__btn--disabled`);
        document.querySelector(`.filter__favorites-count`).textContent++;
      }
    });
    this._taskView.querySelector(`.card__btn--archive`).addEventListener(`click`, () => {
      if (!this._taskView.querySelector(`.card__btn--archive`).classList.contains(`card__btn--disabled`)) {
        this._taskView.querySelector(`.card__btn--archive`).classList.add(`card__btn--disabled`);
        document.querySelector(`.filter__archive-count`).textContent++;
      }
    });
    this._taskView.querySelector(`.card__btn--edit`).addEventListener(`click`, () => {
      this._onChangeView();
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
      this._taskEdit.querySelector(`.card__btn--archive`).addEventListener(`click`, () => {
        if (!this._taskEdit.querySelector(`.card__btn--archive`).classList.contains(`card__btn--disabled`)) {
          this._taskEdit.querySelector(`.card__btn--archive`).classList.add(`card__btn--disabled`);
          document.querySelector(`.filter__archive-count`).textContent++;
        } else {
          this._taskEdit.querySelector(`.card__btn--archive`).classList.remove(`card__btn--disabled`);
          document.querySelector(`.filter__archive-count`).textContent--;
        }
      });
      this._taskEdit.querySelector(`.card__btn--favorites`).addEventListener(`click`, () => {
        if (!this._taskEdit.querySelector(`.card__btn--favorites`).classList.contains(`card__btn--disabled`)) {
          this._taskEdit.querySelector(`.card__btn--favorites`).classList.add(`card__btn--disabled`);
          document.querySelector(`.filter__favorites-count`).textContent--;
        } else {
          this._taskEdit.querySelector(`.card__btn--favorites`).classList.remove(`card__btn--disabled`);
          document.querySelector(`.filter__favorites-count`).textContent++;
        }
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
        isFavorite: this._taskEdit.querySelector(`.card__btn--favorites`).classList.contains(`card__btn--disabled`),
        isArchive: this._taskEdit.querySelector(`.card__btn--archive`).classList.contains(`card__btn--disabled`),
      };

      this._onDataChange(entry, this._data);
      document.removeEventListener(`keydown`, onEscKeyDown);
    });
    this._currentTasks.shift();
  }

  setDefaultView() {
    if (this._container.getElement().querySelector(`.board__tasks`).contains(this._taskEdit)) {
      this._container.getElement().querySelector(`.board__tasks`).replaceChild(this._taskView, this._taskEdit);
    }
  }
}

export default TaskController;
