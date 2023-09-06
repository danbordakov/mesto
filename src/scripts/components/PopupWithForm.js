import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupType.querySelector('.popup__form');
  }

  _getInputValues() {
  this._inputList = this._popupType.querySelectorAll('.popup__field');
  this._formValues = {};
  this._inputList.forEach(input => {
    this._formValues[input.name] = input.value;
  });
  return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupType.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    })
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}

export default PopupWithForm;