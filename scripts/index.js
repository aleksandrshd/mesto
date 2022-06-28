let editButton = document.querySelector('.profile__edit-button');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__about');
let popupElement = document.querySelector('.popup');
let formElement = popupElement.querySelector('.popup__form');
let closeButton = formElement.querySelector('.popup__close-button');
let nameInput = formElement.querySelector('.popup__input-name');
let jobInput = formElement.querySelector('.popup__input-about');

function popupOpen () {
  popupElement.classList.add('popup_display_open');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function popupClose () {
  popupElement.classList.remove('popup_display_open');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupClose ();
}

closeButton.addEventListener('click', popupClose);

editButton.addEventListener('click', popupOpen);

formElement.addEventListener('submit', formSubmitHandler);
