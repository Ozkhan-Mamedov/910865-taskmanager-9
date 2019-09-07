import {months} from "./card";
import AbstractComponent from "./abstract-component";
import {unrenderComponent} from "../utils";

class TaskEdit extends AbstractComponent {
  /**
   * @param {string} description
   * @param {number} dueDate
   * @param { {
              'mo': boolean,
              'tu': boolean,
              'we': boolean,
              'th': boolean,
              'fr': boolean,
              'sa': boolean,
              'su': boolean,
            } } repeatingDays
   * @param {string} color
   * @param {boolean} isFavorite
   * @param {boolean} isArchive
   * @param {Set<string>} tags
   */
  constructor({description, dueDate, repeatingDays, color, tags, isFavorite, isArchive}) {
    super();
    this._description = description;
    this._dueDate = dueDate;
    this._repeatingDays = repeatingDays;
    this._color = color;
    this._isFavorite = isFavorite;
    this._isArchive = isArchive;
    this._tags = tags;
    this._subscribeOnEvents();
    this._hideDateInput();
    this._hideRepeatingDaysInput();
    this._changeTaskColor();
  }

  _checkRepeatingDays() {
    let flag = false;

    for (let key in this._repeatingDays) {
      if (this._repeatingDays.hasOwnProperty(key)) {
        if (this._repeatingDays[key] === true) {
          flag = true;
        }
      }
    }

    return flag;
  }

  _hideDateInput() {
    this.getElement().querySelector(`.card__date-deadline-toggle`)
      .addEventListener(`click`, () => {
        if (this.getElement().querySelector(`.card__date-deadline`).style.display === `block`) {
          this.getElement().querySelector(`.card__date-deadline`).style.display = `none`;
          this.getElement().querySelector(`.card__date-status`).textContent = `no`;
        } else {
          this.getElement().querySelector(`.card__date-deadline`).style.display = `block`;
          this.getElement().querySelector(`.card__date-status`).textContent = `yes`;
        }
      });
  }

  _hideRepeatingDaysInput() {
    this.getElement().querySelector(`.card__repeat-toggle`)
      .addEventListener(`click`, () => {
        if (this.getElement().querySelector(`.card__repeat-days`).style.display === `block`) {
          this.getElement().querySelector(`.card__repeat-days`).style.display = `none`;
          this.getElement().querySelector(`.card__repeat-status`).textContent = `no`;
          this.getElement().querySelector(`.card--edit`).classList.remove(`card--repeat`);
        } else {
          this.getElement().querySelector(`.card__repeat-days`).style.display = `block`;
          this.getElement().querySelector(`.card__repeat-status`).textContent = `yes`;
          this.getElement().querySelector(`.card--edit`).classList.add(`card--repeat`);
        }
      });
  }

  _changeTaskColor() {
    this.getElement().querySelector(`.card__colors-wrap`)
      .addEventListener(`click`, (evt) => {
        if (evt.target.tagName === `INPUT`) {
          const currentColor = evt.target.attributes.value.value;
          const old = this.getElement().querySelector(`.card--edit`)
            .classList[2];
          const newer = `card--${currentColor}`;

          this.getElement().querySelector(`.card--edit`)
            .classList.replace(old, newer);
        }
      });
  }

