import Menu from './components/menu';
import Search from './components/search';
import Filter from './components/filter';
import NoTasks from "./components/no-tasks";
import {tasks, filters} from "./data";
import {renderComponent, unrenderComponent} from "./utils";
import BoardController from "./controllers/board";
const mainContainer = document.querySelector(`.main`);
const menuContainer = mainContainer.querySelector(`.main__control`);

const generatePageElements = () => {
  const checkTasksState = () => {
    const archiveTasks = parseInt(mainContainer.querySelector(`.filter__archive-count`).textContent, 10);

    if ((cardsContainer.childElementCount === 0) || (archiveTasks === tasks.length)) {
      Array.from(boardContainer.children).forEach((it) => {
        unrenderComponent(it);
      });
      renderComponent(boardContainer, new NoTasks().getElement(), `beforeend`);
    }
  };

  renderComponent(menuContainer, new Menu().getElement(), `beforeend`);
  renderComponent(mainContainer, new Search().getElement(), `beforeend`);
  renderComponent(mainContainer, new Filter(filters).getElement(), `beforeend`);

  const boardController = new BoardController(mainContainer, tasks.slice());

  boardController.init();

  const boardContainer = mainContainer.querySelector(`.board`);
  const cardsContainer = mainContainer.querySelector(`.board__tasks`);

  checkTasksState();
};

generatePageElements();
