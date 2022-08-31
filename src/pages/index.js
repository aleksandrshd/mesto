import './index.css';
import {
  editButton,
  addButton,
  template,
  formValidators,
  config,
  initialCards
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';

// В рамках ревью прошу указать, что можно улучшить и оптимизировать.

function handleCardClick(name, link) {
  imgPopup.open(name, link);
}

function createCard(item) {
  const card = new Card(item, template, handleCardClick);
  const cardElement = card.render();

  return cardElement;
}

const imgPopup = new PopupWithImage('.popup-image');
imgPopup.setEventListeners();

const cards = new Section({
    items: initialCards,
    renderer: item => {
      cards.addItem(createCard(item));
    }
  },
  '.elements__list');
cards.renderItems();

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

const cardPopupEl = new PopupWithForm('.popup-card',
  {
    handleFormSubmit: (info, event) => {

      event.preventDefault();

      const newCard = {
        name: info.title,
        link: info.link
      };

      cards.addItem(createCard(newCard));

      cardPopupEl.close();
    }
  });
cardPopupEl.setEventListeners();

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

editButton.addEventListener('click', () => {

  profilePopupEl.setInputValues(userInfo.getUserInfo());

  formValidators['input_type_nameJob'].setSubmitButtonState();
  formValidators['input_type_nameJob'].hideErrors();

  profilePopupEl.open();
});

addButton.addEventListener('click', () => {

  formValidators['input_type_titleLink'].setSubmitButtonState();

  cardPopupEl.open();
});