  /**
   * @return {string}
   */
  getTemplate() {
    return `
      <article class="card card--edit card--${this._color} ${Object.keys(this._repeatingDays).some((day) => this._repeatingDays[day]) ? `card--repeat` : ``}">
        <form class="card__form" method="get">
          <div class="card__inner">
            <div class="card__control">
              <button type="button" class="card__btn card__btn--archive ${this._isArchive ? `card__btn--disabled` : ``}">
                archive
              </button>
              <button
                type="button"
                class="card__btn card__btn--favorites ${this._isFavorite ? `card__btn--disabled` : ``}"
              >
                favorites
              </button>
            </div>
  
            <div class="card__color-bar">
              <svg class="card__color-bar-wave" width="100%" height="10">
                <use xlink:href="#wave"></use>
              </svg>
            </div>
  
            <div class="card__textarea-wrap">
              <label>
                <textarea
                  class="card__text"
                  placeholder="Start typing your text here..."
                  name="text"
                >${this._description}</textarea>
              </label>
            </div>
  
            <div class="card__settings">
              <div class="card__details">
                <div class="card__dates">
                  <button class="card__date-deadline-toggle" type="button">
                    date: <span class="card__date-status">yes</span>
                  </button>
  
                  <fieldset class="card__date-deadline">
                    <label class="card__input-deadline-wrap">
                      <input
                        class="card__date"
                        type="text"
                        placeholder=""
                        name="date"
                        data-date="${this._dueDate}"
                        value="${new Date(this._dueDate).getDate()} ${months[new Date(this._dueDate).getMonth()]} ${new Date(this._dueDate).toTimeString().slice(0, 5)} PM"
                      />
                    </label>
                  </fieldset>
  
                  <button class="card__repeat-toggle" type="button">
                    repeat:<span class="card__repeat-status">${this._checkRepeatingDays() ? `yes` : `no`}</span>
                  </button>
  
                  <fieldset class="card__repeat-days" ${this._checkRepeatingDays() ? `style="display: block"` : `style="display: none"`}>
                    <div class="card__repeat-days-inner">
                      <input
                        class="visually-hidden card__repeat-day-input"
                        type="checkbox"
                        id="repeat-mo-4"
                        name="repeat"
                        value="mo" 
                        ${this._repeatingDays[`mo`] ? `checked` : ``}
                      />
                      <label class="card__repeat-day" for="repeat-mo-4"
                        >mo</label
                      >
                      <input
                        class="visually-hidden card__repeat-day-input"
                        type="checkbox"
                        id="repeat-tu-4"
                        name="repeat"
                        value="tu"
                        ${this._repeatingDays[`tu`] ? `checked` : ``}
                      />
                      <label class="card__repeat-day" for="repeat-tu-4"
                        >tu</label
                      >
                      <input
                        class="visually-hidden card__repeat-day-input"
                        type="checkbox"
                        id="repeat-we-4"
                        name="repeat"
                        value="we"
                        ${this._repeatingDays[`we`] ? `checked` : ``}
                      />
                      <label class="card__repeat-day" for="repeat-we-4"
                        >we</label
                      >
                      <input
                        class="visually-hidden card__repeat-day-input"
                        type="checkbox"
                        id="repeat-th-4"
                        name="repeat"
                        value="th"
                        ${this._repeatingDays[`th`] ? `checked` : ``}
                      />
                      <label class="card__repeat-day" for="repeat-th-4"
                        >th</label
                      >
                      <input
                        class="visually-hidden card__repeat-day-input"
                        type="checkbox"
                        id="repeat-fr-4"
                        name="repeat"
                        value="fr"
                        ${this._repeatingDays[`fr`] ? `checked` : ``}
                      />
                      <label class="card__repeat-day" for="repeat-fr-4"
                        >fr</label
                      >
                      <input
                        class="visually-hidden card__repeat-day-input"
                        type="checkbox"
                        name="repeat"
                        value="sa"
                        id="repeat-sa-4"
                        ${this._repeatingDays[`sa`] ? `checked` : ``}
                      />
                      <label class="card__repeat-day" for="repeat-sa-4"
                        >sa</label
                      >
                      <input
                        class="visually-hidden card__repeat-day-input"
                        type="checkbox"
                        id="repeat-su-4"
                        name="repeat"
                        value="su"
                        ${this._repeatingDays[`su`] ? `checked` : ``}
                      />
                      <label class="card__repeat-day" for="repeat-su-4"
                        >su</label
                      >
                    </div>
                  </fieldset>
                </div>
  
                <div class="card__hashtag">
                  <div class="card__hashtag-list">
                  ${Array.from(this._tags).map((it, index, arr) => index < arr.length ? `
                    <span class="card__hashtag-inner">
                        <input
                          type="hidden"
                          name="hashtag"
                          value="${it}"
                          class="card__hashtag-hidden-input"
                        />
                        <p class="card__hashtag-name">
                          #${it}
                        </p>
                        <button type="button" class="card__hashtag-delete">
                            delete
                        </button>
                    </span>
                  ` : ``).join(``)}
                  </div>
  
                  <label>
                    <input
                      type="text"
                      class="card__hashtag-input"
                      name="hashtag-input"
                      placeholder="Type new hashtag here"
                    />
                  </label>
                </div>
              </div>
  
              <div class="card__colors-inner">
                <h3 class="card__colors-title">Color</h3>
                <div class="card__colors-wrap">
                  <input
                    type="radio"
                    id="color-black-4"
                    class="card__color-input card__color-input--black visually-hidden"
                    name="color"
                    value="black"
                    ${this._color === `black` ? `checked=""` : ``}
                  />
                  <label
                    for="color-black-4"
                    class="card__color card__color--black"
                    >black</label
                  >
                  <input
                    type="radio"
                    id="color-yellow-4"
                    class="card__color-input card__color-input--yellow visually-hidden"
                    name="color"
                    value="yellow"
                    ${this._color === `yellow` ? `checked=""` : ``}
                  />
                  <label
                    for="color-yellow-4"
                    class="card__color card__color--yellow"
                    >yellow</label
                  >
                  <input
                    type="radio"
                    id="color-blue-4"
                    class="card__color-input card__color-input--blue visually-hidden"
                    name="color"
                    value="blue"
                    ${this._color === `blue` ? `checked=""` : ``}
                  />
                  <label
                    for="color-blue-4"
                    class="card__color card__color--blue"
                    >blue</label
                  >
                  <input
                    type="radio"
                    id="color-green-4"
                    class="card__color-input card__color-input--green visually-hidden"
                    name="color"
                    value="green"
                    ${this._color === `green` ? `checked=""` : ``}
                  />
                  <label
                    for="color-green-4"
                    class="card__color card__color--green"
                    >green</label
                  >
                  <input
                    type="radio"
                    id="color-pink-4"
                    class="card__color-input card__color-input--pink visually-hidden"
                    name="color"
                    value="pink"
                    ${this._color === `pink` ? `checked=""` : ``}
                  />
                  <label
                    for="color-pink-4"
                    class="card__color card__color--pink"
                    >pink</label
                  >
                </div>
              </div>
            </div>
  
            <div class="card__status-btns">
              <button class="card__save" type="submit">save</button>
              <button class="card__delete" type="button">delete</button>
            </div>
          </div>
        </form>
      </article>
    `;
  }

  _subscribeOnEvents() {
    this.getElement()
      .querySelector(`.card__hashtag-input`).addEventListener(`keydown`, (evt) => {
        if (evt.key === `Enter`) {
          evt.preventDefault();
          this.getElement().querySelector(`.card__hashtag-list`).insertAdjacentHTML(`beforeend`, `<span class="card__hashtag-inner">
            <input
              type="hidden"
              name="hashtag"
              value="${evt.target.value}"
              class="card__hashtag-hidden-input"
            />
            <p class="card__hashtag-name">
              #${evt.target.value}
            </p>
            <button type="button" class="card__hashtag-delete">
              delete
            </button>
          </span>`);
          evt.target.value = ``;
        }
      });
    this.getElement().querySelectorAll(`.card__hashtag-delete`).forEach((it) => {
      it.addEventListener(`click`, () => {
        unrenderComponent(it.parentElement);
      });
    });
  }
}

export default TaskEdit;
