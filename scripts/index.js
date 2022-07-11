const editButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const popupElementProfile = document.querySelector(".popup-profile");
const formElement = popupElementProfile.querySelector(".popup__container");
const closeButton = formElement.querySelector(".popup__close-button");
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_job");
const popupElementCard = document.querySelector(".popup-card");
const formElementCard = popupElementCard.querySelector(".popup__container-card");
const closeButtonCard = formElementCard.querySelector(".popup__close-button-card");
const titleInput = formElementCard.querySelector(".popup__input_type_title");
const linkInput = formElementCard.querySelector(".popup__input_type_link");
const elementsList = document.querySelector(".elements__list");
const elementTemplate = document.querySelector(".element-template").content;
const addButton = document.querySelector(".profile__add-button");
const popupElementImage = document.querySelector(".popup-image");
const closeButtonImage = document.querySelector(".popup__close-button-image");

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

function createCard(element) {

  const Element = elementTemplate.cloneNode(true);
  const imageElement = Element.querySelector(".elements__image");
  const likeButton = Element.querySelector(".elements__like-button");
  const titleElement = Element.querySelector(".elements__title");
  const deleteButton = Element.querySelector(".elements__delete-button");

  imageElement.src = element.link;
  imageElement.alt = element.name;
  titleElement.textContent = element.name;

  likeButton.addEventListener("click", (evt) => {evt.target.classList.toggle("elements__like-button_type_active")});

  deleteButton.addEventListener("click", (evt) => {evt.target.closest("li").remove()});

  imageElement.onclick = function() {
    popupOpen(popupElementImage);
    document.querySelector(".popup__img").src = element.link;
    document.querySelector(".popup__img").alt = element.name;
    document.querySelector(".popup__caption").textContent = element.name;
  }

  return Element;
}

initialCards.forEach((element) => {const card = createCard(element); elementsList.append(card)});

function popupOpen(popup) {
  popup.classList.add("popup_opened");
}

function popupClose(popup) {
  popup.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  popupClose(popupElementProfile);
}

function formSubmitHandlerCard(evt) {
  evt.preventDefault();

  const newCards = [{
    name: titleInput.value,
    link: linkInput.value,
  }];

  newCards.forEach((element) => {const card = createCard(element); elementsList.prepend(card)});

  titleInput.value = "";
  linkInput.value = "";

  popupClose(popupElementCard);
}

editButton.addEventListener("click", () => {popupOpen(popupElementProfile)});

addButton.addEventListener("click", () => {popupOpen(popupElementCard)});

formElement.addEventListener("submit", formSubmitHandler);

formElementCard.addEventListener("submit", formSubmitHandlerCard);

closeButton.addEventListener("click", () => {popupClose(popupElementProfile)});

closeButtonCard.addEventListener("click", () => {popupClose(popupElementCard)});

closeButtonImage.addEventListener("click", () => {popupClose(popupElementImage)});



