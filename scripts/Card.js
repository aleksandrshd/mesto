import {openPopup} from './index.js';

class Card {

  constructor(item, template) {
    this._link = item.link;
    this._name = item.name;
    this._template = template;
  }

  _likeCard() {
    const likeButton = this._element.querySelector('.elements__like-button');
    likeButton.addEventListener('click', (event) => {
      event.target.classList.toggle('elements__like-button_type_active');
    });
  }

  _deleteCard() {
    const deleteButton = this._element.querySelector('.elements__delete-button');
    deleteButton.addEventListener('click', (event) => event.target.closest('.elements__card').remove());
  }

  _openCardImage() {
    const imagePopup = document.querySelector('.popup-image');
    const imagePicture = document.querySelector('.popup__img');
    const imageCaption = document.querySelector('.popup__caption');
    const imageElement = this._element.querySelector('.elements__image');
    imageElement.onclick = () => {
      openPopup(imagePopup);
      imagePicture.src = this._link;
      imagePicture.alt = this._name;
      imageCaption.textContent = this._name;
    }
  }

  _setEventListeners() {
    this._likeCard();
    this._deleteCard();
    this._openCardImage();
  }

  render() {
    this._element = this._template.cloneNode(true);
    const imageElement = this._element.querySelector('.elements__image');
    const titleElement = this._element.querySelector('.elements__title');
    imageElement.src = this._link;
    imageElement.alt = this._name;
    titleElement.textContent = this._name;
    this._setEventListeners();
    return this._element;
  }
  }

export {Card};
