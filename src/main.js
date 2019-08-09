import {getMenuComponent} from './components/menu.js';
import {getSearchComponent} from './components/search.js';
import {getFilterComponent} from './components/filter.js';
import {getCardBoardComponent} from './components/card-board.js';
import {getSortComponent} from './components/sort.js';
import {getCardComponent} from './components/card.js';
import {getCardEditComponent} from './components/card-edit.js';
import {getButtonComponent} from './components/load-more-button.js';

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

renderComponent(menuContainer, getMenuComponent(), `beforeend`);
renderComponent(mainContainer, getSearchComponent(), `beforeend`);
renderComponent(mainContainer, getFilterComponent(), `beforeend`);
renderComponent(mainContainer, getCardBoardComponent(), `beforeend`);

const CARD_NUMBER = 3;
const boardContainer = mainContainer.querySelector(`.board`);
const cardsContainer = mainContainer.querySelector(`.board__tasks`);

renderComponent(boardContainer, getSortComponent(), `afterbegin`);
renderComponent(cardsContainer, getCardEditComponent(), `beforeend`);
for (let i = 0; i < CARD_NUMBER; i++) {
  renderComponent(cardsContainer, getCardComponent(), `beforeend`);
}
renderComponent(boardContainer, getButtonComponent(), `beforeend`);
