const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// VARIABLES & ELEMENTS

const profileEditButton = document.querySelector("#profile__edit-button");
const profileEditModal = document.querySelector("#profile__edit-modal");
const profileAddModal = document.querySelector("#profile__add-modal");
const cardImageModal = document.querySelector("#picture-modal");
const profileEditCloseButton = profileEditModal.querySelector(
  "#profile-modal-close"
);
const profileAddCloseButton = profileAddModal.querySelector(
  "#modal-add-button-close"
);
const cardImageCloseButton = cardImageModal.querySelector(
  "#picture__modal-button"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const addCardTitle = document.querySelector("#modal-title-input");
const addImageUrl = document.querySelector("#modal-image-url");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const profileAddForm = profileAddModal.querySelector("#add-card-form");
const profileAddButton = document.querySelector(".profile__add-button");
const modalImageCloseButton = cardImageModal.querySelector(
  "#picture__modal-button"
);
const cardListEl = document.querySelector(".gallery__cards");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const img = cardImageModal.querySelector(".modal__picture-src");

// FUNCTIONS

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

// GET CARD FUNCTION & LIKE BUTTON

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".gallery__card-image");
  cardImageEl.addEventListener("click", () => {
    openModal(cardImageModal);
  });
  const cardTitleEl = cardElement.querySelector(".gallery__card-title");
  const cardImageTitle = cardImageModal.querySelector(".modal__picture-title");
  const likeButton = cardElement.querySelector(".gallery__card-like");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("gallery__card-like_active");
  });
  const cardTrash = cardElement.querySelector(".gallery__card-trash");
  cardTrash.addEventListener("click", () => {
    cardElement.remove();
  });
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;
  cardImageEl.addEventListener("click", () => {
    img.src = cardData.link;
    img.alt = cardData.name;
    cardImageTitle.textContent = cardData.name;
  });
  return cardElement;
}

// EVENT HANDLERS

function handlerProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handlerAddCardSubmit(e) {
  e.preventDefault();
  const name = addCardTitle.value;
  const link = addImageUrl.value;
  renderCard({ name, link }, cardListEl);
  closeModal(profileAddModal);
  profileAddForm.reset();
}

// EVENT LISTENERS

// Modal Form

profileEditButton.addEventListener("click", () => {
  fillProfileForm();
  openModal(profileEditModal);
});
profileEditCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);
profileAddButton.addEventListener("click", () => openModal(profileAddModal));
profileAddCloseButton.addEventListener("click", () =>
  closeModal(profileAddModal)
);

// Save Button

profileEditForm.addEventListener("submit", handlerProfileEditSubmit);
profileAddModal.addEventListener("submit", handlerAddCardSubmit);

// Image Modal

cardImageCloseButton.addEventListener("click", () => {
  closeModal(cardImageModal);
});

// Card Data

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
