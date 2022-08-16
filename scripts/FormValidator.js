class FormValidator {
  constructor(config, form) {
    this._form = document.querySelector(form);
    this._config = config;
  }

  enableValidation() {
    this._form.addEventListener('input', (event) => this._handleFormInput(event, this._config));
  }

  _handleFormInput(event, config) {
    const input = event.target;
    const form = event.currentTarget;
    this._showFieldError(input);
    this._setSubmitButtonState(form, this._config);
    this._setInputState(input, this._config);
  }

  _showFieldError(input) {
    const span = input.nextElementSibling;
    span.textContent = input.validationMessage;
  }

  _setSubmitButtonState(form, config) {
    const button = form.querySelector(config.button);
    const isValid = form.checkValidity();
    if (isValid) {
      button.removeAttribute('disabled');
      button.classList.remove(config.buttonDisabled);
    } else {
      button.setAttribute('disabled', true);
      button.classList.add(config.buttonDisabled);
    }
  }

  _setInputState(input, config) {
    const isValid = input.checkValidity();
    if (isValid) {
      input.classList.remove(config.borderInvalid);
    } else {
      input.classList.add(config.borderInvalid);
    }
  }

}

export {FormValidator};
