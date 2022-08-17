import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const profilePopup = document.querySelector('.popup-profile');
const profileForm = profilePopup.querySelector('.popup__container');
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_job');
const cardPopup = document.querySelector('.popup-card');
const cardForm = cardPopup.querySelector('.popup__container-card');
const titleInput = cardForm.querySelector('.popup__input_type_title');
const linkInput = cardForm.querySelector('.popup__input_type_link');
const elementsList = document.querySelector('.elements__list');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close-button');
const template = document.querySelector('.element-template').content;
const imagePopup = document.querySelector('.popup-image');
const imagePicture = document.querySelector('.popup__img');
const imageCaption = document.querySelector('.popup__caption');
const config = {
  button: '.popup__save-button',
  buttonDisabled: 'popup__save-button_type_disabled',
  borderInvalid: 'popup__input_type_invalid'
};
const initialCards = [
  {
    name: 'Кисловодск',
    link: 'https://horosho-tam.ru/thumb/top/pics/33/68/60b0dbeddbb69e3779626833/kislovodsk.jpg',
  },
  {
    name: 'Калиниград',
    link: 'https://y-k.ru/services/ekskursii-kaliningrad-i-oblast/obzornaya-po-kaliningradu/kaliningrad.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
  {
    name: 'Нерехта',
    link: 'https://i.ytimg.com/vi/-5QbfqMIBIk/maxresdefault.jpg',
  },
  {
    name: 'Сегриев Посад',
    link: 'https://traveltimes.ru/wp-content/uploads/2021/06/hHl0URlnmZkIG1KfgUAx.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
];

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

function closePopupOnClick(event, popup) {
  if (event.target === popup) {
    closePopup(popup);
  }
}

function closePopupEsc(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function setNameJobValue() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function createCard(item, template, handleCardClick) {
  const card = new Card(item, template, handleCardClick);
  const cardElement = card.render();
  return cardElement;
}

function handleCardClick(name, link) {
    openPopup(imagePopup);
    imagePicture.src = link;
    imagePicture.alt = name;
    imageCaption.textContent = name;
}

function handleProfileFormSubmit(event) {
  event.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(profilePopup);
}

function handleCardFormSubmit(event) {
  event.preventDefault();

  const newCard = {
      name: titleInput.value,
      link: linkInput.value,
    };

  const cardElement = createCard(newCard, template, handleCardClick);
  elementsList.prepend(cardElement);

  event.target.reset();

  formValidators['input_type_titleLink'].disableSaveButton();

  closePopup(cardPopup);
}

initialCards.forEach((item) => {
  const cardElement = createCard(item, template, handleCardClick);
  elementsList.prepend(cardElement);
});

editButton.addEventListener('click', () => {
  openPopup(profilePopup);

  setNameJobValue();

  formValidators['input_type_nameJob'].enableSaveButton();
  formValidators['input_type_nameJob'].spansErrorsReset();
  formValidators['input_type_nameJob'].inputsInvalidReset();

});

addButton.addEventListener('click', () => {
  openPopup(cardPopup);
});

profileForm.addEventListener('submit', handleProfileFormSubmit);

cardForm.addEventListener('submit', handleCardFormSubmit);

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => {closePopup(popup);});
  popup.addEventListener('click', (event) => {closePopupOnClick(event, popup);});
});

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    const formName = formElement.getAttribute('name');
    const validator = new FormValidator(config, `.popup__form[name="${formName}"]`);
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation (config);
