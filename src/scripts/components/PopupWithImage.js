import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(selector){
    super(selector);
    this._imageFullView = this._popupType.querySelector('.popup__image');
    this._nameFullView = this._popupType.querySelector('.popup__image-name');
  }

  open(link, name) {
    super.open();
    this._imageFullView.src = link;
    this._imageFullView.alt = name;
    this._nameFullView.textContent = name;
  }
}

export default PopupWithImage;