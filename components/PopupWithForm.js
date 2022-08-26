import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__container');
  }

  setEventListeners() {
    super.setEventListeners();
    console.log(this._popup);
    console.log(this._form);
    this._form.addEventListener('submit', this._handleFormSubmit);
  }

  close() {
    super.close();
    /*this._form.reset();*/
  }

  /*_getInputValues() {
    this._inputList = super._popup.querySelectorAll('.form__input');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    console.log(this._formValues);
    console.log(this._handleFormSubmit);
    return this._formValues;
  }*/
}
