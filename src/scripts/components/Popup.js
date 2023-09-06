class Popup {
  constructor(selector) {
    this._popupType = document.querySelector(selector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._buttonClose = this._popupType.querySelector('.popup__button-close');
  }

  open() {
    this._popupType.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popupType.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._buttonClose.addEventListener('click', () => this.close());
    this._popupType.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
    });
  }
}

export default Popup;