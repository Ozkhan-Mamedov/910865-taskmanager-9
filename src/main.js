import {Menu} from './components/menu';
import {Search} from './components/search';
import {Filter} from './components/filter';
import {TaskBoard} from './components/card-board';
import {Sort} from './components/sort';
import {Task} from './components/card';
import {CardEdit, hashtagComponents} from './components/card-edit';
import {LoadMoreButton} from './components/load-more-button';
import {tasks} from "./data";
import {filters} from "./data";
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

const setUpCardEditComponent = () => {
  const repeatInput = document.querySelector(`.card__repeat-status`);
  const repeatingDays = document.querySelector(`.card__repeat-days-inner`).querySelectorAll(`input`);
  const colorInputs = document.querySelector(`.card__colors-wrap`).querySelectorAll(`input`);
  const hashtagEditContainer = document.querySelector(`.card__hashtag-list`);

  colorInputs.forEach((it) => {
    if (it.value === cardEditColor) {
      it.checked = `checked`;
    }
  });
  repeatingDays.forEach((it) => {
    if (it.checked === true) {
      repeatInput.innerHTML = `yes`;
    }
  });
  hashtagComponents.forEach((it) => {
    renderComponent(hashtagEditContainer, it, `beforeend`);
  });
  currentTasks.shift();
};

const onLoadMoreClick = () => {
  if (currentTasks.length !== 0) {
    let maxTasksLeft = getMaxTaskNumber(currentTasks);

    for (let i = 0; i < maxTasksLeft; i++) {
      renderComponent(cardsContainer, getCardComponent(currentTasks[i]), `beforeend`);
    }

    currentTasks.slice(0, maxTasksLeft);

    for (let i = 0; i < maxTasksLeft; i++) {
      currentTasks.shift();
    }
  } else {
    document.querySelector(`.load-more`).remove();
  }
};

renderComponent(menuContainer, getMenuComponent(), `beforeend`);
renderComponent(mainContainer, getSearchComponent(), `beforeend`);
renderComponent(mainContainer, getFilterComponent(filters), `beforeend`);
renderComponent(mainContainer, getCardBoardComponent(), `beforeend`);

const boardContainer = mainContainer.querySelector(`.board`);
const cardsContainer = mainContainer.querySelector(`.board__tasks`);
let currentTasks = tasks.slice();
const cardEditTemplate = currentTasks[0];
const cardEditColor = cardEditTemplate.color;

renderComponent(boardContainer, getSortComponent(), `afterbegin`);
renderComponent(cardsContainer, getCardEditComponent(cardEditTemplate), `beforeend`);
setUpCardEditComponent();
for (let i = 1; i < DEFAULT_CARD_RENDER_NUMBER; i++) {
  renderComponent(cardsContainer, getCardComponent(tasks[i]), `beforeend`);
  currentTasks.shift();
}
renderComponent(boardContainer, getButtonComponent(), `beforeend`);

const loadMoreButton = document.querySelector(`.load-more`);

loadMoreButton.addEventListener(`click`, onLoadMoreClick);
