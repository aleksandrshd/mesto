const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const avatarEditButton = document.querySelector('.profile__avatar');
const template = document.querySelector('.element-template').content;
const formValidators = {};

const config = {
  button: '.popup__save-button',
  buttonDisabled: 'popup__save-button_type_disabled',
  error: '.popup__error',
  input: '.popup__input',
  inputInvalid: 'popup__input_type_invalid'
};

const options = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-50',
  headers: {
    authorization: '130914df-0f97-4df0-980a-19c8be58ffdc',
    'Content-Type': 'application/json'
  }
};

export {editButton, addButton,avatarEditButton, template, formValidators, config, options};
