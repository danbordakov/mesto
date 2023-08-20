import { openPopup } from "./index.js";
class Card {
  constructor(cardName, cardLink, templateSelector) {
    this._cardName = cardName;
    this._cardLink = cardLink;
    this._templateSelector = templateSelector;
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

  _openFullviewImage() {
    const popupFullview = document.querySelector('.popup_type_fullview');
    const imageFullview = document.querySelector('.popup_type_fullview').querySelector('.popup__image');
    const nameFullview = document.querySelector('.popup_type_fullview').querySelector('.popup__image-name');
    imageFullview.src = this._cardLink;
    imageFullview.alt = this._cardName;
    nameFullview.textContent = this._cardName;
    openPopup(popupFullview);
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
    .addEventListener('click', () => {this._openFullviewImage()});
  }

  createCard() {
    this._card = this._getTemplate();
    this._setData();
    this._setEventListeners();
    return this._card;
  }
}

export default Card;