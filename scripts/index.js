const editButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const profilePopup = document.querySelector(".popup-profile");
const profileForm = profilePopup.querySelector(".popup__container");
const nameInput = profileForm.querySelector(".popup__input_type_name");
const jobInput = profileForm.querySelector(".popup__input_type_job");
const cardPopup = document.querySelector(".popup-card");
const cardForm = cardPopup.querySelector(".popup__container-card");
const titleInput = cardForm.querySelector(".popup__input_type_title");
const linkInput = cardForm.querySelector(".popup__input_type_link");
const elementsList = document.querySelector(".elements__list");
const elementTemplate = document.querySelector(".element-template").content;
const addButton = document.querySelector(".profile__add-button");
const imagePopup = document.querySelector(".popup-image");
const imagePicture = document.querySelector(".popup__img");
const imageCaption = document.querySelector(".popup__caption");
const closeButtons = document.querySelectorAll(".popup__close-button");
const overlay = document.querySelectorAll(".popup");

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

function createCard(item) {
  const element = elementTemplate.cloneNode(true);
  const imageElement = element.querySelector(".elements__image");
  const likeButton = element.querySelector(".elements__like-button");
  const titleElement = element.querySelector(".elements__title");
  const deleteButton = element.querySelector(".elements__delete-button");

  imageElement.src = item.link;
  imageElement.alt = item.name;
  titleElement.textContent = item.name;

  likeButton.addEventListener("click", (evt) => {
    evt.target.classList.toggle("elements__like-button_type_active");
  });

  deleteButton.addEventListener("click", (evt) => {
    evt.target.closest(".elements__card").remove();
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
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", (event) => {closePopupEsc(event, popup);});
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", (event) => {closePopupEsc(event, popup);});
}

function closePopupOnClick(event, popup) {
  if (event.target === popup) {
    closePopup(popup);
  }
}

function closePopupEsc(event, popup) {
  if (event.key === 'Escape') {
    closePopup(popup);
  }
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(profilePopup);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();

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

  titleInput.value = "";
  linkInput.value = "";

  closePopup(cardPopup);
}

initialCards.forEach((item) => {
  const card = createCard(item);
  elementsList.append(card);
});

editButton.addEventListener("click", () => {
  openPopup(profilePopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

addButton.addEventListener("click", () => {
  openPopup(cardPopup);
});

profileForm.addEventListener("submit", handleProfileFormSubmit);

cardForm.addEventListener("submit", handleCardFormSubmit);

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => {closePopup(popup);});
  popup.addEventListener("click", (event) => {closePopupOnClick(event, popup);});
  //document.addEventListener("keydown", (event) => {closePopupEsc(event, popup);});
});


