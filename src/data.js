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
  isFavourite: Boolean(Math.round(Math.random())),
  isArchive: Boolean(Math.round(Math.random())),
});
