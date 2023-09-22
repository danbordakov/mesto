class Card {
  constructor(cardName, cardLink, cardLikes, cardID, ownerID, myID, cardLikeID, templateSelector,
    handleCardClick,
    handleDeleteCardClick,
    handleLikeClick,
    handleDislikeClick) {
    this._cardName = cardName;
    this._cardLink = cardLink;
    this._cardLikes = cardLikes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._ownerID = ownerID;
    this._myID = myID;
    this._cardID = cardID;
    this._cardLikeID = cardLikeID;
    this._handleDeleteCardClick = handleDeleteCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDislikeClick = handleDislikeClick;
  }

  _getTemplate() {
    const cardTemplate = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);
    return cardTemplate;
  }

  _setData() {
    this._cardImage = this._card.querySelector('.element__image');
    this._buttonLike = this._card.querySelector('.element__button-like');
    this._cardImage.src = this._cardLink;
    this._cardImage.alt = this._cardName;
    this._card.querySelector('.element__description').textContent = this._cardName;
    this._card.querySelector('.element__like-counter').textContent = this._cardLikes;
  }

  _likeCard() {
    this._handleLikeClick(this._cardID);
    this._buttonLike.classList.add('element__button-like_active');
  }

  _dislikeCard() {
    this._handleDislikeClick(this._cardID);
    this._buttonLike.classList.remove('element__button-like_active');

  }

  _deleteCard() {
    this._handleDeleteCardClick(this);
  }

  delete() {
    this._card.remove();
    this._card = null;
  }

  countLikes(data) {
    this._cardLikes = data.likes.length;
    this._card.querySelector('.element__like-counter').textContent = this._cardLikes;
  }

  _setEventListeners() {
    if (this._cardLikeID.includes(this._myID)) {
      this._buttonLike.classList.add('element__button-like_active');
      this._buttonLike.addEventListener('click', () => {this._dislikeCard()});
      } else {
      this._buttonLike.addEventListener('click', () => {this._likeCard()});
      }

    if (this._ownerID === this._myID) {
    this._card
    .querySelector('.element__button-trash')
    .addEventListener('click', this._deleteCard.bind(this));
    } else {
      this._card
      .querySelector('.element__button-trash')
      .remove();
    }

    this._cardImage.addEventListener('click', () => {this._handleCardClick()});
  }


  createCard() {
    this._card = this._getTemplate();
    this._setData();
    this._setEventListeners();
    return this._card;
    
  }
}

export default Card;