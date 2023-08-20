class FormValidator {
  constructor(config, validatingForm) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    // this._validatingForm = validatingForm;
    this._formElement = document.querySelector(validatingForm);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  enableValidation() {
    this._setEventListeners(this._formElement);
  }

  _setEventListeners() {
    this._toggleButtonState(this._inputList, this._buttonElement);
    this._inputList.forEach(_inputElement => {
      _inputElement.addEventListener('input', () => {
        this._isValid(_inputElement);
        this._toggleButtonState();
      })
    })
  }

//методы для надписей ошибок
//--------------------------------------------------------------------------------------
  _isValid(_inputElement) {
    if (!_inputElement.validity.valid) {
      this._showInputError(_inputElement);
    } else {
      this._hideInputError(_inputElement);
    }
  }

  _showInputError(_inputElement) {
    const _errorElement = this._formElement.querySelector(`.${_inputElement.id}-error`);
    _inputElement.classList.add(this._inputErrorClass);
    _errorElement.classList.add(this._errorClass);
    _errorElement.textContent = _inputElement.validationMessage;
  }

  _hideInputError(_inputElement) {
    const _errorElement = this._formElement.querySelector(`.${_inputElement.id}-error`);
    _inputElement.classList.remove(this._inputErrorClass);
    _errorElement.classList.remove(this._errorClass);
  }

//методы для кнопок
//--------------------------------------------------------------------------------------
  _hasInvalidInput() {
    return this._inputList.some((_inputElement) => {
      return !_inputElement.validity.valid;
    })
  };

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disabledButtonState(this._buttonElement);
    } else {
      this._enabledButtonState();
    }
  };
  
  _enabledButtonState() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  }
  
  disabledButtonState() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  }
}

export default FormValidator;