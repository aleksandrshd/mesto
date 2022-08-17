class Card {

  constructor(item, template, handleCardClick) {
    this._link = item.link;
    this._name = item.name;

    this._template = template;

    this._element = this._template.cloneNode(true);
    this._likeButton = this._element.querySelector('.elements__like-button');
    this._deleteButton = this._element.querySelector('.elements__delete-button');
    this._imageElement = this._element.querySelector('.elements__image');
    this._titleElement = this._element.querySelector('.elements__title');

    this._handleCardClick = handleCardClick;
  }

  _likeCard() {
    this._likeButton.addEventListener('click', (event) => {
      event.target.classList.toggle('elements__like-button_type_active');
    });
  }

  _deleteCard() {
    this._deleteButton.addEventListener('click', (event) => event.target.closest('.elements__card').remove());
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

  render() {
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._titleElement.textContent = this._name;
    this._setEventListeners();
    return this._element;
  }
  }

export {Card};
