class Card {
  constructor(cardName, cardLink, templateSelector, handleCardClick) {
    this._cardName = cardName;
    this._cardLink = cardLink;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
  }

  _likeCard() {
    this._card
    .querySelector('.element__button-like')
    .classList
    .toggle('element__button-like_active');
  }

  _deleteCard() {
    this._card.remove();
    this._card = null;
  }

  _setEventListeners() {
    this._card
    .querySelector('.element__button-like')
    .addEventListener('click', () => {this._likeCard()});

    this._card
    .querySelector('.element__button-trash')
    .addEventListener('click', this._deleteCard.bind(this));

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