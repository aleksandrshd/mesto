const formTitleLink = {
  form: '.popup__form[name="input_type_titleLink"]',
  button: '.popup__save-button',
  buttonDisabled: 'popup__save-button_type_disabled',
  borderInvalid: 'popup__input_type_invalid'
};

const formNameJob ={
  form: '.popup__form[name="input_type_nameJob"]',
  button: '.popup__save-button',
  buttonDisabled: 'popup__save-button_type_disabled',
  borderInvalid: 'popup__input_type_invalid'
};

function enableValidation(config) {
  const form = document.querySelector(config.form);
  form.addEventListener("submit", handleFormSubmit);
  form.addEventListener("input", (event) => handleFormInput(event, config));

}

function handleFormSubmit(event) {
  const form = event.currentTarget;
  const isValid = form.checkValidity();
  if (isValid) {
    alert('Форма валидна');
    //form.reset();
  } else {
    alert('Форма невалидна');
  }
}

function handleFormInput(event, config) {
  const input = event.target;
  const form = event.currentTarget;
  showFieldError(input);
  setSubmitButtonState(form, config);
  setInputState(input, config);
}

function showFieldError(input) {
  const span = input.nextElementSibling;
  span.textContent = input.validationMessage;
}

function setSubmitButtonState(form, config) {
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

function setInputState(input, config) {
  const isValid = input.checkValidity();
  if (isValid) {
    input.classList.remove(config.borderInvalid);
  } else {
    input.classList.add(config.borderInvalid);
  }
}


enableValidation(formTitleLink);

enableValidation(formNameJob);
