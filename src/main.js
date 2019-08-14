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

renderComponent(menuContainer, getMenuComponent(), `beforeend`);
renderComponent(mainContainer, getSearchComponent(), `beforeend`);
renderComponent(mainContainer, getFilterComponent(filters), `beforeend`);
renderComponent(mainContainer, getCardBoardComponent(), `beforeend`);

const CARD_NUMBER = 7;
const boardContainer = mainContainer.querySelector(`.board`);
const cardsContainer = mainContainer.querySelector(`.board__tasks`);

renderComponent(boardContainer, getSortComponent(), `afterbegin`);

renderComponent(cardsContainer, getCardEditComponent(), `beforeend`);
for (let i = 0; i < CARD_NUMBER; i++) {
  renderComponent(cardsContainer, getCardComponent(tasks[i]), `beforeend`);
}
renderComponent(boardContainer, getButtonComponent(), `beforeend`);
