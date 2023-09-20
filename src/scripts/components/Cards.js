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
    // this._handleConfirmDeleteClick = handleConfirmDeleteClick;
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
    this._card.querySelector('.element__image').src = this._cardLink;
    this._card.querySelector('.element__image').alt = this._cardName;
    this._card.querySelector('.element__description').textContent = this._cardName;
    this._card.querySelector('.element__like-counter').textContent = this._cardLikes;
  }

  _likeCard() {
    this._handleLikeClick(this._cardID)
    .then((res) => this._card.querySelector('.element__like-counter').textContent = res.likes.length);
    this._card
    .querySelector('.element__button-like')
    .classList
    .toggle('element__button-like_active');
  }

  _dislikeCard() {

    this._handleDislikeClick(this._cardID)
    .then((res) => this._card.querySelector('.element__like-counter').textContent = res.likes.length);
    this._card
    .querySelector('.element__button-like')
    .classList
    .toggle('element__button-like_active');

  }

  _deleteCard() {
    this._handleDeleteCardClick(this);
  }

  delete() {
    this._card.remove();
    this._card = null;
  }

  _setEventListeners() {
    if (this._cardLikeID.includes(this._myID)) {
    this._card
    .querySelector('.element__button-like')
    .classList.add('element__button-like_active');
    this._card
    .querySelector('.element__button-like')
    .addEventListener('click', () => {this._dislikeCard()});
    } else {
    this._card
    .querySelector('.element__button-like')
    .addEventListener('click', () => {this._likeCard()});
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

    this._card
    .querySelector('.element__image')
    .addEventListener('click', () => {this._handleCardClick()});
  }


  createCard() {
    this._card = this._getTemplate();
    this._setData();
    this._setEventListeners();
    return this._card;
    
  }
}

export default Card;