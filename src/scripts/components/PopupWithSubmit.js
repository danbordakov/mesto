import Popup from "./Popup.js";

class PopupWithSubmit extends Popup {
  constructor(selector){
    super(selector);
    // this._handleFormSubmit = handleFormSubmit;
  }

detectCardID(id) {
  this._cardID = id;
  console.log(this._cardID, this._popupType, this._formSubmit)
}

  setEventListeners() {
    super.setEventListeners();
    this._popupType.addEventListener('submit', (evt) => {
      evt.preventDefault();
      // console.log('submit');
      this._formSubmit(this._cardID);
      this.close();
    })
  }

  formSubmitCallback(link) {
  this._formSubmit = link;

}
}

export default PopupWithSubmit;