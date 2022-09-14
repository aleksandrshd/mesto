import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');

  }

  setSubmitAction(handleFormSubmit) {
    this._handleFormSubmit = handleFormSubmit;
    this._form.addEventListener('submit', (event) => this._handleFormSubmit(event));
  }

  getSubmitButton() {
    return this._form.querySelector('.popup__save-button');
  }
}
