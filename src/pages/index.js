import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';

const editButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup-profile');
const profileForm = profilePopup.querySelector('.popup__container');
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_job');
const elementsList = '.elements__list';
const addButton = document.querySelector('.profile__add-button');
const template = document.querySelector('.element-template').content;
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

const imgPopup = new PopupWithImage('.popup-image');

function handleCardClick(name, link) {
  imgPopup.setEventListeners();
  imgPopup.open(name, link);
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

const userInfo = new UserInfo('.profile__name', '.profile__job');

const profilePopupEl = new PopupWithForm('.popup-profile',
  {
    handleFormSubmit: (info, event) => {

      event.preventDefault();

      userInfo.setUserInfo(info.name, info.job);

      profilePopupEl.close();
    }
  });

profilePopupEl.setEventListeners();

editButton.addEventListener('click', () => {
  profilePopupEl.open();

  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().job;

  formValidators['input_type_nameJob'].setSubmitButtonState();
  formValidators['input_type_nameJob'].hideErrors();
});

const cardPopupEl = new PopupWithForm('.popup-card',
  {
    handleFormSubmit: (info, event) => {

      event.preventDefault();

      const newCard = [{
        name: info.title,
        link: info.link,
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

      formValidators['input_type_titleLink'].setSubmitButtonState();

      cardPopupEl.close();
    }
  });

cardPopupEl.setEventListeners();

addButton.addEventListener('click', () => cardPopupEl.open());
