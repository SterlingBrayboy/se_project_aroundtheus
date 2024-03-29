import PopupWithForm from "../components/PopupWithForm.js";

import PopupWithImage from "../components/PopupWIthImage.js";

import PopupWithDelete from "../components/PopupWithDelete.js";

import FormValidator from "../components/FormValidator.js";

import UserInfo from "../components/UserInfo.js";

import Section from "../components/Section.js";

import Card from "../components/Card.js";

import Api from "../components/Api.js";

import "./index.css";

import { config, variables } from "../utils/constants.js";

// API

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "ebfbe580-59e8-4623-9d1e-5edf14608279",
    "Content-Type": "application/json",
  },
});

// SECTION

let section;

api
  .getInitialCards()
  .then((res) => {
    section = new Section(
      {
        items: res,
        renderer: (cardData) => {
          createCard(cardData);
        },
      },
      "gallery__cards"
    );
    section.renderItems();
    console.log(res);
  })
  .catch(console.error);

api
  .loadInfo()
  .then((res) => {
    console.log(res);
    userinfo.setUserInfo(res.name, res.about);
    userinfo.setAvatar(res.avatar);
  })
  .catch(console.error);

// POPUP WITH IMAGE

const popupWithImage = new PopupWithImage("#picture-modal");

popupWithImage.setEventListeners();

// SAVE BUTTON TEXT CHANGE FUNCTION FOR FORMS

function setButtonText(button, text) {
  button.textContent = text;
}

// CARD

function handleImageClick(cardData) {
  popupWithImage.open(cardData);
}

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  );
  section.addItem(card.generateCard());
}

function handleAddCardSubmit(inputValues) {
  setButtonText(variables.addModalButton, "Saving...");
  api
    .addNewCard(inputValues)
    .then((res) => {
      console.log(res);
      // create a new card
      createCard(res);
      // render it
      variables.profileAddForm.reset();
      // toggle button state
      addFormValidator.toggleButtonState();
      // close modal
      addPopup.close();
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(variables.addModalButton, "Save");
    });
}

// HANDLE DELETE MODAL

const deleteModal = new PopupWithDelete(variables.deleteCardClass);
deleteModal.setEventListeners();

function handleDeleteClick(card) {
  // open the modal
  deleteModal.open();
  // set the submit action
  deleteModal.setSubmitAction(() => {
    api
      .deleteCard(card._id)
      .then(() => {
        deleteModal.close();
        card.handleDelete();
      })
      .catch(console.error);
  });
}

// CARD LIKE

function handleLikeClick(card) {
  api
    .updateLike(card._id, card.isLiked())
    .then(() => {
      card.handleLike();
      console.log(card);
    })
    .catch(console.error);
  // handle changing the button's state in a .then after the successful response
}

// FORM VALIDATOR

const addFormValidator = new FormValidator(config, variables.profileAddModal);
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(config, variables.profileEditModal);
editFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(config, variables.avatarModal);
avatarFormValidator.enableValidation();

// POPUP WITH FORM - ADD FORM

const addPopup = new PopupWithForm(variables.addCardClass, handleAddCardSubmit);

function openAddForm() {
  addPopup.open();
}

addPopup.setEventListeners();

variables.profileAddButton.addEventListener("click", () => openAddForm());

// POPUP WITH FORM - EDIT FORM

const editPopup = new PopupWithForm(
  variables.editCardClass,
  handleEditFormSubmit
);

function openEditForm() {
  const user = userinfo.getUserInfo();
  variables.nameInput.value = user.name;
  variables.descriptionInput.value = user.description;
  editPopup.open();
}

editPopup.setEventListeners();

variables.profileEditButton.addEventListener("click", () => {
  openEditForm();
});

// POPUP WITH FORM - AVATAR FORM

const avatarModal = new PopupWithForm(
  variables.avatarModal,
  handleAvatarFormSubmit
);
avatarModal.setEventListeners();

function openAvatarForm() {
  avatarModal.open();
}

variables.avatarIcon.addEventListener("click", () => {
  openAvatarForm();
});

function handleAvatarFormSubmit(inputValues) {
  setButtonText(variables.avatarModalButton, "Saving...");
  api
    .updateAvatar(inputValues.link)
    .then((res) => {
      userinfo.setAvatar(res.avatar);
      console.log(res);
      avatarModal.close();
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(variables.avatarModalButton, "Save");
    });
}

// USER INFO

const userinfo = new UserInfo(
  ".profile__title",
  ".profile__description",
  ".profile__avatar"
);

function handleEditFormSubmit(inputValues) {
  setButtonText(variables.editModalButton, "Saving...");
  api
    .editProfile(inputValues.name, inputValues.description)
    .then((res) => {
      userinfo.setUserInfo(res.name, res.about);
      console.log(res);
      editPopup.close();
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(variables.editModalButton, "Save");
    });
}
