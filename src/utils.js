/**
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * @param {string} template
 * @return {ChildNode}
 */
export const createElement = (template) => {
  const newElement = document.createElement(`div`);

  newElement.innerHTML = template;

  return newElement.firstChild;
};

/**
 * @param {Element} container
 * @param {string} markup
 * @param {InsertPosition} place
 */
export const renderComponent = (container, markup, place) => {
  container.insertAdjacentHTML(place, markup);
};

/**
 * @param {Element} element
 */
export const unrender = (element) => {
  if (element) {
    element.remove();
  }
};

