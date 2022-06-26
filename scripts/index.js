let editButton = document.querySelector('.profile__edit-button');
let popupElement = document.querySelector('.popup');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
let popupInputName = document.querySelector('.popup__input-name');
let popupInputAbout = document.querySelector('.popup__input-about');

function popupOpen () {
  popupElement.classList.add('popup_display_open');
}
editButton.addEventListener('click', popupOpen);

let closeButton = document.querySelector('.popup__close-button');
function popupClose () {
  popupElement.classList.remove('popup_display_open');
}
closeButton.addEventListener('click', popupClose);

let saveButton = document.querySelector('.popup__save-button');
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileAbout.textContent = popupInputAbout.value;
  popupElement.classList.remove('popup_display_open');
}
saveButton.addEventListener('click', formSubmitHandler);
