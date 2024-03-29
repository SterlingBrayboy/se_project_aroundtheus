import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._image = this._popupElement.querySelector(".modal__picture-src");
    this._title = this._popupElement.querySelector(".modal__picture-title");
  }

  open({ link, name }) {
    this._image.src = link;
    this._image.alt = `A photo of ${name}`;
    this._title.textContent = `${name}`;
    super.open();
  }
}
