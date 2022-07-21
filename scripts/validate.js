const formTitleLink = {
  form: '.popup__form[name="input_type_titleLink"]',
  button: '.popup__save-button'
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
  } else {
    alert('Форма невалидна');
  }
}

function handleFormInput(event, config) {
  const input = event.target;
  const form = event.currentTarget;
  showFieldError(input);
  setSubmitButtonState(form, config);
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
    button.classList.remove('popup__save-button_type_disabled');
  } else {
    button.setAttribute('disabled', true);
    button.classList.add('popup__save-button_type_disabled');
  }
}


enableValidation(formTitleLink);
