class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.firstElementChild.cloneNode(true);

    return cardElement;
  }

  _handleLike = () => {
    this._likeButton.classList.toggle("gallery__card-like_active");
  };

  _handleDelete = () => {
    this._element.remove();
  };

  _handlePreview() {
    openModal(cardImageModal);
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", this._handleLike);

    this._cardTrash.addEventListener("click", this._handleDelete);
    this._cardImageEl.addEventListener("click", this._handlePreview);
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;
  }

  generateCard() {
    debugger;
    // select the like button, save to this
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".gallery__card-like");
    this._cardTrash = this._element.querySelector(".gallery__card-trash");
    this._cardImageEl = this._element.querySelector(".gallery__card-image");

    this._setEventListeners();

    this._element.querySelector(".gallery__card-image").style.backgroundImage =
      this._link;
    this._element.querySelector(".gallery__card-title").textContent =
      this._name;

    return this._element;
  }
}

export default Card;
