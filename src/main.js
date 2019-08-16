import {getMenuComponent} from './components/menu';
import {getSearchComponent} from './components/search';
import {getFilterComponent} from './components/filter';
import {getCardBoardComponent} from './components/card-board';
import {getSortComponent} from './components/sort';
import {getCardComponent} from './components/card';
import {getCardEditComponent, hashtagComponents} from './components/card-edit';
import {getButtonComponent} from './components/load-more-button';
import {tasks} from "./data";
import {filters} from "./data";
import {DEFAULT_CARD_RENDER_NUMBER} from "./constants";

const mainContainer = document.querySelector(`.main`);
const menuContainer = mainContainer.querySelector(`.main__control`);

/**
 * @param {Element} container
 * @param {string} markup
 * @param {InsertPosition} place
 */
const renderComponent = (container, markup, place) => {
  container.insertAdjacentHTML(place, markup);
};

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

const showMoreCards = () => {
  if (currentTasks.length !== 0) {
    let maxTasksLeft = getMaxTaskNumber(currentTasks);

    for (let i = 0; i < maxTasksLeft; i++) {
      renderComponent(cardsContainer, getCardComponent(currentTasks[i]), `beforeend`);
    }

    currentTasks.slice(0, maxTasksLeft);

    for (let i = 0; i < maxTasksLeft; i++) {
      currentTasks.shift();
    }

    if (currentTasks.length === 0) {
      document.querySelector(`.load-more`).remove();
    }
  }
};

renderComponent(menuContainer, getMenuComponent(), `beforeend`);
renderComponent(mainContainer, getSearchComponent(), `beforeend`);
renderComponent(mainContainer, getFilterComponent(filters), `beforeend`);
renderComponent(mainContainer, getCardBoardComponent(), `beforeend`);

const boardContainer = mainContainer.querySelector(`.board`);
const cardsContainer = mainContainer.querySelector(`.board__tasks`);
const cardEditTemplate = tasks[0];
const cardEditColor = cardEditTemplate.color;
let currentTasks = tasks.slice();

renderComponent(boardContainer, getSortComponent(), `afterbegin`);
renderComponent(cardsContainer, getCardEditComponent(cardEditTemplate), `beforeend`);

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
for (let i = 0; i < DEFAULT_CARD_RENDER_NUMBER; i++) {
  renderComponent(cardsContainer, getCardComponent(tasks[i]), `beforeend`);
  currentTasks.shift();
}
if (currentTasks.length !== 0) {
  renderComponent(boardContainer, getButtonComponent(), `beforeend`);
}

const loadMoreButton = document.querySelector(`.load-more`);

loadMoreButton.addEventListener(`click`, showMoreCards);
