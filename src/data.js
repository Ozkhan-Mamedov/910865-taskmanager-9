import {getRandomNumber} from "./utils";
import {DAYS_IN_WEEK, HOURS_IN_DAY, MINUTES_IN_HOUR, SECONDS_IN_MINUTE, MSECONDS_IN_SECOND,
  MIN_TIME_RANGE, MAX_TIME_RANGE, TASKS_NUMBER, MAX_TAGS_NUMBER} from "./constants";

const taskDescriptions = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`,
];
const tagList = [
  `homework`,
  `theory`,
  `practice`,
  `intensive`,
  `keks`,
];
const taskColors = [
  `black`,
  `yellow`,
  `blue`,
  `green`,
  `pink`,
];

/**
 * @return {Set<string>}
 */
const getTagSet = () => {
  let tagSet = new Set();
  const tagSetSize = getRandomNumber(0, MAX_TAGS_NUMBER);

  while (tagSet.size !== tagSetSize) {
    tagSet.add(tagList[getRandomNumber(0, tagList.length - 1)]);
  }

  return tagSet;
};

/**
 * @return {
 *           { Tu: boolean,
 *             Mo: boolean,
 *             Su: boolean,
 *             Th: boolean,
 *             Fr: boolean,
 *             We: boolean,
 *             Sa: boolean }
 *         }
 */
const getRepeatingDays = () => {
  return {
    'Mo': false,
    'Tu': false,
    'We': Boolean(Math.round(Math.random())),
    'Th': false,
    'Fr': false,
    'Sa': false,
    'Su': false,
  };
};

/**
 * @return { {
 * description: string,
 * dueDate: number,
 * repeatingDays: {Tu: boolean, Mo: boolean, Su: boolean, Th: boolean, Fr: boolean, We: boolean, Sa: boolean},
 * isArchive: boolean,
 * color: string,
 * isFavourite: boolean,
 * tags: Set<string> } }
 */
const getTask = () => ({
  description: taskDescriptions[getRandomNumber(0, taskDescriptions.length - 1)],
  dueDate: Date.now() + getRandomNumber(MIN_TIME_RANGE, MAX_TIME_RANGE)
    + getRandomNumber(0, DAYS_IN_WEEK - 1) * HOURS_IN_DAY * MINUTES_IN_HOUR * SECONDS_IN_MINUTE * MSECONDS_IN_SECOND,
  repeatingDays: getRepeatingDays(),
  tags: getTagSet(),
  color: taskColors[getRandomNumber(0, taskColors.length - 1)],
  isFavorite: Boolean(Math.round(Math.random())),
  isArchive: Boolean(Math.round(Math.random())),
});

const filterTitles = [
  `ALL`,
  `OVERDUE`,
  `TODAY`,
  `FAVORITES`,
  `REPEATING`,
  `TAGS`,
  `ARCHIVE`,
];

/**
 * @return {{count: function, title: [string]}}
 */
const getFilter = () => ({
  title: filterTitles,
  count: getQuantityNumber,
});

/**
 * @param {string} name
 * @param {[object]} tasks
 * @return {number}
 */
const getQuantityNumber = (name, tasks) => {
  let result = 0;

  switch (name) {
    case `ALL`:
      tasks.forEach((it) => {
        if (it) {
          result++;
        }
      });
      break;

    case `OVERDUE`:
      tasks.forEach((it) => {
        if (new Date(it.dueDate).toDateString() > new Date().toDateString()) {
          result++;
        }
      });
      break;

    case `TODAY`:
      tasks.forEach((it) => {
        if (new Date(it.dueDate).toDateString() === new Date().toDateString()) {
          result++;
        }
      });
      break;

    case `FAVORITES`:
      tasks.forEach((it) => {
        if (it.isFavorite === true) {
          result++;
        }
      });
      break;

    case `REPEATING`:
      tasks.forEach((it) => {
        let isRepeated = false;

        for (let key in it.repeatingDays) {
          if (it.repeatingDays[key] === true) {
            isRepeated = true;
          }
        }

        if (isRepeated === true) {
          result++;
        }
      });
      break;

    case `TAGS`:
      tasks.forEach((it) => {
        if (it.tags.size > 0) {
          result++;
        }
      });
      break;

    case `ARCHIVE`:
      tasks.forEach((it) => {
        if (it.isArchive === true) {
          result++;
        }
      });
      break;
  }

  return result;
};

const tasks = Array(TASKS_NUMBER);
const filters = Array(filterTitles.length);


for (let i = 0; i < TASKS_NUMBER; i++) {
  tasks[i] = getTask();
}

for (let i = 0; i < filters.length; i++) {
  let filterName = filterTitles[i];

  filters[i] = {
    title: getFilter().title[i],
    count: getFilter().count(`${filterName}`, tasks),
  };
}

export {
  getTask,
  tasks,
  filters
};
