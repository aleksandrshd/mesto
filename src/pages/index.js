import './index.css';
import {
  editButton,
  addButton,
  avatarEditButton,
  template,
  formValidators,
  config
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Api from '../components/Api.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';

let userId = null;

function handleCardClick(name, link) {
  imgPopup.open(name, link);
}

function createCard(item) {
  const card = new Card(item, template, handleCardClick,
    {
      handleDeleteIconClick: () => {
        deletePopup.open();

        formValidators['input_type_delete-card'].setSubmitButtonState();

        deletePopup.setSubmitAction((event) => {
          event.preventDefault();

          renderLoading(true, deletePopup.getSubmitButton(), 'Да');

          api.deleteCard(card.id())
            .then(() => {
              card.removeCard();
            })

            .catch(err => console.log(`Ошибка: ${err}`))

            .finally(() => {
              renderLoading(false, deletePopup.getSubmitButton(), 'Да');
              deletePopup.close();
            });
        })
      }
    },
    () => {
      api.changeLikeCardStatus(card.id(), card.isLiked())
        .then((data) => {
          card.setLikesInfo(data.likes);
        });
    },
    userId);

  const cardElement = card.render();

  return cardElement;
}

function renderLoading(isLoading, button, buttonText) {
  if (isLoading) {
    button.textContent = 'Сохранение ...';
  } else {
    button.textContent = buttonText;
  }
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

cardsInit.then((data) => {
  /*data.reverse();*/
  cards.renderItems(data.reverse().map((item) => ({
    name: item.name,
    link: item.link,
    likes: item.likes,
    ownerID: item.owner._id,
    id: item._id
  })));
})

const userInfo = new UserInfo('.profile__name', '.profile__job', '.profile__avatar');

api.getUserInfo().then((data) => {
  userInfo.setUserInfo(data.name, data.about, data.avatar);
  userId = data._id;
});

const profilePopupEl = new PopupWithForm('.popup-profile',
  {
    handleFormSubmit: (info, event) => {

      event.preventDefault();

      renderLoading(true, profilePopupEl.getSubmitButton(), 'Сохранить');

      api.setUserInfo(info.name, info.job)
        .then((data) => userInfo.setUserNameJob(data.name, data.about))

        .catch(err => console.log(`Ошибка: ${err}`))

        .finally(() => {
          renderLoading(false, profilePopupEl.getSubmitButton(), 'Сохранить');
          profilePopupEl.close();
        });
    }
  });
profilePopupEl.setEventListeners();

const cardPopupEl = new PopupWithForm('.popup-card',
  {
    handleFormSubmit: (info, event) => {

      event.preventDefault();

      renderLoading(true, cardPopupEl.getSubmitButton(), 'Создать');

      api.setNewCard(info.title, info.link)

        .then((data =>
          cards.addItem(createCard({
            name: data.name,
            link: data.link,
            likes: data.likes,
            ownerID: data.owner._id,
            id: data._id
          }))))

        .catch(err => console.log(`Ошибка: ${err}`))

        .finally(() => {

          renderLoading(false, cardPopupEl.getSubmitButton(), 'Создать');
          cardPopupEl.close();

        });
    }
  });

cardPopupEl.setEventListeners();

const deletePopup = new PopupWithSubmit('.popup-delete-card');

deletePopup.setEventListeners();

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

const avatarForm = new PopupWithForm('.popup-avatar',
  {
    handleFormSubmit: (info, event) => {

      event.preventDefault();

      renderLoading(true, avatarForm.getSubmitButton(), 'Сохранить');

      api.setUserAvatar(info.avatar)
        .then((data) => userInfo.setUserAvatar(data.avatar))
        .catch(err => console.log(`Ошибка: ${err}`))
        .finally(() => {
          renderLoading(false, avatarForm.getSubmitButton(), 'Сохранить');
          avatarForm.close();
        });
    }
  });
avatarForm.setEventListeners();

avatarEditButton.addEventListener('click', () => {

  formValidators['input_type_avatar'].setSubmitButtonState();
  avatarForm.open();

});

























