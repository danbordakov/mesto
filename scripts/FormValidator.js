class FormValidator {
  constructor(config, validatingForm) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._validatingForm = validatingForm;
  }

  enableValidation() {
    const formElement = document.querySelector(this._validatingForm);
    this._setEventListeners(formElement);
  }

  _setEventListeners(_formElement) {
    const _inputList = Array.from(_formElement.querySelectorAll(this._inputSelector));
    const _buttonElement = _formElement.querySelector(this._submitButtonSelector);

    this._toggleButtonState(_inputList, _buttonElement);
    _inputList.forEach(_inputElement => {
      _inputElement.addEventListener('input', () => {
        this._isValid(_formElement, _inputElement);
        this._toggleButtonState(_inputList, _buttonElement);
      })
    })

  }

//методы для надписей ошибок
//--------------------------------------------------------------------------------------
  _isValid(_formElement, _inputElement) {
    if (!_inputElement.validity.valid) {
      this._showInputError(_formElement, _inputElement, _inputElement.validationMessage)
    } else {
      this._hideInputError(_formElement, _inputElement)
    }
  }

  _showInputError(_formElement, _inputElement, _errorMessage) {
    const _errorElement = _formElement.querySelector(`.${_inputElement.id}-error`);
    _inputElement.classList.add(this._inputErrorClass);
    _errorElement.classList.add(this._errorClass);
    _errorElement.textContent = _errorMessage;
  }

  _hideInputError(_formElement, _inputElement) {
    const _errorElement = _formElement.querySelector(`.${_inputElement.id}-error`);
    _inputElement.classList.remove(this._inputErrorClass);
    _errorElement.classList.remove(this._errorClass);
  }

//методы для кнопок
//--------------------------------------------------------------------------------------
  _hasInvalidInput(_inputList) {
    return _inputList.some((_inputElement) => {
      return !_inputElement.validity.valid;
    })
  };

  _toggleButtonState(_inputList, _buttonElement) {
    if (this._hasInvalidInput(_inputList)) {
      this._disabledButtonState(_buttonElement);
    } else {
      this._enabledButtonState(_buttonElement);
    }
  };
  
  _enabledButtonState(_buttonElement) {
    _buttonElement.classList.remove(this._inactiveButtonClass);
    _buttonElement.disabled = false;
  }
  
  _disabledButtonState(_buttonElement) {
    _buttonElement.classList.add(this._inactiveButtonClass);
    _buttonElement.disabled = true;
  }
}

export default FormValidator;