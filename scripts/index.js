let editButton = document.querySelector('.profile__edit-button');

let popupElement = document.querySelector('.popup');
let formElement = popupElement.querySelector('.popup__form');
let closeButton = formElement.querySelector('.popup__close-button');
let saveButton = formElement.querySelector('.popup__save-button');
let nameInput = formElement.querySelector('.popup__input-name');
let jobInput = formElement.querySelector('.popup__input-about');

function popupOpen () {
  popupElement.classList.add('popup_display_open');
}

editButton.addEventListener('click', popupOpen);


function popupClose () {
  popupElement.classList.remove('popup_display_open');
}

closeButton.addEventListener('click', popupClose);


function formSubmitHandler (evt) {
  evt.preventDefault();

  let profileName = document.querySelector('.profile__name');
  let profileJob = document.querySelector('.profile__about');

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  popupElement.classList.remove('popup_display_open');
}

saveButton.addEventListener('click', formSubmitHandler);
