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
const elementTemplate = document.querySelector('.element-template').content;
const addButton = document.querySelector('.profile__add-button');
const imagePopup = document.querySelector('.popup-image');
const imagePicture = document.querySelector('.popup__img');
const imageCaption = document.querySelector('.popup__caption');
const closeButtons = document.querySelectorAll('.popup__close-button');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

function createCard(item) {
  const element = elementTemplate.cloneNode(true);
  const imageElement = element.querySelector('.elements__image');
  const likeButton = element.querySelector('.elements__like-button');
  const titleElement = element.querySelector('.elements__title');
  const deleteButton = element.querySelector('.elements__delete-button');

  imageElement.src = item.link;
  imageElement.alt = item.name;
  titleElement.textContent = item.name;

  likeButton.addEventListener('click', (event) => {
    event.target.classList.toggle('elements__like-button_type_active');
  });

  deleteButton.addEventListener('click', (event) => {
    event.target.closest('.elements__card').remove();
  });

  imageElement.onclick = function () {
    openPopup(imagePopup);
    imagePicture.src = item.link;
    imagePicture.alt = item.name;
    imageCaption.textContent = item.name;
  };

  return element;
}

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
    const card = createCard(item);
    elementsList.prepend(card);
  });

  event.target.reset();

  disableSaveButton(event.target);

  closePopup(cardPopup);
}

initialCards.forEach((item) => {
  const card = createCard(item);
  elementsList.append(card);
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


