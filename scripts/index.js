const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const popupElement = document.querySelector('.popup');
const formElement = popupElement.querySelector('.popup__form_container');
const closeButton = formElement.querySelector('.popup__close-button');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');

function popupOpen () {
  popupElement.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function popupClose () {
  popupElement.classList.remove('popup_opened');
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
