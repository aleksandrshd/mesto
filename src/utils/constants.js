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
const initialCards = [
  {
    name: 'Кисловодск',
    link: 'https://horosho-tam.ru/thumb/top/pics/33/68/60b0dbeddbb69e3779626833/kislovodsk.jpg'
  },
  {
    name: 'Калиниград',
    link: 'https://y-k.ru/services/ekskursii-kaliningrad-i-oblast/obzornaya-po-kaliningradu/kaliningrad.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
  {
    name: 'Нерехта',
    link: 'https://i.ytimg.com/vi/-5QbfqMIBIk/maxresdefault.jpg'
  },
  {
    name: 'Сегриев Посад',
    link: 'https://traveltimes.ru/wp-content/uploads/2021/06/hHl0URlnmZkIG1KfgUAx.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  }
];

export {editButton, addButton,avatarEditButton, template, formValidators, config};
