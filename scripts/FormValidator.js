class FormValidator {
  constructor(config, form) {
    this._form = document.querySelector(form);
    this._config = config;
    this._button = this._form.querySelector(this._config.button);
    this._saveButton = this._form.querySelector('.popup__save-button');
    this._spans = Array.from(this._form.querySelectorAll('.popup__error'));
    this._inputs = Array.from(this._form.querySelectorAll('.popup__input'));
  }

  enableValidation() {
    this._form.addEventListener('input', (event) => this._handleFormInput(event));
  }

  _handleFormInput(event) {
    const input = event.target;
    this._showFieldError(input);
    this._setSubmitButtonState();
    this._setInputState(input);
  }

  _showFieldError(input) {
    const span = input.nextElementSibling;
    span.textContent = input.validationMessage;
  }

  _setSubmitButtonState() {
    const isValid = this._form.checkValidity();
    if (isValid) {
      this._button.removeAttribute('disabled');
      this._button.classList.remove(this._config.buttonDisabled);
    } else {
      this._button.setAttribute('disabled', true);
      this._button.classList.add(this._config.buttonDisabled);
    }
  }

  _setInputState(input) {
    const isValid = input.checkValidity();
    if (isValid) {
      input.classList.remove(this._config.borderInvalid);
    } else {
      input.classList.add(this._config.borderInvalid);
    }
  }

  disableSaveButton () {
    this._saveButton.setAttribute('disabled', true);
    this._saveButton.classList.add('popup__save-button_type_disabled');
  }

  enableSaveButton () {
    this._saveButton.removeAttribute('disabled');
    this._saveButton.classList.remove('popup__save-button_type_disabled');
  }

  spansErrorsReset () {
    this._spans.forEach((span) => span.textContent = '');
  }

  inputsInvalidReset () {
    this._inputs.forEach((input) => input.classList.remove('popup__input_type_invalid'));
  }
}

export {FormValidator};
