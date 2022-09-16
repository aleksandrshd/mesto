import './index.css';
import {
  editButton, addButton, avatarEditButton, template, formValidators, config, options
} from '../utils/constants.js';
import {renderLoading} from '../utils/utils.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Api from '../components/Api.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';

let userId = null;

function handleCardClick(name, link) {
  imgPopup.open(name, link);
}

function createCard(item) {
  const card = new Card(item, template, handleCardClick, {
    handleDeleteIconClick: () => {

      popupConfirmation.open();

      formValidators['input_type_delete-card'].setSubmitButtonState();

      popupConfirmation.setSubmitAction((event) => {
        event.preventDefault();

        renderLoading(true, popupConfirmation.getSubmitButton(), 'Да');

        api.deleteCard(card.id())
          .then(() => {
            card.removeCard();
            popupConfirmation.close();
          })

          .catch(err => console.log(`Ошибка: ${err}`))

          .finally(() => {
            renderLoading(false, popupConfirmation.getSubmitButton(), 'Да');
          });
      })
    }
  }, () => {

    api.changeLikeCardStatus(card.id(), card.isLiked())

      .then((data) => {
        card.setLikesInfo(data.likes);
      })

      .catch(err => console.log(`Ошибка: ${err}`))
  }, userId);

  const cardElement = card.render();

  return cardElement;
}

const api = new Api(options);

const avatarForm = new PopupWithForm('.popup-avatar', {
  handleFormSubmit: (info, event) => {
    event.preventDefault();

    renderLoading(true, avatarForm.getSubmitButton(), 'Сохранить');

    api.setUserAvatar(info.avatar)

      .then((data) => {
        userInfo.setUserAvatar(data.avatar);
        avatarForm.close();
      })

      .catch(err => {
        console.log(`${err}`);
        avatarForm.setServerError(err);
      })

      .finally(() => {
        renderLoading(false, avatarForm.getSubmitButton(), 'Сохранить');
      });
  }
});

avatarForm.setEventListeners();

const imgPopup = new PopupWithImage('.popup-image');

imgPopup.setEventListeners();

const cards = new Section({
  renderer: item => {
    cards.addItem(createCard(item));
  }
}, '.elements__list');

const userInfo = new UserInfo('.profile__name', '.profile__job', '.profile__avatar');

api
  .getUserInfo()

  .then((data) => {
    userInfo.setUserInfo(data.name, data.about, data.avatar);
    userId = data._id;
  })

  .then(() =>
    api
      .getInitialCards()

      .then((data) => {
        cards.renderItems(data.reverse().map((item) => ({
          name: item.name, link: item.link, likes: item.likes, ownerID: item.owner._id, id: item._id
        })));
      }))

  .catch(err => console.log(`Ошибка: ${err}`));

const profilePopupEl = new PopupWithForm('.popup-profile', {
  handleFormSubmit: (info, event) => {

    event.preventDefault();

    renderLoading(true, profilePopupEl.getSubmitButton(), 'Сохранить');

    api.setUserInfo(info.name, info.job)
      .then((data) => {
        userInfo.setUserNameJob(data.name, data.about);
        profilePopupEl.close();
      })

      .catch(err => console.log(`Ошибка: ${err}`))

      .finally(() => {
        renderLoading(false, profilePopupEl.getSubmitButton(), 'Сохранить');
      });
  }
});

profilePopupEl.setEventListeners();

const popupAddCard = new PopupWithForm('.popup-card', {
  handleFormSubmit: (info, event) => {
    event.preventDefault();

    renderLoading(true, popupAddCard.getSubmitButton(), 'Создать');

    api.setNewCard(info.title, info.link)

      .then(data => {
        cards.addItem(createCard({
          name: data.name, link: data.link, likes: data.likes, ownerID: data.owner._id, id: data._id
        }));
        popupAddCard.close();
      })

      .catch(err => console.log(`Ошибка: ${err}`))

      .finally(() => {
        renderLoading(false, popupAddCard.getSubmitButton(), 'Создать');
      });
  }
});

popupAddCard.setEventListeners();

const popupConfirmation = new PopupWithConfirmation('.popup-delete-card');

popupConfirmation.setEventListeners();

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
  formValidators['input_type_titleLink'].hideErrors();

  popupAddCard.open();
});

avatarEditButton.addEventListener('click', () => {

  formValidators['input_type_avatar'].setSubmitButtonState();
  formValidators['input_type_avatar'].hideErrors();

  avatarForm.open();

});

























