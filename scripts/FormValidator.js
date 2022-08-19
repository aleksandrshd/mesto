class FormValidator {
  constructor(config, form) {
    this._form = document.querySelector(form);
    this._config = config;
    this._button = this._form.querySelector(this._config.button);
    this._spans = Array.from(this._form.querySelectorAll(this._config.error));
    this._inputs = Array.from(this._form.querySelectorAll(this._config.input));
  }

  enableValidation() {
    this._form.addEventListener('input', (event) => this._handleFormInput(event));
  }

  _handleFormInput(event) {
    const input = event.target;
    this._showFieldError(input);
    this.setSubmitButtonState();
    this._setInputState(input);
  }

  _showFieldError(input) {
    const span = input.nextElementSibling;
    span.textContent = input.validationMessage;
  }

  setSubmitButtonState() {
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
      input.classList.remove(this._config.inputInvalid);
    } else {
      input.classList.add(this._config.inputInvalid);
    }
  }

  hideErrors () {
    this._spans.forEach((span) => span.textContent = '');
    this._inputs.forEach((input) => input.classList.remove(this._config.inputInvalid));
  }
}

export {FormValidator};
