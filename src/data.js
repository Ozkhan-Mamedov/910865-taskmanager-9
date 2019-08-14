/**
 * @return {{
 * description: String, dueDate: number,
 * repeatingDays: {Tu: boolean, Mo: boolean, Su: boolean, Th: boolean, Fr: boolean, We: boolean, Sa: boolean},
 * isArchive: boolean, color: string, isFavourite: boolean, tags: [string]}}
 */
export const getTask = () => ({
  description: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`,
  ][Math.floor(Math.random() * 3)],
  dueDate: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
  repeatingDays: {
    'Mo': false,
    'Tu': false,
    'We': Boolean(Math.round(Math.random())),
    'Th': false,
    'Fr': false,
    'Sa': false,
    'Su': false,
  },
  tags: new Set([
    `homework`,
    `theory`,
    `practice`,
    `intensive`,
    `keks`,
  ]),
  color: [
    `black`,
    `yellow`,
    `blue`,
    `green`,
    `pink`,
  ][Math.floor(Math.random() * 5)],
  isFavorite: Boolean(Math.round(Math.random())),
  isArchive: Boolean(Math.round(Math.random())),
});

const getFilter = () => ({
  title: [
    `ALL`,
    `OVERDUE`,
    `TODAY`,
    `FAVORITES`,
    `REPEATING`,
    `TAGS`,
    `ARCHIVE`,
  ][Math.floor(Math.random() * 7)],
  count: getQuantityNumber,
});

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

export const tasks = Array(3);

for (let i = 0; i < tasks.length; i++) {
  tasks[i] = getTask();
}
