import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';

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
const elementsList = '.elements__list';
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close-button');
const template = document.querySelector('.element-template').content;
const imagePopup = document.querySelector('.popup-image');
const imagePicture = document.querySelector('.popup__img');
const imageCaption = document.querySelector('.popup__caption');
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

function handleCardClick(name, link) {
  openPopup(imagePopup);
  imagePicture.src = link;
  imagePicture.alt = name;
  imageCaption.textContent = name;
}

const cardsInit = new Section({
  items: initialCards,
  renderer: item => {
    const card = new Card(item, template, handleCardClick);
    const cardElement = card.render();
    cardsInit.addItem(cardElement);
  }
}, elementsList);

cardsInit.renderItems();

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

enableValidation(config);

const profilePopupEl = new PopupWithForm('.popup-profile',
  {
    handleFormSubmit: (event) => {

      console.log('submit_profile');

      event.preventDefault();

      profileName.textContent = nameInput.value;
      profileJob.textContent = jobInput.value;

      profilePopupEl.close();
    }
  });
profilePopupEl.setEventListeners();

editButton.addEventListener('click', () => {
  profilePopupEl.open();
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  formValidators['input_type_nameJob'].setSubmitButtonState();
  formValidators['input_type_nameJob'].hideErrors();
});

const cardPopupEl = new PopupWithForm('.popup-card',
  {
    handleFormSubmit: (event) => {

      console.log('submit_card');

      event.preventDefault();

      const newCard = [{
        name: titleInput.value,
        link: linkInput.value,
      }];

      const cardsNew = new Section({
        items: newCard,
        renderer: item => {
          const card = new Card(item, template, handleCardClick);
          const cardElement = card.render();
          cardsNew.addItem(cardElement);
        }
      }, elementsList);

      cardsNew.renderItems();

      /*event.target.reset();*/

      formValidators['input_type_titleLink'].setSubmitButtonState();

      cardPopupEl.close();
    }
  });

cardPopupEl.setEventListeners();

addButton.addEventListener('click', () => cardPopupEl.open());
