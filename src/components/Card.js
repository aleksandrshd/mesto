export default class Card {

  constructor(item, template, handleCardClick, {handleDeleteIconClick}, userId) {
    this._link = item.link;
    this._name = item.name;
    this._likes = item.likes;
    this._id = item.id;
    this._ownerID = item.ownerID;
    this._userID = userId;
    this._template = template;

    this._element = this._template.cloneNode(true);
    this._likeButton = this._element.querySelector('.elements__like-button');
    this._likeCounter = this._element.querySelector('.elements__like-counter');
    this._deleteButton = this._element.querySelector('.elements__delete-button');
    this._imageElement = this._element.querySelector('.elements__image');
    this._titleElement = this._element.querySelector('.elements__title');

    this._handleCardClick = handleCardClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
  }

  _likeCard() {
    this._likeButton.addEventListener('click', (event) => {
      event.target.classList.toggle('elements__like-button_type_active');
    });
  }

  _deleteCard() {
    /*this._deleteButton.addEventListener('click', (event) => event.target.closest('.elements__card').remove());*/
    this._deleteButton.addEventListener('click', () => {this._handleDeleteIconClick()});
  }

  _openCardImage() {
    this._imageElement.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _setEventListeners() {
    this._likeCard();
    this._deleteCard();
    this._openCardImage();
  }

  _setDeleteButtonView() {
    this._deleteButton.classList.add(this._ownerID === this._userID ? 'elements__delete-button_visible' : 'elements__delete-button_hidden');
  }

  id() {
    return this._id;
  }

  removeCard() {
    this._element.remove();
  }

  setLikesInfo() {
    this._likeCounter.textContent = '10';
  }

  render() {
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._titleElement.textContent = this._name;
    this._likeCounter.textContent = this._likes.length;
    this._setEventListeners();
    this._setDeleteButtonView();
    return this._element;
  }
}
