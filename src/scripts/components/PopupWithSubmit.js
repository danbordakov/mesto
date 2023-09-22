import Popup from "./Popup.js";

class PopupWithSubmit extends Popup {
  constructor(selector){
    super(selector)
  }

detectCardID(id) {
  this._cardID = id;
  console.log(this._cardID, this._popupType, this._formSubmit)
}

  setEventListeners() {
    super.setEventListeners();
    this._popupType.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmit(this._cardID);
    })
  }

  formSubmitCallback(link) {
  this._formSubmit = link;

}
}

export default PopupWithSubmit;