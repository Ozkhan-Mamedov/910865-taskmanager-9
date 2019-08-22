import {Menu} from './components/menu';
import {Search} from './components/search';
import {Filter} from './components/filter';
import {TaskBoard} from './components/card-board';
import {Sort} from './components/sort';
import {Task} from './components/card';
import {TaskEdit} from './components/card-edit';
import {LoadMoreButton} from './components/load-more-button';
import {tasks, filters} from "./data";
import {DEFAULT_CARD_RENDER_NUMBER} from "./constants";
import {renderComponent} from "./utils";

const mainContainer = document.querySelector(`.main`);
const menuContainer = mainContainer.querySelector(`.main__control`);

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

/**
 * @param {number} tasksNum
 */
const renderTasks = (tasksNum) => {
  for (let i = 0; i < tasksNum; i++) {
    let cardComponent = new Task(currentTasks[i]).getElement();
    let cardEditComponent = new TaskEdit(currentTasks[i]).getElement();

    /**
     * @param {KeyboardEvent} keyEvt
     */
    const onEscKeyDown = (keyEvt) => {
      if (keyEvt.key === `Escape` || keyEvt.key === `Esc`) {
        cardsContainer.replaceChild(cardComponent, cardEditComponent);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    renderComponent(cardsContainer, cardComponent, `beforeend`);
    cardComponent.querySelector(`.card__btn--edit`).addEventListener(`click`, () => {
      cardsContainer.replaceChild(cardEditComponent, cardComponent);

      const repeatInput = document.querySelector(`.card__repeat-status`);
      const repeatingDays = document.querySelector(`.card__repeat-days-inner`).querySelectorAll(`input`);

      repeatingDays.forEach((it) => {
        if (it.checked === true) {
          repeatInput.innerHTML = `yes`;
        }
      });

      document.addEventListener(`keydown`, onEscKeyDown);
    });
    cardEditComponent.querySelector(`.card__save`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      cardsContainer.replaceChild(cardComponent, cardEditComponent);
      document.removeEventListener(`keydown`, onEscKeyDown);
    });
  }

  for (let i = 0; i < tasksNum; i++) {
    currentTasks.shift();
  }
};

const onLoadMoreClick = () => {
  if (currentTasks.length !== 0) {
    let maxTasksLeft = getMaxTaskNumber(currentTasks);

    renderTasks(maxTasksLeft);
  } else {
    document.querySelector(`.load-more`).remove();
  }
};

renderComponent(menuContainer, new Menu().getElement(), `beforeend`);
renderComponent(mainContainer, new Search().getElement(), `beforeend`);
renderComponent(mainContainer, new Filter(filters).getElement(), `beforeend`);
renderComponent(mainContainer, new TaskBoard().getElement(), `beforeend`);

const boardContainer = mainContainer.querySelector(`.board`);
const cardsContainer = mainContainer.querySelector(`.board__tasks`);
let currentTasks = tasks.slice();

renderComponent(boardContainer, new Sort().getElement(), `afterbegin`);
renderTasks(DEFAULT_CARD_RENDER_NUMBER);
renderComponent(boardContainer, new LoadMoreButton().getElement(), `beforeend`);

const loadMoreButton = document.querySelector(`.load-more`);

loadMoreButton.addEventListener(`click`, onLoadMoreClick);
