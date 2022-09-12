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
import Api from '../components/Api.js';
import Popup from "../components/Popup";

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

const options = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-50',
  headers: {
    authorization: '130914df-0f97-4df0-980a-19c8be58ffdc',
    'Content-Type': 'application/json'
  }
}

const api = new Api(options);

const cardsInit = api.getInitialCards();

console.log(cardsInit);

const cards = new Section({
    renderer: item => {
      cards.addItem(createCard(item));
    }
  },
  '.elements__list');

cardsInit.then ((data) => {
  cards.renderItems(data.map((item) => ({name: item.name, link: item.link, likes: item.likes})));
})

const userInfo = new UserInfo('.profile__name', '.profile__job', '.profile__avatar');

const userInfoServer = api.getUserInfo();
console.log(userInfoServer);
userInfoServer.then ((data) => {
  userInfo.setUserInfo(data.name, data.about, data.avatar)
});

const profilePopupEl = new PopupWithForm('.popup-profile',
  {
    handleFormSubmit: (info, event) => {

      event.preventDefault();

      userInfo.setUserInfo(info.name, info.job);
      api.setUserInfo(info.name, info.job);

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

      /*cards.addItem(createCard(newCard));*/
      api.setNewCard(info.title, info.link)
        .then((data =>
          cards.addItem(createCard({name: data.name, link: data.link, likes: data.likes}))));

      cardPopupEl.close();
    }
  });
cardPopupEl.setEventListeners();

const deletePopup = new Popup('.popup-delete-card');

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

























