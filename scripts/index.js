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
const formTitleLink = '.popup__form[name="input_type_titleLink"]';
const configTitleLink = {
  button: '.popup__save-button',
  buttonDisabled: 'popup__save-button_type_disabled',
  borderInvalid: 'popup__input_type_invalid'
};
const formNameJob = '.popup__form[name="input_type_nameJob"]';
const configNameJob ={
  form: '.popup__form[name="input_type_nameJob"]',
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
    name: 'Эльбрус',
    link: 'http://s4.fotokto.ru/photo/full/184/1846566.jpg',
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
    name: 'Александров',
    link: 'http://ggss.narod.ru/foto/Aleksandrov/slides/62.jpg',
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

function disableSaveButton (popup) {
  const button = popup.querySelector('.popup__save-button');
  button.setAttribute('disabled', true);
  button.classList.add('popup__save-button_type_disabled');
}

function enableSaveButton (popup) {
  const button = popup.querySelector('.popup__save-button');
  button.removeAttribute('disabled');
  button.classList.remove('popup__save-button_type_disabled');
}

function spansErrorsReset (popup) {
  const spans = Array.from(popup.querySelectorAll('.popup__error'));
  spans.forEach((span) => span.textContent = '');
}

function inputsInvalidReset (popup) {
  const inputs = Array.from(popup.querySelectorAll('.popup__input'));
  inputs.forEach((input) => input.classList.remove('popup__input_type_invalid'));
}

function handleProfileFormSubmit(event) {
  event.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(profilePopup);
}

function handleCardFormSubmit(event) {
  event.preventDefault();

  const newCards = [
    {
      name: titleInput.value,
      link: linkInput.value,
    },
  ];

  newCards.forEach((item) => {
    const card = new Card(item, template);
    const cardElement = card.render();
    elementsList.prepend(cardElement);
  });

  event.target.reset();

  disableSaveButton(event.target);

  closePopup(cardPopup);
}

initialCards.forEach((item) => {
  const card = new Card(item, template);
  const cardElement = card.render();
  elementsList.prepend(cardElement);
});

editButton.addEventListener('click', () => {
  openPopup(profilePopup);

  setNameJobValue();

  enableSaveButton(profilePopup);

  spansErrorsReset(profilePopup);

  inputsInvalidReset(profilePopup);
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

const ValTitleLink = new FormValidator(configTitleLink, formTitleLink);
ValTitleLink.enableValidation();

const ValNameJob = new FormValidator(configNameJob, formNameJob);
ValNameJob.enableValidation();

export {openPopup};


