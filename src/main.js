import {getMenuComponent} from './components/menu';
import {getSearchComponent} from './components/search';
import {getFilterComponent} from './components/filter';
import {getCardBoardComponent} from './components/card-board';
import {getSortComponent} from './components/sort';
import {getCardComponent} from './components/card';
import {getCardEditComponent} from './components/card-edit';
import {getButtonComponent} from './components/load-more-button';
import {tasks} from "./data";
import {filters} from "./data";

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
  if (currenttasks.length !== 0) {
    let maxTasksLeft = getMaxTaskNumber(currenttasks);

    for (let i = 0; i < maxTasksLeft; i++) {
      renderComponent(cardsContainer, getCardComponent(currenttasks[i]), `beforeend`);
    }

    currenttasks.slice(0, maxTasksLeft);

    for (let i = 0; i < maxTasksLeft; i++) {
      currenttasks.shift();
    }

    if (currenttasks.length === 0) {
      document.querySelector(`.load-more`).remove();
    }
  }
};

renderComponent(menuContainer, getMenuComponent(), `beforeend`);
renderComponent(mainContainer, getSearchComponent(), `beforeend`);
renderComponent(mainContainer, getFilterComponent(filters), `beforeend`);
renderComponent(mainContainer, getCardBoardComponent(), `beforeend`);

const CARD_NUMBER = 7;
const boardContainer = mainContainer.querySelector(`.board`);
const cardsContainer = mainContainer.querySelector(`.board__tasks`);
const cardEditTemplate = tasks[0];
const cardEditColor = cardEditTemplate.color;
let currenttasks = tasks.slice();

renderComponent(boardContainer, getSortComponent(), `afterbegin`);
renderComponent(cardsContainer, getCardEditComponent(cardEditTemplate), `beforeend`);

const repeatInput = document.querySelector(`.card__repeat-status`);
const repeatingdays = document.querySelector(`.card__repeat-days-inner`).querySelectorAll(`input`);
const colorinputs = document.querySelector(`.card__colors-wrap`).querySelectorAll(`input`);

colorinputs.forEach((it) => {
  if (it.value === cardEditColor) {
    it.checked = `checked`;
  }
});

repeatingdays.forEach((it) => {
  if (it.checked === true) {
    repeatInput.innerHTML = `yes`;
  }
});
for (let i = 0; i < CARD_NUMBER; i++) {
  renderComponent(cardsContainer, getCardComponent(tasks[i]), `beforeend`);
  currenttasks.shift();
}
if (currenttasks.length !== 0) {
  renderComponent(boardContainer, getButtonComponent(), `beforeend`);
}

const loadMoreButton = document.querySelector(`.load-more`);

loadMoreButton.addEventListener(`click`, showMoreCards);
