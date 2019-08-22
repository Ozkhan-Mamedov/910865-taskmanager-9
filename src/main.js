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

const onLoadMoreClick = () => {
  if (currentTasks.length !== 0) {
    let maxTasksLeft = getMaxTaskNumber(currentTasks);

    for (let i = 0; i < maxTasksLeft; i++) {
      renderComponent(cardsContainer, new Task(currentTasks[i]).getElement(), `beforeend`);
    }

    currentTasks.slice(0, maxTasksLeft);

    for (let i = 0; i < maxTasksLeft; i++) {
      currentTasks.shift();
    }
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

for (let i = 0; i < DEFAULT_CARD_RENDER_NUMBER; i++) {
  let cardComponent = new Task(tasks[i]).getElement();
  let cardEditComponent = new TaskEdit(tasks[i]).getElement();

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
  currentTasks.shift();
  cardComponent.querySelector(`.card__btn--edit`).addEventListener(`click`, () => {
    cardsContainer.replaceChild(cardEditComponent, cardComponent);

    const repeatInput = document.querySelector(`.card__repeat-status`);
    const repeatingDays = document.querySelector(`.card__repeat-days-inner`).querySelectorAll(`input`);
    const colorInputs = document.querySelector(`.card__colors-wrap`).querySelectorAll(`input`);

    colorInputs.forEach((it) => {
      if (it.value === tasks[i].color) {
        it.checked = `checked`;
      }
    });
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
renderComponent(boardContainer, new LoadMoreButton().getElement(), `beforeend`);

const loadMoreButton = document.querySelector(`.load-more`);

loadMoreButton.addEventListener(`click`, onLoadMoreClick);
