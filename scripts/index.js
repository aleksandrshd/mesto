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

initialCards.forEach(function (element) {
  const Element = elementTemplate.cloneNode(true);
  const likeButton = Element.querySelector(".elements__like-button");
  const deleteButton = Element.querySelector(".elements__delete-button");

  Element.querySelector(".elements__image").src = element.link;
  Element.querySelector(".elements__image").alt = element.name;
  Element.querySelector(".elements__title").textContent = element.name;

  likeButton.addEventListener("click", function (evt) {
    evt.target.classList.toggle("elements__like-button_type_active");
  });

  deleteButton.addEventListener("click", function (evt) {evt.target.closest("li").remove();});

  Element.querySelector(".elements__image").onclick = function() {
    popupElementImage.classList.add("popup_opened");
    document.querySelector(".popup__img").src = this.src;
    document.querySelector(".popup__img").alt = this.alt;
    document.querySelector(".popup__caption").textContent = this.alt;
  }

  elementsList.append(Element);
});


function popupOpen() {
  popupElementProfile.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function popupOpenCard() {
  popupElementCard.classList.add("popup_opened");
  titleInput.value = "";
  linkInput.value = "";
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
  const Element = elementTemplate.cloneNode(true);
  Element.querySelector(".elements__image").src = linkInput.value;
  Element.querySelector(".elements__image").alt = titleInput.value;
  Element.querySelector(".elements__title").textContent = titleInput.value;

  const likeButton = Element.querySelector(".elements__like-button");
  likeButton.addEventListener("click", function (evt) {
    evt.target.classList.toggle("elements__like-button_type_active");
  });

  const deleteButton = Element.querySelector(".elements__delete-button");
  deleteButton.addEventListener("click", function (evt) {evt.target.closest("li").remove();});

  Element.querySelector(".elements__image").onclick = function() {
    popupElementImage.classList.add("popup_opened");
    document.querySelector(".popup__img").src = this.src;
    document.querySelector(".popup__img").alt = this.alt;
    document.querySelector(".popup__caption").textContent = this.alt;
  }

  elementsList.prepend(Element);

  popupClose(popupElementCard);
}

editButton.addEventListener("click", popupOpen);

addButton.addEventListener("click", popupOpenCard);

formElement.addEventListener("submit", formSubmitHandler);

formElementCard.addEventListener("submit", formSubmitHandlerCard);

closeButton.addEventListener("click", function () {popupClose(popupElementProfile)});

closeButtonCard.addEventListener("click", function () {popupClose(popupElementCard)});

closeButtonImage.addEventListener("click", function () {popupClose(popupElementImage)});



