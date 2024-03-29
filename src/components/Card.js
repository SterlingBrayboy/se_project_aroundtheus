class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isLiked = data.isLiked;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;

    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.firstElementChild.cloneNode(true);

    return cardElement;
  }

  isLiked() {
    return this._isLiked;
  }

  handleLike = () => {
    this._likeButton.classList.toggle("gallery__card-like_active");
  };

  handleDelete = () => {
    this._element.remove();
    this._element = null;
  };

  updateLikeView() {
    if (this._isLiked) {
      this._likeButton.classList.add("gallery__card-like_active");
    } else {
      this._likeButton.classList.remove("gallery__card-like_active");
    }
  }

  _setEventListeners() {
    this._cardTrash.addEventListener("click", () => {
      this._handleDeleteClick(this);
    });
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this);
    });
    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".gallery__card-like");
    this._cardTrash = this._element.querySelector(".gallery__card-trash");
    this._cardImageEl = this._element.querySelector(".gallery__card-image");

    this._setEventListeners();

    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = `Photo of ${this._name}`;
    this._element.querySelector(".gallery__card-title").textContent =
      this._name;

    this.updateLikeView();

    return this._element;
  }
}

export default Card;
