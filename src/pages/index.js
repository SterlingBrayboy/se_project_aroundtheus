import PopupWithForm from "../components/PopupWithForm.js";

import PopupWithImage from "../components/PopupWIthImage.js";

import FormValidator from "../components/FormValidator.js";

import UserInfo from "../components/UserInfo.js";

import Section from "../components/Section.js";

import Card from "../components/Card.js";

import "./index.css";

import { initialCards, config } from "../utils/utils.js";

// SECTION

const section = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = createCard(cardData);
      section.addItem(card);
    },
  },
  "gallery__cards"
);

section.renderItems();

// CARD

function renderCard(cardData, wrapper) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick
  ).generateCard();
  wrapper.prepend(card);
}

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick
  ).generateCard();
  return card;
}

// FORM VALIDATOR

const profileEditModal = document.querySelector("#profile__edit-modal");
const profileAddModal = document.querySelector("#profile__add-modal");

const addFormEl = profileAddModal;
const editFormEl = profileEditModal;

const addFormValidator = new FormValidator(config, addFormEl);
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(config, editFormEl);
editFormValidator.enableValidation();

// POPUP WITH IMAGE

const popupWithImage = new PopupWithImage("#picture-modal");

// POPUP WITH FORM

const addCardSelector = "#profile__add-modal";
const editCardSelector = "#profile__edit-modal";
const addCardTitle = document.querySelector("#modal-title-input");
const addImageUrl = document.querySelector("#modal-image-url");

function handlerAddCardSubmit(e) {
  e.preventDefault();
  const name = addCardTitle.value;
  const link = addImageUrl.value;
  renderCard({ name, link });
  close(profileAddModal);
  profileAddForm.reset();
  addFormValidator.toggleButtonState();
}

// function handleFormClick(addCardSelector) {
//   popupWithForm.open(addCardSelector);
// }

function newPlace() {
  const popupWithForm = new PopupWithForm(
    addCardSelector,
    handlerAddCardSubmit
  );
  popupWithForm.open();
}

function editInfo() {
  const popupWithForm = new PopupWithForm(
    editCardSelector,
    handlerProfileEditSubmit()
  );
  popupWithForm.open();
}

// popupWithForm.open();

// USER INFO

// const userinfo = new UserInfo(nameSelector, jobSelector);

// VARIABLES & ELEMENTS

const profileEditButton = document.querySelector("#profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
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
const profileEditForm = profileEditModal.querySelector(".modal__form");
const profileAddForm = profileAddModal.querySelector("#add-card-form");
// const profileAddButton = document.querySelector(".profile__add-button");
const modalImageCloseButton = cardImageModal.querySelector(
  "#picture__modal-button"
);
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const img = cardImageModal.querySelector(".modal__picture-src");

// FUNCTIONS

// function closeModal(modal) {
//   modal.classList.remove("modal_opened");
//   modal.removeEventListener("mousedown", closeModalOnRemoteClick);
//   document.removeEventListener("keydown", closeModalByEscape);
// }

// function openModal(modal) {
//   modal.classList.add("modal_opened");
//   modal.addEventListener("mousedown", closeModalOnRemoteClick);
//   document.addEventListener("keydown", closeModalByEscape);
// }

// function fillProfileForm() {
//   profileTitleInput.value = profileTitle.textContent;
//   profileDescriptionInput.value = profileDescription.textContent;
// }

function handleImageClick(cardData) {
  popupWithImage.open(cardData);
}

// Mouse Click Key Function To Close Modals

function closeModalOnRemoteClick(evt) {
  if (evt.target === evt.currentTarget) {
    popupWithImage.close(evt.target);
  }
}

// Keydown Escape Key Function To Close Modals

// function closeModalByEscape(evt) {
//   if (evt.key === "Escape") {
//     const openedModal = document.querySelector(".modal_opened");
//     popupWithImage.close();
//   }
// }

// EVENT HANDLERS

profileEditForm.addEventListener("submit", handlerProfileEditSubmit);
profileAddModal.addEventListener("submit", handlerAddCardSubmit);

function handlerProfileEditSubmit(e) {
  // e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  profileEditModal.classList.remove("modal_opened");
}

// EVENT LISTENERS

// Modal Form

const openedModal = document.querySelector(".modal_opened");

profileEditButton.addEventListener("click", () => {
  // fillProfileForm();
  editInfo();
});
profileEditCloseButton.addEventListener("click", () => close(profileEditModal));
profileAddButton.addEventListener("click", () => newPlace());
profileAddCloseButton.addEventListener("click", () => {
  profileAddModal.classList.remove("modal_opened");
});

const modal = document.querySelector(".modal");

// Image Modal

cardImageCloseButton.addEventListener("click", () => {
  popupWithImage.close();
});
